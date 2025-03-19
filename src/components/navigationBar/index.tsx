import React from 'react';
import './navigationBar.css';
import businessLogo from '../../assets/AliceRibeiroLogo.png';
import { IoIosMenu } from "react-icons/io";
import styled from 'styled-components';

const Logo = styled.img`
  border-radius: 30%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);    
  height: 50px;

  @media (max-width: 768px) {
    display: block;    
    align-self: center;
  }
`;

interface NavigationBarProps {
  toggleMenu: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ toggleMenu }) => {
  
  return (
    <div>
      <div className="barraNavegacao">
        <button className='buttonMenuLateral' onClick={toggleMenu} >          
          <IoIosMenu size={24} className='buttonIcon'/>
        </button>
        <Logo src={businessLogo} alt="Alice Ribeiro Estética" />        
      </div>      
    </div>
    
  );
}

export default NavigationBar;