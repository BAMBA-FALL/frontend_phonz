// UpdateProfileForm.js
import React, { useState } from 'react';

const UpdateProfileForm = ({ user, onUpdateProfile }) => {
  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={updatedUser.username} onChange={handleChange} />
      <input type="text" name="name" value={updatedUser.name} onChange={handleChange} />
      <input type="email" name="email" value={updatedUser.email} onChange={handleChange} />
      <button type="submit">Mettre à jour le profil</button>
    </form>
  );
};

export default UpdateProfileForm;
