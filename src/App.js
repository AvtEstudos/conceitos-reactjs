//useEffect: Para disparar uma função
import React, { useState, useEffect } from 'react';
import api from './services/api.js';
import Header from './components/Header';
import './App.css';


function App(){
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProjects(){
    //Cria um novo array de projetos, copiando o array existente e
    //incluindo um novo
    //setProjects([...projects, `Novo projeto ${Date.now()}` ])
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Andre Vital"
    });
    
    const project = response.data;
    setProjects([...projects, project]);
  }

  return ( 
    <>
      <Header title="Projects" />       

      <ul>
        { projects.map(project => <li key={ project.id }> { project.title } </li>) }
      </ul>

      <button type="button" onClick={ handleAddProjects }>Adicionar projeto</button>
    </>
  );
}

export default App;