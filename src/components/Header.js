import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { FaHome, FaSun, FaMoon } from 'react-icons/fa';
import { MdOutlineMenuBook } from "react-icons/md";
import { MdSearch } from 'react-icons/md';
import { FaUserSecret } from "react-icons/fa6";

// Contenedor principal del encabezado
const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.headerBg || '#1F2937'};
  color: ${(props) => props.theme.headerText || '#F3F4F6'};
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 200;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.headerHover || '#D1D5DB'};
  }

  svg {
    color: ${(props) => props.theme.headerText || '#F3F4F6'};
    transition: color 0.3s ease;
  }
`;

// Navegación mejorada
const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  a {
    color: ${(props) => props.theme.headerText || '#F3F4F6'};
    text-decoration: none;
    font-weight: 600;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    transition: color 0.3s ease;
    position: relative;

    &:hover {
      color: ${(props) => props.theme.headerHover || '#E5E7EB'};
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        height: 2px;
        width: 100%;
        background-color: ${(props) => props.theme.logoColor || '#3B82F6'};
        transition: width 0.3s ease;
      }
    }
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

// Logo estilizado con microinteracción
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.theme.logoColor || '#60A5FA'};
  font-family: 'Poppins', sans-serif;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  svg {
    color: ${(props) => props.theme.logoColor || '#60A5FA'};
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    text-align: center;
  }
`;

// Contenedor de búsqueda con efecto de transición
const SearchWrapper = styled.form`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.searchBg || '#374151'};
  border-radius: 12px;
  padding: 0.7rem 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;

  input {
    border: none;
    background: none;
    color: ${(props) => props.theme.headerText || '#F3F4F6'};
    outline: none;
    padding: 0 0.5rem;
    font-size: 1.1rem;
    width: 100%;

    &::placeholder {
      color: #9CA3AF;
    }
  }

  svg {
    cursor: pointer;
    color: ${(props) => props.theme.headerText || '#F3F4F6'};
    transition: color 0.3s ease;

    &:hover {
      color: ${(props) => props.theme.headerHover || '#9CA3AF'};
    }
  }

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
  }
`;

// Contenedor para el usuario y menú
const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  position: relative;
`;

// Menú desplegable avanzado con animación y flecha
const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: ${(props) => props.theme.headerBg || '#374151'};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  z-index: 100;
  min-width: 200px;
  opacity: ${(props) => (props.open ? 1 : 0)};
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  transform: ${(props) => (props.open ? 'translateY(0)' : 'translateY(-20px)')};
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    right: 20px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent ${(props) => props.theme.headerBg || '#374151'} transparent;
  }

  a, button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.75rem 0;
    color: ${(props) => props.theme.headerText || '#F3F4F6'};
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 6px;

    &:hover {
      background-color: ${(props) => props.theme.headerHover || '#9CA3AF'};
      color: ${(props) => props.theme.headerBg || '#1F2937'};
    }
  }

  span {
    display: block;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.logoColor || '#60A5FA'};
  }

  hr {
    margin: 1rem 0;
    border: none;
    border-top: 1px solid ${(props) => props.theme.headerHover || '#E5E7EB'};
  }
`;

const lightTheme = {
  headerBg: '#F3F4F6',
  headerText: '#111827',
  headerHover: '#D1D5DB',
  searchBg: '#E5E7EB',
  logoColor: '#3B82F6',
};

const darkTheme = {
  headerBg: '#1F2937',
  headerText: '#F3F4F6',
  headerHover: '#9CA3AF',
  searchBg: '#374151',
  logoColor: '#60A5FA',
};

const Header = ({ toggleTheme, user, setUser, currentTheme }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?author=${searchQuery}`);
    }
  };

  return (
    <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
      <HeaderWrapper>
        <Logo onClick={() => navigate('/')}>
          <MdOutlineMenuBook  /> Blog Developer
        </Logo>
        <Nav>
          <Link to="/"><FaHome /> Home</Link>
        </Nav>
        <SearchWrapper onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Búsqueda por autor..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <MdSearch size={24} onClick={handleSearchSubmit} />
        </SearchWrapper>
        <UserSection>
          <IconWrapper onClick={toggleTheme}>
            {currentTheme === 'light' ? <FaSun size={24} /> : <FaMoon size={24} />}
          </IconWrapper>
          <IconWrapper ref={dropdownRef}>
            <FaUserSecret  size={24} onClick={toggleDropdown} />
            <DropdownMenu open={dropdownOpen}>
              {user ? (
                <>
                  <span>Welcome, {user.name.toUpperCase()}</span>
                  <button onClick={handleLogout}>Logout</button>
                  <hr />
                  <Link to="/profile">Profile</Link>
                  <Link to="/settings">Settings</Link>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </DropdownMenu>
          </IconWrapper>
        </UserSection>
      </HeaderWrapper>
    </ThemeProvider>
  );
};

export default Header;
