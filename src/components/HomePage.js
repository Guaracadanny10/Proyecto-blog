import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub, FaUserAstronaut , FaComments , FaEye, FaTwitter } from 'react-icons/fa'; // Cambia LinkedIn por FaGithub y agrega FaTwitter

// Estilo para el contenedor principal de la página
const HomePageWrapper = styled.div`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  min-height: 100vh;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Estilo para el grid de los blogs
const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1400px;
`;

// Estilo para cada item de blog
const BlogItem = styled.div`
  background-color: ${(props) => (props.theme.body === '#f0f8ff' ? '#ffffff' : '#1e1e1e')};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

// Estilo para el encabezado del blog
const BlogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

// Estilo para el icono de usuario
const UserIcon = styled(FaUserAstronaut )`
  font-size: 50px;
  margin-right: 15px;
  color: ${(props) => props.theme.text};
`;

// Estilo para la información del autor
const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

// Estilo para el nombre del autor
const AuthorName = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  color: ${(props) => props.theme.text};
  margin: 0;
  font-weight: 500;
`;

// Estilo para el rol del autor
const AuthorRole = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  color: #888;
`;

// Estilo para el icono de GitHub (en lugar de LinkedIn)
// Redes sociales del autor mejor alineadas y modernizadas
const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: #0073b1; /* Color base para los íconos */
    transition: color 0.3s;

    &:hover {
      color: #005582; /* Color más oscuro al hacer hover */
    }
    
    svg {
      font-size: 24px; /* Ajusta el tamaño si es necesario */
    }
  }
`;


// Estilo para el título del blog
const BlogTitle = styled.h3`
  font-family: 'Lato', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  margin-bottom: 1.2rem;
  line-height: 1.2;
`;

// Estilo para el contenido del blog
const BlogContent = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: ${(props) => props.theme.text};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

// Estilo para los metadatos del blog
const BlogMeta = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme.text};
  margin-top: 1.5rem;
  text-align: right;
  line-height: 1.6;
`;

// Estilo para el enlace de editar
const EditLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #1e88e5; /* Azul */
  color: white;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  margin-right: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #1565c0; /* Azul más oscuro */
  }
`;

// Estilo para el botón de borrar
const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #e53935; /* Rojo */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c62828; /* Rojo más oscuro */
  }
`;

// Estilo para el enlace de crear nuevo blog
const CreateLink = styled(Link)`
  display: ${(props) => (props.user ? 'inline-block' : 'none')};
  margin: 2rem 0;
  padding: 0.75rem 1.5rem;
  background-color: #2196F3; /* Azul */

  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  transition: background-color 0.3s;
    &:hover {
    background-color: #1976D2; /* Azul más oscuro */
    box-shadow: 0 15px 25px rgba(25, 118, 210, 0.4);
  }
`;

// Estilo para el encabezado de la página


// Componente principal de la página de inicio
const HomePage = ({ blogs, deleteBlog, user }) => {
  const countTotalComments = (blog) => {
    let totalComments = 0;
    if (blog.comments && Array.isArray(blog.comments)) {
      totalComments += blog.comments.length;
      blog.comments.forEach((comment) => {
        if (comment.replies && Array.isArray(comment.replies)) {
          totalComments += comment.replies.length;
        }
      });
    }
    return totalComments;
  };

  const getRandomViews = () => {
    return Math.floor(Math.random() * 1000000) + 1;
  };

  return (
    <HomePageWrapper>
     
      <CreateLink to="/create" user={user}>
        Crear Blog
      </CreateLink>
      <BlogGrid>
        {blogs.map((blog, index) => (
          <BlogItem key={index}>
            <Link to={`/blog/${index}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <BlogHeader>
                <UserIcon />
                <AuthorInfo>
                  <AuthorName>{blog.author}</AuthorName>
                  <AuthorRole>Developer</AuthorRole>
                </AuthorInfo>
                <SocialLinks>
                <a href={blog.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href={blog.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              </SocialLinks>
              </BlogHeader>
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogContent
                dangerouslySetInnerHTML={{
                  __html: `${blog.content.split(' ').slice(0, 30).join(' ')}...`,
                }}
              />
            </Link>
            <Link to={`/blog/${index}`} style={{ textDecoration: 'none', color: '#1e88e5' }}>
              Ver más
            </Link>
            {user && user.name === blog.author && (
              <div>
                <EditLink to={`/edit/${index}`}>Edit</EditLink>
                <DeleteButton onClick={() => deleteBlog(index)}>Delete</DeleteButton>
              </div>
            )}
            <BlogMeta>
              <FaEye /> {getRandomViews()} views
              <br />
              <Link to={`/comments/${index}`}>
                <FaComments  /> {countTotalComments(blog)}
              </Link>
              <br />
              Posted on {blog.date ? new Date(blog.date).toLocaleDateString() : 'Unknown Date'}
            </BlogMeta>
          </BlogItem>
        ))}
      </BlogGrid>
    </HomePageWrapper>
  );
};

export default HomePage;
