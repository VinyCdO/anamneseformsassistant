import React from 'react';
import './modalAlert.css';

interface ModalAlertaProps {
  mensagem: string;
  onClose: () => void;
}

const ModalAlerta: React.FC<ModalAlertaProps> = ({ mensagem, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">        
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