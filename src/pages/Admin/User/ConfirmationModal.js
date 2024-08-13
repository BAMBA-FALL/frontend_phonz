import React from 'react';
import Modal from 'react-modal';
import './confirmationModal.css'

const ConfirmationModal = ({ isOpen, onClose, onConfirm, action }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <div className="ModalContent">
        <h2 className="ModalTitle">{action === 'delete' ? 'Confirmer la suppression' : 'Confirmer la suspension'}</h2>
        <p className="ModalMessage">{action === 'delete' ? 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?' : 'Êtes-vous sûr de vouloir suspendre cet utilisateur ?'}</p>
        <button className="ModalButton" onClick={onConfirm}>{action === 'delete' ? 'Oui, Supprimer' : 'Oui, Suspendre'}</button>
        <button className="ModalButton" onClick={onClose}>Annuler</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
