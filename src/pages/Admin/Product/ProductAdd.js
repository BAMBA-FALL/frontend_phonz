import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { categoryService } from '../../../_services/category.service';
import { productService } from '../../../_services/product.service';

const { Option } = Select;

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategoriesWithSubcategories();
        console.log('Catégories récupérées:', response); 
        setCategories(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        message.error('Erreur lors de la récupération des catégories.');
      }
    };

    fetchCategories();
  }, []);

  const handleFinish = async (values) => {
    try {
      const productData = new FormData();
      productData.append('title', values.title);
      productData.append('description', values.description);
      productData.append('price', values.price);
      productData.append('stock', values.stock);
      productData.append('color', values.color);
      productData.append('colors', values.colors);
      productData.append('storageCapacity', values.storageCapacity);
      productData.append('category', values.category);

      values.images.forEach((file) => productData.append('images', file));

      await productService.addProduct(productData);
      message.success('Produit ajouté avec succès.');
      form.resetFields();
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      message.error('Erreur lors de l\'ajout du produit.');
    }
  };

  const handleImageChange = (info) => {
    if (info.fileList.length > 4) {
      message.warning('Vous ne pouvez sélectionner que jusqu\'à 4 images.');
      return;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{ images: [] }}
    >
      <Form.Item
        name="title"
        label="Titre"
        rules={[{ required: true, message: 'Veuillez entrer le titre du produit.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Veuillez entrer une description du produit.' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="price"
        label="Prix"
        rules={[{ required: true, message: 'Veuillez entrer le prix du produit.' }]}
      >
        <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="stock"
        label="Stock"
        rules={[{ required: true, message: 'Veuillez entrer la quantité en stock.' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="color"
        label="Couleur principale"
        rules={[{ required: true, message: 'Veuillez entrer la couleur principale.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="colors"
        label="Autres couleurs (séparées par des virgules)"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="storageCapacity"
        label="Capacité de stockage (séparée par des virgules)"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="Catégorie"
        rules={[{ required: true, message: 'Veuillez sélectionner une catégorie.' }]}
      >
        <Select placeholder="Sélectionnez une catégorie">
          {categories.map((category) => (
            <React.Fragment key={category._id}>
              <Option value={category._id}>{category.name}</Option>
              {category.subcategories.map((subcategory) => (
                <Option key={subcategory._id} value={subcategory._id}>
                  - {subcategory.name}
                </Option>
              ))}
            </React.Fragment>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="images"
        label="Images (jusqu'à 4)"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        extra="Vous pouvez sélectionner jusqu'à 4 images."
      >
        <Upload
          name="images"
          listType="picture"
          accept="image/*"
          maxCount={4}
          beforeUpload={() => false}
          onChange={handleImageChange}
        >
          <Button icon={<UploadOutlined />}>Sélectionner des images</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ajouter le produit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
