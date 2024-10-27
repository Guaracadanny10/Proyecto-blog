import React, { useState } from 'react'; // Importa React y el hook useState
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación
import styled from 'styled-components'; // Importa styled-components para los estilos
import { toast } from 'react-toastify'; // Importa toast para las notificaciones
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify
import backgroundImage from '../assets/2.jpg'; // Importa una imagen de fondo

// Estilo para el contenedor principal del registro
const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center center/cover;
  background-color: ${(props) => props.theme.body};
`;

// Estilo para el formulario de registro
const RegisterForm = styled.form`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  font-family: "Playwrite NO", cursive;
`;

// Estilo para el título del formulario
const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: "Playwrite NO", cursive;
  color: ${(props) => props.theme.text};
`;

// Estilo para las etiquetas de los campos del formulario
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-family: "Playwrite NO", cursive;
  color: ${(props) => props.theme.text};
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
  background-color: #2196F3;;
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

// Componente de Register
const Register = ({ setUser }) => {
  const [name, setName] = useState(''); // Estado para el nombre
  const [email, setEmail] = useState(''); // Estado para el email
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const navigate = useNavigate(); // Hook para la navegación

  // Maneja el evento de registro
  const handleRegister = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    if (!name || !email || !password) { // Verifica que todos los campos estén llenos
      toast.error('All fields are required'); // Muestra un error si falta algún campo
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || []; // Obtiene los usuarios almacenados en localStorage
    const userExists = users.some((user) => user.email === email); // Verifica si el usuario ya existe

    if (userExists) {
      toast.error('Email already registered'); // Muestra un error si el email ya está registrado
      return;
    }

    const newUser = { id: users.length, name, email, password }; // Crea un nuevo usuario con un id único

    users.push(newUser); // Agrega el nuevo usuario al array de usuarios
    localStorage.setItem('users', JSON.stringify(users)); // Guarda los usuarios en localStorage
    localStorage.setItem('user', JSON.stringify(newUser)); // Guarda el nuevo usuario en localStorage
    setUser(newUser); // Establece el usuario en el estado del componente padre
    toast.success('Registration successful!'); // Muestra una notificación de éxito

    navigate('/'); // Navega a la página principal
  };

  return (
    <RegisterWrapper>
      <RegisterForm onSubmit={handleRegister}>
        <Title>Registro</Title>
        <div>
          <Label>Nombre:</Label>
          <Input type="text" value={name} placeholder="Username" onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label>Email:</Label>
          <Input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label>Contraseña:</Label>
          <Input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit">Register</Button>
      </RegisterForm>
    </RegisterWrapper>
  );
};

export default Register; // Exporta el componente Register
