import React, { useState, useEffect } from 'react';
import { userService } from '../../../_services/user.service';
import UpdateProfileForm from './UpdateProfileForm';
import './profile.css'; // Importez le fichier de style

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Récupérer les informations de profil de l'utilisateur
        const response = await userService.getUserProfile();
        setUser(response.data.user);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      } finally {
        setLoading(false); // Mettre à jour l'état de chargement même en cas d'erreur
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      // Mettre à jour les informations du profil de l'utilisateur
      await userService.updateUserProfile(updatedProfile);
      // Mettre à jour l'état local avec les nouvelles informations
      setUser(updatedProfile);
      console.log('Profil utilisateur mis à jour avec succès.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
    }
  };

  if (loading) {
    return <p>Chargement du profil...</p>;
  }

  if (!user) {
    return <p>Utilisateur non connecté.</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mon profile</h1>
      <div>
        <div className="profile-info">
          <label>Prénom:</label>
          <p>{user.username}</p>
        </div>
        <div className="profile-info">
          <label>Nom:</label>
          <p>{user.name}</p>
        </div>
        <div className="profile-info">
          <label>Email:</label>
          <p>{user.email}</p>
        </div>
        <div className="profile-info">
          {/* <label>Email:</label> */}
          <p>{user.id}</p>
        </div>
        <div className="profile-form">
          {/* Passer la fonction de mise à jour du profil en tant que prop */}
          <UpdateProfileForm user={user} onUpdateProfile={handleUpdateProfile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
