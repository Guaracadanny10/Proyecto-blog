import React, { useState } from 'react'; // Importa React y el hook useState
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación
import styled from 'styled-components'; // Importa styled-components para los estilos
import { toast } from 'react-toastify'; // Importa toast para las notificaciones
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify
import backgroundImage from '../assets/2.jpg'; // Importa una imagen de fondo

// Estilo para el contenedor principal del login
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center center/cover;
  background-color: ${(props) => props.theme.body};
`;

// Estilo para el formulario de login
const LoginForm = styled.form`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  font-family: "Playwrite NO", cursive;
`;

// Estilo para el título del formulario
const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.text};
  font-family: "Playwrite NO", cursive;
`;

// Estilo para las etiquetas de los campos del formulario
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  font-family: "Playwrite NO", cursive;
`;

// Estilo para los campos de entrada del formulario
const Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.inputText};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 5px ${(props) => props.theme.primary};
  }
`;

// Estilo para el botón de enviar del formulario
const Button = styled.button`
  width: 97%;
  padding: 0.75rem;
  background-color:#2196F3;;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: "Playwrite NO", cursive;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBg};
  }
`;

// Componente de Login
const Login = ({ setUser }) => {
  const [email, setEmail] = useState(''); // Estado para el email
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const navigate = useNavigate(); // Hook para la navegación

  // Maneja el evento de login
  const handleLogin = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    const users = JSON.parse(localStorage.getItem('users')) || []; // Obtiene los usuarios almacenados en localStorage
    const user = users.find((user) => user.email === email && user.password === password); // Busca un usuario que coincida

    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Almacena el usuario en localStorage
      setUser(user); // Establece el usuario en el estado del componente padre
      toast.success('Login successful!'); // Muestra una notificación de éxito
      navigate('/'); // Navega a la página principal
    } else {
      toast.error('Invalid email or password'); // Muestra una notificación de error
    }
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleLogin}>
        <Title>Inicio Sesion</Title>
        <div>
          <Label>Email:</Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Contraseña:</Label>
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">LOGIN</Button>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login; // Exporta el componente Login
