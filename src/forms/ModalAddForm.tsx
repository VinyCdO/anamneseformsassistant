import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import styled from 'styled-components';
import { putAddSignedFileLink } from '../services/anamneseApi';
import ModalAlert from '../components/modalAlert/index.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: transparent;
`;

const SaveButton = styled.button`
  font-size: 14px;
  background-color: rgb(207, 189, 121);
  color: white;
  border: none;
  border-radius: 10%;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: rgb(228, 181, 13);
  }
    
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const CancelButton = styled.button`
  font-size: 14px;
  background-color: #a0a08d;
  color: white;
  border: none;
  border-radius: 10%;
  cursor: pointer;
  
  &:hover {
    background-color: rgb(97, 96, 90);
  }
    
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

interface ModalAddFormProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  formId: string;
}

const ModalAddForm: React.FC<ModalAddFormProps> = ({ visible, onClose, onSave, formId }) => {
  const [link, setLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const handleSave = async () => {
    if (link.trim()) {
      try {        
        await putAddSignedFileLink(formId, `{ "formularioAssinado": "${link}" }`);      
        
        setModalMessage('Link para download adicionado com sucesso.');
        setShowModal(true);
      } catch(error) {        
        setModalMessage('Houve alguma falha ao adicionar o link, tente novamente mais tarde.');
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    onSave();
    setLink('');
    onClose();
  }

  return (
    <Container>
      <Modal
        visible={visible}
        onCancel={onClose}
        footer={[
          <CancelButton key="cancel" onClick={onClose}>
            Cancelar
          </CancelButton>,
          <SaveButton key="save" onClick={handleSave}>
            Salvar
          </SaveButton>,
        ]}
        centered
        width={400}
      >
        <Form layout="vertical">
          <Form.Item label="Link para download" required>
            <Input
              placeholder="Insira o link aqui"
              value={link}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
            />
          </Form.Item>
        </Form>
        {showModal && (
          <ModalAlert
            mensagem={modalMessage}
            onClose={closeModal}
          />
        )}
      </Modal>     
    </Container>
  );
};

export default ModalAddForm;