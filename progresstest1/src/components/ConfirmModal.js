import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ 
  show, 
  onHide, 
  title = "Confirmation", 
  message, 
  onConfirm, 
  confirmText = "OK", 
  cancelText = "Cancel",
  showCancel = true,
  variant = "primary"
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        {showCancel && (
          <Button variant="secondary" onClick={onHide}>
            {cancelText}
          </Button>
        )}
        <Button 
          variant={variant} 
          onClick={() => {
            if (onConfirm) onConfirm();
            onHide();
          }}
        >
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;