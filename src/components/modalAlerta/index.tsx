import React from 'react';
import './modalAlerta.css';

interface ModalAlertaProps {
  titulo: string;
  mensagem: string;
  onClose: () => void;
}

const ModalAlerta: React.FC<ModalAlertaProps> = ({ titulo, mensagem, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{titulo}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>{mensagem}</p>
        </div>
        <div className="modal-footer">
          <button className="ok-button" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAlerta;