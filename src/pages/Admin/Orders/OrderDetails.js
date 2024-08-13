// src/pages/Admin/Orders/OrderDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Détails de la Commande {id}</h1>
    </div>
  );
};

export default OrderDetails;
