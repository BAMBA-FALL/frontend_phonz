import React, { useEffect, useState } from 'react';
import { faTrash, faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './user.css';
import { userService } from '../../../_services/user.service';
import ConfirmationModal from './ConfirmationModal';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [action, setAction] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data.users);
      } catch (error) {
        setError('Erreur lors de la récupération des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [users, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const openModal = (user, actionType) => {
    setSelectedUser(user);
    setAction(actionType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setAction('');
    setIsModalOpen(false);
  };

  const handleConfirmAction = async () => {
    try {
      if (action === 'suspendre') {
        // Appeler la fonction pour suspendre l'utilisateur avec l'ID selectedUserId
      } else if (action === 'delete') {
        await userService.deleteUser(selectedUser._id);
        // Recharger la liste des utilisateurs après la suppression
        const response = await userService.getAllUsers();
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur : ', error);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <div>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => setFilteredUsers(users.filter(user => user.username.toLowerCase() === searchTerm.toLowerCase()))}>Rechercher</button>
        <button onClick={() => setSearchTerm('')}>Effacer</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className='btn-suspendre' onClick={() => openModal(user, 'suspendre')}><FontAwesomeIcon icon={faBan} style={{ color: 'orange' }}  /></button>
                <button className='btn-supprimer' onClick={() => openModal(user, 'delete')}><FontAwesomeIcon icon={faTrash} style={{ color: 'red' }}  /> </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmAction}
        actionType={action === 'suspendre' ? 'suspendre' : 'supprimer'}
        user={selectedUser} 
      />
    </div>
  );
};

export default User;
