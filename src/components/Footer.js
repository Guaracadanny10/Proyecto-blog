import React from 'react'; 
import styled, { ThemeProvider } from 'styled-components'; 
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'; 

// Definición de temas
const lightTheme = {
  background: '#f8f9fa',
  text: '#212529',
  linkHover: '#007bff',
  border: '#dee2e6',
  iconColor: '#495057',
  iconHover: '#007bff',
};

const darkTheme = {
  background: '#212529',
  text: '#f8f9fa',
  linkHover: '#00d1b2',
  border: '#495057',
  iconColor: '#adb5bd',
  iconHover: '#00d1b2',
};

// Estilo del contenedor del pie de página
const FooterWrapper = styled.footer`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 3rem 2rem;
  border-top: 1px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

// Contenedor de redes sociales
const SocialLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    margin: 0 0.75rem;
    color: ${(props) => props.theme.iconColor};
    transition: color 0.3s ease;
    font-size: 1.75rem;

    &:hover {
      color: ${(props) => props.theme.iconHover};
    }
  }
`;

// Estilo para las secciones adicionales
const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
    margin-top: 1rem;
  }
`;

// Estilo para los enlaces adicionales
const FooterLink = styled.a`
  color: ${(props) => props.theme.text};
  margin: 0.25rem 0;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.linkHover};
  }
`;

// Estilo del texto de copyright
const FooterText = styled.p`
  font-size: 0.95rem;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.text};
  font-family: 'Roboto', sans-serif;
`;

// Contenedor para centrar el texto de copyright en la parte inferior
const CopyrightSection = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
`;

// Componente principal del footer
const Footer = ({ currentTheme }) => {
  return (
    <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
      <FooterWrapper>
        {/* Sección de redes sociales */}
        <SocialLinks>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </SocialLinks>

        {/* Sección de enlaces adicionales */}
        {/* <FooterSection>
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
        </FooterSection> */}

        {/* Texto de copyright centrado y en la parte inferior */}
        <CopyrightSection>
          <FooterText>© {new Date().getFullYear()} My Blog. All Rights Reserved.</FooterText>
        </CopyrightSection>
      </FooterWrapper>
    </ThemeProvider>
  );
};

export default Footer;
