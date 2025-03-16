import { useState } from 'react'
import businessLogo from '../../assets/AliceRibeiroLogo.png'
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;    
  padding: 0px 10px 0 10px;    
  height: 100px;
  width: 90vw;    
`;

const Logo = styled.img`
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);    
`;

function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <StyledHeader>
      <Logo
        src={businessLogo}
        alt="Logo Alice Ribeiro Estética"
      />
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? 'Fechar' : 'Abrir'} menu
      </button>
    </StyledHeader>
  )
}

export default Header;