// ProfileUpdate.js
import React from 'react';
import { userService } from '../../../_services/user.service';
import UpdateProfileForm from './UpdateProfileForm';

const ProfileUpdate = () => {
  const handleUpdateProfile = async (updatedProfile) => {
    try {
      await userService.updateUserProfile(updatedProfile);
      console.log('Profil utilisateur mis à jour avec succès.');
      // Rediriger l'utilisateur vers la page de profil après la mise à jour
      // Vous pouvez utiliser useHistory ou tout autre moyen de routage que vous utilisez dans votre application
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
    }
  };

  return (
    <div>
      <h1>Mise à jour du profil</h1>
      <UpdateProfileForm onUpdateProfile={handleUpdateProfile} />
    </div>
  );
};

export default ProfileUpdate;
