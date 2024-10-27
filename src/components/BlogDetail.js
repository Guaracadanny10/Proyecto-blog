import React from 'react'; // Importa la biblioteca React
import { useParams } from 'react-router-dom'; // Importa el hook useParams de react-router-dom para obtener parámetros de la URL
import styled from 'styled-components'; // Importa styled-components para el estilo basado en componentes

// Define un componente con estilo llamado BlogDetailWrapper
const BlogDetailWrapper = styled.div`
  padding: 2rem; // Espaciado interno
  background-color: ${(props) => props.theme.body}; // Color de fondo basado en el tema
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
  min-height: 100vh; // Altura mínima de toda la pantalla
  display: flex; // Usa flexbox para el diseño
  justify-content: center; // Centra horizontalmente
  align-items: center; // Centra verticalmente

  @media (max-width: 768px) {
    padding: 1rem; // Ajusta el espaciado interno para pantallas pequeñas
  }
`;

// Define un componente con estilo llamado BlogContent
const BlogContent = styled.div`
  max-width: 800px; // Ancho máximo del contenido
  width: 100%; // Ancho completo del contenedor padre
  margin: 0 auto; // Centra el contenedor horizontalmente
  padding: 2rem; // Espaciado interno
  background-color: ${(props) => (props.theme.body === '#f0f8ff' ? '#ffffff' : '#333')}; // Color de fondo basado en una condición del tema
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
  border-radius: 8px; // Bordes redondeados
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Sombra para el contenedor

  @media (max-width: 768px) {
    padding: 1rem; // Ajusta el espaciado interno para pantallas pequeñas
  }
`;

// Define un componente con estilo llamado BlogTitle
const BlogTitle = styled.h1`
  font-family: 'Arial', sans-serif; // Fuente del título
  font-size: 2rem; // Tamaño de fuente del título
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
  margin-bottom: 1rem; // Margen inferior
  

  @media (max-width: 768px) {
    font-size: 1.5rem; // Ajusta el tamaño de la fuente para pantallas pequeñas
  }
`;

// Define un componente con estilo llamado BlogAuthor
const BlogAuthor = styled.h3`
  font-family: 'Roboto', sans-serif; // Fuente del autor
  font-size: 1.2rem; // Tamaño de fuente del autor
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
  margin-bottom: 1rem; // Margen inferior

  @media (max-width: 768px) {
    font-size: 1rem; // Ajusta el tamaño de la fuente para pantallas pequeñas
  }
`;

// Define un componente con estilo llamado BlogDate
const BlogDate = styled.p`
  font-family: 'Open Sans', sans-serif; // Fuente de la fecha
  font-size: 0.875rem; // Tamaño de fuente de la fecha
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
  margin-bottom: 1rem; // Margen inferior

  @media (max-width: 768px) {
    font-size: 0.75rem; // Ajusta el tamaño de la fuente para pantallas pequeñas
  }
`;

// Define el componente funcional BlogDetail que recibe blogs como prop
const BlogDetail = ({ blogs }) => {
  const { id } = useParams(); // Obtiene el parámetro id de la URL
  const blog = blogs[id]; // Busca el blog con el id correspondiente en el objeto blogs

  if (!blog) {
    return <BlogDetailWrapper>Blog not found</BlogDetailWrapper>; // Si el blog no se encuentra, muestra un mensaje
  }

  return (
    <BlogDetailWrapper>
      <BlogContent>
        <BlogTitle>{blog.title}</BlogTitle> {/* Muestra el título del blog */}
        <BlogAuthor>Author: {blog.author}</BlogAuthor> {/* Muestra el autor del blog */}
        <div dangerouslySetInnerHTML={{ __html: blog.content }} /> {/* Muestra el contenido del blog como HTML */}
        <BlogDate>Posted on {blog.date ? new Date(blog.date).toLocaleDateString() : 'Unknown Date'}</BlogDate> {/* Muestra la fecha del blog formateada, o 'Unknown Date' si no hay fecha */}
      </BlogContent>
    </BlogDetailWrapper>
  );
};

export default BlogDetail; // Exporta el componente BlogDetail como predeterminado
