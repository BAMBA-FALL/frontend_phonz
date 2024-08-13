import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { categoryService } from '../../../_services/category.service';

const { Option } = Select;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        message.error('Erreur lors de la récupération des catégories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const showModal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: category.name,
      parentCategory: category.parentCategory ? category.parentCategory._id : '',
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCategory(null);
    form.resetFields();
  };

  const handleUpdate = async (values) => {
    try {
      await categoryService.updateCategory(selectedCategory._id, values);
      message.success('Catégorie mise à jour avec succès.');
      setCategories(categories.map(cat => cat._id === selectedCategory._id ? { ...cat, ...values } : cat));
      handleCancel();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
      message.error('Erreur lors de la mise à jour de la catégorie.');
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await categoryService.deleteCategory(categoryId);
      message.success('Catégorie supprimée avec succès.');
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      message.error('Erreur lors de la suppression de la catégorie.');
    }
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(record)}>Éditer</Button>
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cette catégorie?"
            onConfirm={() => handleDelete(record._id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="danger">Supprimer</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Liste des Catégories</h2>
      <Table 
        columns={columns} 
        dataSource={categories} 
        rowKey="_id" 
        loading={loading} 
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Category;
