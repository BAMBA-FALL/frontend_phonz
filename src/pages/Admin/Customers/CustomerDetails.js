// src/pages/Admin/Customers/CustomerDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const CustomerDetails = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Détails du Client {id}</h1>
    </div>
  );
};

export default CustomerDetails;
