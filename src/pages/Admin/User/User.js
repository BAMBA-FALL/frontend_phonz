import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, Popconfirm, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { userService } from '../../../_services/user.service';
import './user.css'; // Ajouter un fichier CSS pour les styles spécifiques

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      } catch (error) {
        message.error('Erreur lors de la récupération des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = async (userId) => {
    try {
      await userService.deleteUser(userId);
      message.success('Utilisateur supprimé avec succès');
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      message.error('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  const columns = [
    {
      title: 'Nom d\'utilisateur',
      dataIndex: 'username',
      key: 'username',
      responsive: ['md'], // Affiché uniquement sur les écrans md et plus
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm'], // Affiché uniquement sur les écrans sm et plus
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="danger">
            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer cet utilisateur?"
              onConfirm={() => handleDelete(record._id)}
              okText="Oui"
              cancelText="Non"
            >
              Supprimer
            </Popconfirm>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-container">
      <h2 className="user-title">Liste des Utilisateurs</h2>
      <Input
        placeholder="Rechercher par nom d'utilisateur ou email"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="user-search"
      />
      <Table
        columns={columns}
        dataSource={filteredUsers}
        loading={loading}
        rowKey="_id"
        scroll={{ x: 'max-content' }} // Ajout de la réactivité pour le défilement horizontal
      />
    </div>
  );
};

export default User;
