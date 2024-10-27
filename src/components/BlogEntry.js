// Importa React y hooks de React
import React, { useState, useEffect } from 'react';

// Importa hooks de React Router para manejar parámetros y navegación
import { useParams, useNavigate } from 'react-router-dom';

// Importa styled-components para el estilado del componente
import styled from 'styled-components';

// Importa el editor de texto enriquecido de TinyMCE
import { Editor } from '@tinymce/tinymce-react';


import { RiImageAddFill } from "react-icons/ri";

// Importa react-toastify para mostrar notificaciones y su archivo de estilos
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Estilos para el contenedor principal del componente
const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 2rem auto;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

// Estilos para la barra lateral (sidebar)
const Sidebar = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: ${(props) => props.theme.sidebarBg};
  color: ${(props) => props.theme.sidebarText};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 2rem;
  }
`;

// Estilos para el formulario del blog
const BlogForm = styled.form`
  flex: 3;
  padding: 2rem;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Estilos para el título del formulario
const FormTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Estilos para los grupos de formularios (etiqueta + campo de entrada)
const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

// Estilos para las etiquetas de los formularios
const FormLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Estilos para los campos de entrada de los formularios
const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

// Estilos para los botones del formulario
const FormButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.buttonText};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff6347;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

// Estilos para el botón de icono para subir imágenes
const IconButton = styled.label`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.buttonText};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  img {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
    filter: ${(props) => props.theme.iconFilter};
  }
`;

// Componente BlogEntry para crear/editar una entrada del blog
const BlogEntry = ({ blogs, saveBlog, user }) => {
  // Obtiene el parámetro 'id' de la URL
  const { id } = useParams();
  // Hook para la navegación programática
  const navigate = useNavigate();

  // Estado para almacenar la información del blog
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    author: user ? user.name : '', // Autor del blog (basado en el usuario actual)
    date: new Date().toISOString().substr(0, 10), // Fecha actual en formato ISO (YYYY-MM-DD)
    image: null, // Imagen del blog
  });

  // Efecto para cargar los datos del blog si existe un 'id' en la URL
  useEffect(() => {
    if (id !== undefined && blogs[id]) {
      setBlog(blogs[id]);
    } 
  }, [id, blogs]);

  // Manejador para actualizar el estado cuando cambian los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  // Manejador para actualizar el estado cuando se selecciona una imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtiene el archivo seleccionado
    const reader = new FileReader(); // Crea una nueva instancia de FileReader
    reader.onload = (event) => {
      const imgHtml = `<img src="${event.target.result}" style="max-width: 100%;"/>`; // Genera el HTML de la imagen
      setBlog((prevBlog) => ({
        ...prevBlog,
        content: prevBlog.content + imgHtml, // Agrega la imagen al contenido del blog
      }));
    };
    reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    setBlog({
      ...blog,
      image: file, // Almacena el archivo de imagen en el estado
    });
  };

  // Manejador para actualizar el estado cuando cambia el contenido del editor
  const handleEditorChange = (newContent) => {
    setBlog({
      ...blog,
      content: newContent, // Actualiza el contenido del blog
    });
  };

  // Manejador para guardar el blog cuando se envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    if (!blog.title || !blog.content || !blog.author) { // Verifica que los campos requeridos no estén vacíos
      toast.error('Please fill out all required fields.'); // Muestra un toast de error si hay campos vacíos
      return;
    }
    if (id !== undefined) {
      saveBlog(blog, id); // Actualiza el blog si existe un 'id'
    } else {
      saveBlog(blog); // Guarda un nuevo blog si no hay 'id'
    }
    toast.success('Blog saved successfully!'); // Muestra un toast de éxito
    navigate('/'); // Navega a la página principal
  };

  return (
    <Container>
      <Sidebar>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormInput type="text" name="title" value={blog.title} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Insert Image</FormLabel>
          <FormInput type="file" name="image" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="image-upload" />
          <IconButton htmlFor="image-upload">
          <RiImageAddFill />
          </IconButton>
        </FormGroup>
        <FormButton type="submit" onClick={handleSubmit}>
          {id !== undefined ? 'Update Blog' : 'Save Blog'}
        </FormButton>
      </Sidebar>
      <BlogForm onSubmit={handleSubmit}>
        <FormTitle>{id !== undefined ? 'Edit Blog' : 'Create New Blog'}</FormTitle>
        <Editor
          apiKey="rehwsdw9pw12vrelzkfuxgk9zzxrk7z1af03tweien6feu2i" // Clave API para TinyMCE
          value={blog.content} // Contenido del editor
          onEditorChange={handleEditorChange} // Manejador para cambios en el contenido del editor
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist autolink autosave autoresize bbcode charmap code codesample colorpicker directionality emoticons fullpage fullscreen help hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print quickbars save searchreplace spellchecker tabfocus table template textpattern toc visualblocks visualchars wordcount',
            ],
            toolbar: `
              undo redo | formatselect | fontselect | fontsizeselect | 
              bold italic underline strikethrough | forecolor backcolor removeformat | 
              alignleft aligncenter alignright alignjustify | 
              bullist numlist outdent indent | 
              link image media | codesample | 
              blockquote subscript superscript | 
              charmap emoticons hr | 
              fullscreen preview print | 
              insertfile insertdatetime template | 
              searchreplace visualblocks visualchars code | 
              ltr rtl | spellchecker a11ychecker | 
              save restoredraft | toc | 
              help
            `,
          }}
        />
      </BlogForm>
      <ToastContainer /> {/* Contenedor para los toasts */}
    </Container>
  );
};

export default BlogEntry;
