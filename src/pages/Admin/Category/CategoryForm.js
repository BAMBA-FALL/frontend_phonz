import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { categoryService } from '../../../_services/category.service'; 
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CategoryForm = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch categories for the parent category dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategories();
        setCategories(response); 
      } catch (error) {
        message.error('Erreur lors de la récupération des catégories principales.');
      }
    };

    fetchCategories(); 
  }, []); 

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      const newCategory = { name: values.name, parentCategory: values.parentCategory || null };
      await categoryService.addCategory(newCategory);
      message.success('Catégorie créée avec succès!');
      form.resetFields();
      navigate('/');
    } catch (error) {
      message.error('Erreur lors de la création de la catégorie.');
      console.error('Erreur lors de la création de la catégorie:', error);
    }
  };

  return (
    <div className="category-form-container" style={{ padding: '24px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Créer une nouvelle catégorie</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          name="name"
          label="Nom de la catégorie"
          rules={[{ required: true, message: 'Veuillez entrer le nom de la catégorie.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="parentCategory"
          label="Catégorie parente (optionnel)"
        >
          <Select placeholder="Sélectionnez une catégorie parente">
            <Option value="">Aucune</Option>
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Créer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryForm;
