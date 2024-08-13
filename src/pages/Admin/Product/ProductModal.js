import React from 'react';
import Modal from 'react-modal';

const ProductModal = ({ isOpen, onClose, onConfirm, action }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>{action === 'delete' ? 'Confirmer la suppression' : 'Confirmer la modification'}</h2>
      <p>{action === 'delete' ? 'Êtes-vous sûr de vouloir supprimer ce produit ?' : 'Êtes-vous sûr de vouloir modifier ce produit ?'}</p>
      <button onClick={onConfirm}>{action === 'delete' ? 'Oui, Supprimer' : 'Oui, Modifier'}</button>
      <button onClick={onClose}>Annuler</button>
    </Modal>
  );
};

export default ProductModal;
