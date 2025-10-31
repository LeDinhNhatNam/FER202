import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

const DeleteConfirmModal = ({ show, onHide, onConfirm, movieTitle }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">⚠️ Xác nhận xóa phim</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="warning" className="mb-3">
          <Alert.Heading className="h6">Cảnh báo!</Alert.Heading>
          Bạn có chắc chắn muốn xóa phim này không? Hành động này không thể hoàn tác.
        </Alert>
        
        <div className="text-center">
          <h5>📽️ "{movieTitle}"</h5>
          <p className="text-muted">Phim này sẽ bị xóa vĩnh viễn khỏi hệ thống.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          ❌ Hủy bỏ
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          🗑️ Xác nhận xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;