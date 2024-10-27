

import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa componentes de react-router-dom para la navegación
import { ThemeProvider, createGlobalStyle } from 'styled-components'; // Importa ThemeProvider y createGlobalStyle de styled-components
import Header from './components/Header'; // Importa el componente Header
import Footer from './components/Footer'; // Importa el componente Footer
import BlogEntry from './components/BlogEntry'; // Importa el componente BlogEntry
import HomePage from './components/HomePage'; // Importa el componente HomePage
import CommentPage from './components/CommentPage'; // Importa el componente CommentPage
import Register from './components/Register'; // Importa el componente Register
import Login from './components/Login'; // Importa el componente Login
import SearchResults from './components/SearchResults'; // Importa el componente SearchResults
import BlogDetail from './components/BlogDetail'; // Importa el componente BlogDetail
import { ToastContainer, toast } from 'react-toastify'; // Importa componentes de react-toastify para notificaciones
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos CSS para las notificaciones de react-toastify

// Define estilos globales para la aplicación
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body}; // Establece el color de fondo según el tema actual
    color: ${(props) => props.theme.text}; // Establece el color del texto según el tema actual
    font-family: 'Lato', sans-serif; // Define la familia de fuentes Lato
    transition: background-color 0.3s, color 0.3s; // Añade una transición suave para cambios de tema
  }

  .App {
    display: flex;
    flex-direction: column;
    min-height: 100vh; // Establece la altura mínima para llenar toda la ventana
  }

  .content {
    flex: 1; // Permite que este contenedor crezca y llene el espacio disponible
  }

  a {
    color: ${(props) => props.theme.text}; // Establece el color del enlace según el tema actual
  }
`;

// Define el tema claro
const lightTheme = {
  body: '#f0f8ff', // Color de fondo para el tema claro
  text: '#000', // Color del texto para el tema claro
  headerBg: '#1e90ff', // Color de fondo del encabezado para el tema claro
  headerText: '#FFF', // Color del texto del encabezado para el tema claro
  footerBg: '#1e90ff', // Color de fondo del pie de página para el tema claro
  footerText: '#FFF', // Color del texto del pie de página para el tema claro
  buttonBg: '#ff4500', // Color de fondo del botón para el tema claro
  buttonText: '#FFF', // Color del texto del botón para el tema claro
};

// Define el tema oscuro
const darkTheme = {
  body: '#121212', // Color de fondo para el tema oscuro
  text: '#FFF', // Color del texto para el tema oscuro
  headerBg: '#00008b', // Color de fondo del encabezado para el tema oscuro
  headerText: '#FFF', // Color del texto del encabezado para el tema oscuro
  footerBg: '#00008b', // Color de fondo del pie de página para el tema oscuro
  footerText: '#FFF', // Color del texto del pie de página para el tema oscuro
  buttonBg: '#ff4500', // Color de fondo del botón para el tema oscuro
  buttonText: '#FFF', // Color del texto del botón para el tema oscuro
};

// Componente principal de la aplicación
function App() {
  
  const [theme, setTheme] = useState(lightTheme); // Estado para el tema actual
  const [blogs, setBlogs] = useState([]); // Estado para la lista de blogs
  const [user, setUser] = useState(null); // Estado para el usuario actualmente autenticado

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')); // Obtiene los blogs almacenados en localStorage
    if (storedBlogs) {
      setBlogs(storedBlogs); // Establece los blogs en el estado
    }

    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Obtiene el usuario autenticado almacenado en localStorage
    if (loggedInUser) {
      setUser(loggedInUser); // Establece el usuario en el estado
    }
  }, []); // Se ejecuta una vez al montar el componente

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme); // Cambia entre el tema claro y oscuro
  };

  const saveBlog = (blog, id) => {
    if (id !== undefined) {
      // Actualiza un blog existente
      const newBlogs = blogs.map((b, index) => (index.toString() === id ? blog : b));
      setBlogs(newBlogs);
      localStorage.setItem('blogs', JSON.stringify(newBlogs)); // Guarda los blogs actualizados en localStorage
      toast.success('Blog updated successfully!'); // Muestra una notificación de éxito
    } else {
      // Guarda un nuevo blog
      const newBlogs = [...blogs, { ...blog, comments: [] }];
      setBlogs(newBlogs);
      localStorage.setItem('blogs', JSON.stringify(newBlogs)); // Guarda los nuevos blogs en localStorage
      toast.success('Blog saved successfully!'); // Muestra una notificación de éxito
    }
  };

  const deleteBlog = (index) => {
    const newBlogs = blogs.filter((_, i) => i !== index); // Elimina el blog del índice especificado
    setBlogs(newBlogs);
    localStorage.setItem('blogs', JSON.stringify(newBlogs)); // Guarda los blogs actualizados en localStorage
    toast.error('Blog deleted successfully!'); // Muestra una notificación de eliminación
  };

  const addComment = (blogIndex, comment) => {
    const newBlogs = [...blogs];
    const blog = newBlogs[blogIndex];
    if (!blog.comments) {
      blog.comments = [];
    }
    blog.comments.push(comment); // Añade un comentario al blog
    setBlogs(newBlogs);
    localStorage.setItem('blogs', JSON.stringify(newBlogs)); // Guarda los blogs actualizados en localStorage
    toast.success('Comment added successfully!'); // Muestra una notificación de éxito
  };

  const addReply = (blogIndex, commentIndex, reply) => {
    const newBlogs = [...blogs];
    const blog = newBlogs[blogIndex];
    if (!blog.comments) {
      blog.comments = [];
    }
    const comment = blog.comments[commentIndex];
    if (!comment) {
      toast.error('Comment not found!'); // Muestra una notificación de error si no se encuentra el comentario
      return;
    }
    if (!comment.replies) {
      comment.replies = [];
    }
    comment.replies.push(reply); // Añade una respuesta al comentario
    setBlogs(newBlogs);
    localStorage.setItem('blogs', JSON.stringify(newBlogs)); // Guarda los blogs actualizados en localStorage
    toast.success('Reply added successfully!'); // Muestra una notificación de éxito
  };

  const editComment = (blogIndex, commentIndex, newContent) => {
    const newBlogs = [...blogs];
    const blog = newBlogs[blogIndex];
    if (!blog.comments) {
      toast.error('Comments not found!'); // Muestra una notificación de error si no se encuentran comentarios
      return;
    }
    if (!blog.comments[commentIndex]) {
      toast.error('Comment not found!'); // Muestra una notificación de error si no se encuentra el comentario
      return;
    }
    blog.comments[commentIndex].content = newContent; // Edita el contenido del comentario
    setBlogs(newBlogs);
    localStorage.setItem('blogs', JSON.stringify(newBlogs)); // Guarda los blogs actualizados en localStorage
    toast.success('Comment updated successfully!'); // Muestra una notificación de éxito
  };
  

  const deleteComment = (blogIndex, commentIndex) => {
    const newBlogs = [...blogs];
    const blog = newBlogs[blogIndex];
    if (!blog.comments) {
      toast.error('Comments not found!'); // Muestra una notificación de error si no se encuentran comentarios
      return;
    }
    if (!blog.comments[commentIndex]) {
      toast.error('Comment not found!'); // Muestra una notificación de error si no se encuentra el comentario
      return;
    }
    blog.comments.splice(commentIndex, 1); // Elimina el comentario
    setBlogs(newBlogs);
    localStorage.setItem('blogs', JSON.stringify(newBlogs)); // Guarda los blogs actualizados en localStorage
    toast.error('Comment deleted successfully!'); // Muestra una notificación de eliminación
  };

  const editReply = (blogIndex, commentIndex, replyIndex, newContent) => {
    const newBlogs = [...blogs];
    const blog = newBlogs[blogIndex];
    if (!blog.comments || !blog.comments[commentIndex] || !blog.comments[commentIndex].replies) {
      toast.error('Reply not found!'); // Muestra una notificación de error si no se encuentra la respuesta
      return;
    }
    blog.comments[commentIndex].replies[replyIndex].content = newContent; // Edita el contenido de la respuesta
    setBlogs(newBlogs);
    localStorage.setItem('blogs', JSON.stringify(newBlogs)); // Guarda los blogs actualizados en localStorage
    toast.success('Reply updated successfully!'); // Muestra una notificación de éxito
  };

  const deleteReply = (blogIndex, commentIndex, replyIndex) => {
    const newBlogs = [...blogs];
    const blog = newBlogs[blogIndex];
    if (!blog.comments || !blog.comments[commentIndex] || !blog.comments[commentIndex].replies) {
      toast.error('Reply not found!'); // Muestra una notificación de error si no se encuentra la respuesta
      return;
    }
    blog.comments[commentIndex].replies.splice(replyIndex, 1); // Elimina la respuesta
    setBlogs(newBlogs);
    localStorage.setItem('blogs', JSON.stringify(newBlogs)); // Guarda los blogs actualizados en localStorage
    toast.success('Reply deleted successfully!'); // Muestra una notificación de éxito
  };

  return (
    <ThemeProvider theme={theme}> {/* Proveedor de tema que cambia según el estado actual del tema */}
      <GlobalStyle /> {/* Aplica los estilos globales */}
      <ToastContainer /> {/* Contenedor para las notificaciones */}
      <Router> {/* Proveedor de Router para manejar las rutas */}
        <div className="App">
          <Header toggleTheme={toggleTheme} user={user} setUser={setUser} currentTheme={theme === lightTheme ? 'light' : 'dark'} /> {/* Componente de encabezado con propiedades para cambiar el tema y manejar el usuario */}
          <div className="content">
            <Routes> {/* Define las rutas de la aplicación */}
              <Route path="/" element={<HomePage blogs={blogs} deleteBlog={deleteBlog} user={user} />} /> {/* Ruta para la página de inicio */}
              <Route path="/create" element={<BlogEntry saveBlog={saveBlog} user={user} />} /> {/* Ruta para crear una nueva entrada de blog */}
              <Route path="/edit/:id" element={<BlogEntry blogs={blogs} saveBlog={saveBlog} user={user} />} /> {/* Ruta para editar una entrada de blog existente */}
              <Route
                path="/comments/:index"
                element={<CommentPage blogs={blogs} user={user} addComment={addComment} addReply={addReply} editComment={editComment} deleteComment={deleteComment} editReply={editReply} deleteReply={deleteReply} />}
              /> {/* Ruta para la página de comentarios */}
              <Route path="/register" element={<Register setUser={setUser} />} /> {/* Ruta para la página de registro */}
              <Route path="/login" element={<Login setUser={setUser} />} /> {/* Ruta para la página de inicio de sesión */}
              <Route path="/search" element={<SearchResults isDarkMode={theme === darkTheme} />} /> {/* Ruta para la página de resultados de búsqueda */}
              <Route path="/blog/:id" element={<BlogDetail blogs={blogs} />} /> {/* Ruta para la página de detalles del blog */}
            </Routes>
          </div>
          <Footer /> {/* Componente de pie de página */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; // Exporta el componente App como el valor por defecto
