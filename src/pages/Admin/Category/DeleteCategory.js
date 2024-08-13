import React, { useState, useEffect } from 'react';
import { Button, Select, Modal, message, Spin } from 'antd';
import { categoryService } from '../../../_services/category.service'; 
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategories();
        setCategories(response); 
      } catch (error) {
        message.error('Erreur lors de la récupération des catégories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories(); 
  }, []);

  const handleDelete = async () => {
    if (!selectedCategory) {
      message.warning('Veuillez sélectionner une catégorie à supprimer.');
      return;
    }

    setConfirmLoading(true);

    try {
      await categoryService.deleteCategory(selectedCategory);
      message.success('Catégorie supprimée avec succès!');
      setSelectedCategory('');
      // Optionally, refetch categories or update UI here
    } catch (error) {
      message.error('Erreur lors de la suppression de la catégorie.');
      console.error('Erreur lors de la suppression de la catégorie:', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Supprimer une catégorie</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Select
            placeholder="Sélectionnez une catégorie à supprimer"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            style={{ width: '100%', marginBottom: '16px' }}
          >
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
          
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              Modal.confirm({
                title: 'Êtes-vous sûr de vouloir supprimer cette catégorie?',
                content: 'Cette action est irréversible.',
                okText: 'Supprimer',
                okType: 'danger',
                cancelText: 'Annuler',
                onOk: handleDelete,
              });
            }}
            loading={confirmLoading}
          >
            Supprimer la catégorie
          </Button>
        </>
      )}
    </div>
  );
};

export default DeleteCategory;
