import React, { useEffect, useState } from 'react'; // Importa React y los hooks useEffect y useState
import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation desde react-router-dom
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'; // Importa styled-components y ThemeProvider para el manejo de temas y estilos

// Define estilos globales para la aplicación
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background}; // Establece el color de fondo según el tema actual
    color: ${(props) => props.theme.text}; // Establece el color del texto según el tema actual
    transition: background-color 0.3s ease, color 0.3s ease; // Añade una transición suave para cambios de tema
  }
`;

// Define el tema oscuro
const darkTheme = {
  background: '#1c1c1c', // Color de fondo para el tema oscuro
  cardBg: '#2c3e50', // Color de fondo de las tarjetas para el tema oscuro
  text: '#ecf0f1', // Color del texto para el tema oscuro
  border: '#444', // Color del borde para el tema oscuro
  header: '#ffffff', // Color del encabezado para el tema oscuro
};

// Define el tema claro
const lightTheme = {
  background: '#f9f9f9', // Color de fondo para el tema claro
  cardBg: '#ffffff', // Color de fondo de las tarjetas para el tema claro
  text: '#2c3e50', // Color del texto para el tema claro
  border: '#ddd', // Color del borde para el tema claro
  header: '#000000', // Color del encabezado para el tema claro
};

// Estilos para el contenedor de resultados
const ResultsWrapper = styled.div`
  padding: 2rem; // Padding interno de 2rem
  font-family: 'Roboto', sans-serif; // Familia de fuentes Roboto
`;

// Estilos para cada ítem de resultado
const ResultItem = styled.div`
  background-color: ${(props) => props.theme.cardBg}; // Color de fondo de la tarjeta basado en el tema
  color: ${(props) => props.theme.text}; // Color del texto basado en el tema
  padding: 1rem; // Padding interno de 1rem
  margin-bottom: 1rem; // Margen inferior de 1rem
  border-radius: 5px; // Bordes redondeados
  border: 1px solid ${(props) => props.theme.border}; // Borde basado en el tema
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // Sombra de la caja
  transition: background-color 0.3s ease, color 0.3s ease; // Transición suave para cambios de tema

  h3 {
    margin-top: 0; // Elimina el margen superior en los encabezados h3
    color: ${(props) => props.theme.header}; // Color del encabezado basado en el tema
  }
`;

// Estilos para el enlace de "Ver más"
const MoreLink = styled(Link)`
  color: ${(props) => props.theme.text}; // Color del enlace basado en el tema
  text-decoration: underline; // Subraya el texto del enlace
  cursor: pointer; // Cambia el cursor a pointer

  &:hover {
    color: ${(props) => props.theme.header}; // Color del enlace al pasar el cursor basado en el tema
  }
`;

// Componente principal de resultados de búsqueda
const SearchResults = ({ isDarkMode }) => {
  
  const location = useLocation(); // Obtiene la ubicación actual

  const [results, setResults] = useState([]); // Define el estado para los resultados de búsqueda


  const author = new URLSearchParams(location.search).get('author'); // Obtiene el parámetro 'author' de la URL

  useEffect(() => {
    if (author) {
      const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || []; // Obtiene los blogs almacenados en localStorage
      const filteredResults = storedBlogs.filter((blog) => blog.author.toLowerCase().includes(author.toLowerCase())); // Filtra los blogs por autor
      setResults(filteredResults); // Actualiza el estado con los resultados filtrados
    }
  }, [author]); // Efecto que se ejecuta cuando cambia el autor

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> 
      <GlobalStyle /> 
      <ResultsWrapper>
        <h2>Search Results for "{author}"</h2> 
        {results.length > 0 ? ( // Si hay resultados, los mapea y muestra
          results.map((result, index) => (
            <ResultItem key={index}>
              <h3>{result.title}</h3> 
              <div
                dangerouslySetInnerHTML={{
                  __html: `${result.content.split(' ').slice(0, 50).join(' ')}...`, // Muestra un fragmento del contenido
                }}
              />
              <MoreLink to={`/blog/${index}`}>Ver más</MoreLink> 
              <h3>Author: {result.author}</h3> 
            </ResultItem>
          ))
        ) : (
          <p>No results found.</p> // Si no hay resultados, muestra un mensaje
        )}
      </ResultsWrapper>
    </ThemeProvider>
  );
};

export default SearchResults; // Exporta el componente SearchResults como el valor por defecto
