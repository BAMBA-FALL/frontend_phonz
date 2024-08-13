import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { productService } from '../../../_services/product.service'; // Pour récupérer des produits
import { accessoryService } from '../../../_services/accessoire.service'; // Pour ajouter des accessoires

const { Option } = Select;

const AddAccessoryForm = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer la liste des produits disponibles
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        setProducts(response.products);
      } catch (error) {
        message.error('Erreur lors de la récupération des produits.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Gérer la soumission du formulaire
  const handleFinish = async (values) => {
    try {
      const newAccessory = new FormData();
      newAccessory.append('title', values.title);
      newAccessory.append('description', values.description);
      newAccessory.append('price', values.price);
      newAccessory.append('stock', values.stock);
      newAccessory.append('category', values.category);
      newAccessory.append('productId', values.productId);
      newAccessory.append('image', values.image[0].originFileObj);

      await accessoryService.addAccessory(newAccessory);
      message.success('Accessoire ajouté avec succès.');

      form.resetFields(); // Réinitialiser le formulaire après soumission
    } catch (error) {
      message.error('Erreur lors de l\'ajout de l\'accessoire.');
    }
  };

  // Gérer le changement d'image
  const handleImageChange = (info) => {
    if (info.fileList.length > 1) {
      message.warning('Vous ne pouvez sélectionner qu\'une seule image.');
      return;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{ image: [] }}
    >
      <Form.Item
        name="productId"
        label="Sélectionner le produit parent"
        rules={[{ required: true, message: 'Veuillez sélectionner un produit.' }]}
      >
        <Select placeholder="Sélectionnez un produit" loading={loading}>
          {products.map((product) => (
            <Option key={product._id} value={product._id}>
              {product.title}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="title"
        label="Titre"
        rules={[{ required: true, message: 'Veuillez entrer le titre de l\'accessoire.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Veuillez entrer une description de l\'accessoire.' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="price"
        label="Prix"
        rules={[{ required: true, message: 'Veuillez entrer le prix de l\'accessoire.' }]}
      >
        <Input type="number" min={0} step={0.01} />
      </Form.Item>

      <Form.Item
        name="stock"
        label="Stock"
        rules={[{ required: true, message: 'Veuillez entrer la quantité en stock.' }]}
      >
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item
        name="category"
        label="Catégorie"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        extra="Vous pouvez télécharger une seule image."
      >
        <Upload
          name="image"
          listType="picture"
          accept="image/*"
          beforeUpload={() => false} // Pour éviter le téléchargement automatique
          onChange={handleImageChange}
        >
          <Button icon={<UploadOutlined />}>Télécharger une image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ajouter l'accessoire
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAccessoryForm;
