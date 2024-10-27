import React, { useState } from 'react'; // Importa React y el hook useState
import { useParams, useNavigate } from 'react-router-dom'; // Importa los hooks useParams y useNavigate de react-router-dom
import styled from 'styled-components'; // Importa styled-components para el estilo basado en componentes
import { FaUser } from 'react-icons/fa'; // Importa el icono de usuario de react-icons

// Define un componente con estilo llamado Container
const Container = styled.div`
  max-width: 800px; // Ancho máximo del contenedor
  margin: 0 auto; // Centra el contenedor horizontalmente
  padding: 20px; // Relleno de 20px
  background-color: ${(props) => props.theme.background}; // Color de fondo basado en el tema
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
`;

// Define un componente con estilo llamado BlogDetailWrapper
const BlogDetailWrapper = styled.div`
  padding: 2rem; // Relleno de 2rem
  background-color: ${(props) => props.theme.body}; // Color de fondo basado en el tema
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
  min-height: 100vh; // Altura mínima de 100vh
`;

// Define un componente con estilo llamado BlogContent
const BlogContent = styled.div`
  max-width: 800px; // Ancho máximo del contenido del blog
  margin: 0 auto; // Centra el contenedor horizontalmente
  padding: 2rem; // Relleno de 2rem
  background-color: ${(props) => (props.theme.body === '#f0f8ff' ? '#ffffff' : '#333')}; // Color de fondo basado en el tema
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
  border-radius: 8px; // Bordes redondeados
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Sombra del contenedor
`;

// Define un componente con estilo llamado BlogTitle
const BlogTitle = styled.h1`
  font-family: 'Arial', sans-serif; // Fuente del título
  font-size: 2.5rem; // Tamaño de fuente del título
  font-weight: bold; // Fuente en negrita
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
  margin-bottom: 1.5rem; // Margen inferior de 1.5rem
`;

// Define un componente con estilo llamado BlogAuthor
const BlogAuthor = styled.h3`
  font-family: 'Roboto', sans-serif; // Fuente del autor
  font-size: 1.2rem; // Tamaño de fuente del autor
  color: ${(props) => props.theme.textSecondary}; // Color del texto secundario basado en el tema
  margin-bottom: 1rem; // Margen inferior de 1rem
`;

// Define un componente con estilo llamado BlogDate
const BlogDate = styled.p`
  font-family: 'Open Sans', sans-serif; // Fuente de la fecha
  font-size: 0.875rem; // Tamaño de fuente de la fecha
  color: ${(props) => props.theme.textSecondary}; // Color del texto secundario basado en el tema
  margin-bottom: 2rem; // Margen inferior de 2rem
`;

// Define un componente con estilo llamado CommentSection
const CommentSection = styled.div`
  margin-top: 40px; // Margen superior de 40px
`;

// Define un componente con estilo llamado CommentWrapper
const CommentWrapper = styled.div`
  padding: 20px; // Relleno de 20px
  border: 1px solid ${(props) => props.theme.border}; // Borde basado en el tema
  border-radius: 8px; // Bordes redondeados
  margin-bottom: 20px; // Margen inferior de 20px
  background-color: ${(props) => props.theme.commentBg}; // Color de fondo basado en el tema
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Sombra del contenedor
  display: flex; // Usa flexbox para el diseño
  flex-direction: column; // Dirección de los elementos hijos en columna
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
`;

// Define un componente con estilo llamado UserImage
const UserImage = styled.div`
  display: flex; // Usa flexbox para el diseño
  align-items: center; // Alinea elementos en el centro verticalmente
  margin-bottom: 10px; // Margen inferior de 10px
`;

// Define un componente con estilo llamado UserIcon
const UserIcon = styled(FaUser)`
  margin-right: 10px; // Margen derecho de 10px
  font-size: 1.5rem; // Tamaño de fuente del icono
  color: ${(props) => props.theme.textSecondary}; // Color del texto secundario basado en el tema
`;

// Define un componente con estilo llamado CommentContent
const CommentContent = styled.div`
  flex: 1; // Flex-grow, permite que el contenedor crezca
`;

// Define un componente con estilo llamado CommentText
const CommentText = styled.p`
  font-size: 1.1rem; // Tamaño de fuente del comentario
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
  margin-bottom: 10px; // Margen inferior de 10px
`;

// Define un componente con estilo llamado CommentMeta
const CommentMeta = styled.div`
  font-size: 0.9rem; // Tamaño de fuente del meta
  color: ${(props) => props.theme.textSecondary}; // Color del texto secundario basado en el tema
  display: flex; // Usa flexbox para el diseño
  justify-content: space-between; // Distribuye elementos entre el inicio y el final
  align-items: center; // Alinea elementos en el centro verticalmente
  margin-top: 10px; // Margen superior de 10px
`;

// Define un componente con estilo llamado Button
const Button = styled.button`
  padding: 10px 20px; // Relleno interno vertical y horizontal
  background-color: #2196F3;// Color de fondo del botón basado en el tema
  color: ${(props) => props.theme.buttonText}; // Color del texto del botón basado en el tema
  border: none; // Sin borde
  border-radius: 8px; // Bordes redondeados
  cursor: pointer; // Cambia el cursor al pasar sobre el botón
  font-size: 1rem; // Tamaño de fuente del botón
  margin-right: 10px; // Margen derecho de 10px
  transition: background-color 0.3s ease, transform 0.2s ease; // Transición suave para el cambio de color de fondo y transformación
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBg}; // Color de fondo al pasar el cursor sobre el botón
    transform: scale(1.05); // Aumenta el tamaño del botón al pasar el cursor
  }
  &:active {
    transform: scale(0.95); // Disminuye el tamaño del botón al hacer clic
  }
`;

// Define un componente con estilo llamado ReplyForm
const ReplyForm = styled.form`
  display: flex; // Usa flexbox para el diseño
  flex-direction: column; // Dirección de los elementos hijos en columna
  margin-top: 10px; // Margen superior de 10px
`;

// Define un componente con estilo llamado ReplyInput
const ReplyInput = styled.textarea`
  font-size: 1rem; // Tamaño de fuente del input
  padding: 12px; // Relleno interno de 12px
  margin-bottom: 10px; // Margen inferior de 10px
  border: 1px solid ${(props) => props.theme.border}; // Borde basado en el tema
  border-radius: 4px; // Bordes redondeados
  background-color: ${(props) => props.theme.inputBg}; // Color de fondo basado en el tema
  color: ${(props) => props.theme.inputText}; // Color del texto basado en el tema
  resize: vertical; // Permite el redimensionamiento vertical
  min-height: 80px; // Altura mínima de 80px
`;

// Define un componente con estilo llamado NoCommentsText
const NoCommentsText = styled.p`
  font-size: 1rem; // Tamaño de fuente del texto
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
`;

// Define el componente funcional CommentPage que recibe varias props
const CommentPage = ({ blogs, user, addComment, addReply, editComment, deleteComment, editReply, deleteReply }) => {
  const { index } = useParams(); // Obtiene el parámetro index de la URL
  const navigate = useNavigate(); // Hook para navegar a diferentes rutas
  const blog = blogs[index]; // Obtiene el blog correspondiente al índice
  const [formData, setFormData] = useState({
    newComment: '', // Contenido del nuevo comentario
    replyContent: '', // Contenido de la respuesta
    editContent: '', // Contenido de la edición
    editingCommentIndex: null, // Índice del comentario que se está editando
    replyingCommentIndex: null, // Índice del comentario al que se está respondiendo
    replyingReplyIndex: null, // Índice de la respuesta a la que se está respondiendo
    editingReplyIndex: null, // Índice de la respuesta que se está editando
  });

  // Si no se encuentra el blog, muestra un mensaje
  if (!blog) {
    return <Container>Blog not found</Container>;
  }

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja la adición de un nuevo comentario
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login'); // Redirige al usuario a la página de login si no está autenticado
      return;
    }
    const { newComment } = formData;
    if (newComment.trim()) {
      addComment(index, { content: newComment, author: user.name, date: new Date().toISOString() });
      setFormData({ ...formData, newComment: '' });
    }
  };

  // Maneja la respuesta a un comentario o respuesta
  const handleReply = (commentIndex, parentReplyIndex = null) => {
    if (!user) {
      navigate('/login'); // Redirige al usuario a la página de login si no está autenticado
      return;
    }
    const { replyContent } = formData;
    if (replyContent.trim()) {
      addReply(index, commentIndex, { content: replyContent, author: user.name, date: new Date().toISOString(), parentReplyIndex });
      setFormData({ ...formData, replyContent: '', replyingCommentIndex: null, replyingReplyIndex: null });
    }
  };

  // Maneja la edición de un comentario
  const handleEditComment = (commentIndex) => {
    if (!user) {
      navigate('/login'); // Redirige al usuario a la página de login si no está autenticado
      return;
    }
    const { editContent } = formData;
    if (editContent.trim()) {
      editComment(index, commentIndex, editContent);
      setFormData({ ...formData, editContent: '', editingCommentIndex: null });
    }
  };

  // Maneja la eliminación de un comentario
  const handleDeleteComment = (commentIndex) => {
    if (!user) {
      navigate('/login'); // Redirige al usuario a la página de login si no está autenticado
      return;
    }
    deleteComment(index, commentIndex);
  };

  // Maneja la edición de una respuesta
  const handleEditReply = (commentIndex, replyIndex) => {
    if (!user) {
      navigate('/login'); // Redirige al usuario a la página de login si no está autenticado
      return;
    }
    const { editContent } = formData;
    if (editContent.trim()) {
      editReply(index, commentIndex, replyIndex, editContent);
      setFormData({ ...formData, editContent: '', editingReplyIndex: null });
    }
  };

  // Maneja la eliminación de una respuesta
  const handleDeleteReply = (commentIndex, replyIndex) => {
    if (!user) {
      navigate('/login'); // Redirige al usuario a la página de login si no está autenticado
      return;
    }
    deleteReply(index, commentIndex, replyIndex);
  };

  // Renderiza las respuestas anidadas
  const renderReplies = (replies, commentIndex, parentReplyIndex = null) => {
    return replies.map((reply, replyIndex) => (
      <div key={replyIndex} style={{ marginLeft: parentReplyIndex !== null ? '20px' : '0px' }}>
        <CommentWrapper>
          <UserImage>
            <UserIcon />
            {reply.author}
          </UserImage>
          <CommentContent>
            <CommentText>{reply.content}</CommentText>
            <CommentMeta>
              <span>{reply.date ? new Date(reply.date).toLocaleDateString() : 'Unknown Date'}</span>
              {(user && (user.name === reply.author || user.isAdmin)) && (
                <div>
                  <Button onClick={() => setFormData({ ...formData, editingReplyIndex: replyIndex, editContent: reply.content })}>Editar</Button>
                  <Button onClick={() => handleDeleteReply(commentIndex, replyIndex)}>Eliminar</Button>
                </div>
              )}
            </CommentMeta>
            <Button onClick={() => setFormData({ ...formData, replyingReplyIndex: replyIndex })}>Responder</Button>
            {formData.editingReplyIndex === replyIndex && (
              <ReplyForm
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditReply(commentIndex, replyIndex);
                }}
              >
                <ReplyInput
                  name="editContent"
                  value={formData.editContent}
                  onChange={handleChange}
                  placeholder="Edit your reply"
                />
                <Button type="submit">Guardar Cambios</Button>
              </ReplyForm>
            )}
            {formData.replyingReplyIndex === replyIndex && (
              <ReplyForm
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReply(commentIndex, replyIndex);
                }}
              >
                <ReplyInput
                  name="replyContent"
                  value={formData.replyContent}
                  onChange={handleChange}
                  placeholder="Write your reply"
                />
                <Button type="submit">Responder</Button>
              </ReplyForm>
            )}
            {reply.replies && reply.replies.length > 0 && renderReplies(reply.replies, commentIndex, replyIndex)}
          </CommentContent>
        </CommentWrapper>
      </div>
    ));
  };

  return (
    <BlogDetailWrapper>
      <BlogContent>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogAuthor>By {blog.author}</BlogAuthor>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        <BlogDate>Posted on {blog.date ? new Date(blog.date).toLocaleDateString() : 'Unknown Date'}</BlogDate>
      </BlogContent>
      <CommentSection>
        <h2>Comentarios</h2>
        {blog.comments.length > 0 ? (
          blog.comments.map((comment, commentIndex) => (
            <CommentWrapper key={commentIndex}>
              <UserImage>
                <UserIcon />
                {comment.author}
              </UserImage>
              <CommentContent>
                <CommentText>{comment.content}</CommentText>
                <CommentMeta>
                  <span>{comment.date ? new Date(comment.date).toLocaleDateString() : 'Unknown Date'}</span>
                  {(user && (user.name === comment.author || user.isAdmin)) && (
                    <div>
                      <Button onClick={() => setFormData({ ...formData, editingCommentIndex: commentIndex })}>Editar</Button>
                      <Button onClick={() => handleDeleteComment(commentIndex)}>Eliminar</Button>
                    </div>
                  )}
                </CommentMeta>
                <Button onClick={() => setFormData({ ...formData, replyingCommentIndex: commentIndex })}>Responder</Button>
                {formData.editingCommentIndex === commentIndex && (
                  <ReplyForm
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditComment(commentIndex);
                    }}
                  >
                    <ReplyInput
                      name="editContent"
                      value={formData.editContent}
                      onChange={handleChange}
                      placeholder="Edit your comment"
                    />
                    <Button type="submit">Save</Button>
                  </ReplyForm>
                )}
                {formData.replyingCommentIndex === commentIndex && (
                  <ReplyForm
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleReply(commentIndex);
                    }}
                  >
                    <ReplyInput
                      name="replyContent"
                      value={formData.replyContent}
                      onChange={handleChange}
                      placeholder="Write your reply"
                    />
                    <Button type="submit">Reply</Button>
                  </ReplyForm>
                )}
                {comment.replies && comment.replies.length > 0 && renderReplies(comment.replies, commentIndex)}
              </CommentContent>
            </CommentWrapper>
          ))
        ) : (
          <NoCommentsText>No comments yet.</NoCommentsText>
        )}
        {user ? (
          <>
            <h3>Escribe tu comentario</h3>
            <ReplyForm onSubmit={handleAddComment}>
              <ReplyInput
                name="newComment"
                value={formData.newComment}
                onChange={handleChange}
                placeholder="Escribe tu comentario"
              />
              <Button type="submit">Añadir comentario</Button>
            </ReplyForm>
          </>
        ) : (
          <p>Debes estar conectado para comentar. <Button onClick={() => navigate('/login')}>Login</Button></p>
        )}
      </CommentSection>
    </BlogDetailWrapper>
  );
};

export default CommentPage; // Exporta el componente CommentPage como predeterminado
