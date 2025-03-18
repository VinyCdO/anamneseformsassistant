import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import styled from 'styled-components';
import { putAddSignedFileLink } from '../services/anamneseApi';
import ModalAlerta from '../components/modalAlerta/index.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: transparent;
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
        
        setModalMessage('Link da Ficha de Anamnese assinada, foi adicionado com sucesso.');
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
        title="Adicionar link para download"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Cancelar
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Salvar
          </Button>,
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
          <ModalAlerta
            titulo="Mensagem"
            mensagem={modalMessage}
            onClose={closeModal}
          />
        )}
      </Modal>     
    </Container>
  );
};

export default ModalAddForm;