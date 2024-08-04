// UpdateProfileForm.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getNames } from 'country-list';

const UpdateProfileForm = ({ user, onUpdateProfile }) => {
  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    address: {
      street: user.address?.street || '',
      city: user.address?.city || '',
      state: user.address?.state || '',
      postalCode: user.address?.postalCode || '',
      country: user.address?.country || '',
    },
  });

  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const countries = getNames().map((country) => ({ label: country, value: country }));
    setCountryOptions(countries);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => {
      if (name in prevUser.address) {
        return {
          ...prevUser,
          address: {
            ...prevUser.address,
            [name]: value,
          },
        };
      } else {
        return { ...prevUser, [name]: value };
      }
    });
  };

  const handleSelectChange = (selectedOption) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        country: selectedOption.value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom d'utilisateur :</label>
        <input type="text" name="username" value={updatedUser.username} onChange={handleChange} />
      </div>
      <div>
        <label>Nom :</label>
        <input type="text" name="name" value={updatedUser.name} onChange={handleChange} />
      </div>
      <div>
        <label>Email :</label>
        <input type="email" name="email" value={updatedUser.email} onChange={handleChange} />
      </div>
      <div>
        <label>Numéro de téléphone :</label>
        <input type="text" name="phone" value={updatedUser.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Rue :</label>
        <input type="text" name="street" value={updatedUser.address.street} onChange={handleChange} />
      </div>
      <div>
        <label>Ville :</label>
        <input type="text" name="city" value={updatedUser.address.city} onChange={handleChange} />
      </div>
      <div>
        <label>État/Région :</label>
        <input type="text" name="state" value={updatedUser.address.state} onChange={handleChange} />
      </div>
      <div>
        <label>Code postal :</label>
        <input type="text" name="postalCode" value={updatedUser.address.postalCode} onChange={handleChange} />
      </div>
      <div>
        <label>Pays :</label>
        <Select
          options={countryOptions}
          value={countryOptions.find(option => option.value === updatedUser.address.country)}
          onChange={handleSelectChange}
        />
      </div>
      <button type="submit">Mettre à jour le profil</button>
    </form>
  );
};

export default UpdateProfileForm;
