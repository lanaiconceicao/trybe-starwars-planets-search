import React, { useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';

// ============================================

// REQUISITO 1

// ============================================
// Faça uma requisição para o endpoint /planets da API de Star Wars e preencha
// uma tabela com os dados retornados, com exceção dos da coluna residents
// A tabela deve ser renderizada por um componente chamado <Table />.
// Os dados recebidos da API devem ser salvos num campo chamado data do contexto e
// é daí que a tabela deve lê-los. A requisição deve ser feita num componente
// separado do componente da tabela.
// A API a ser consultada está nesse link. Ou seja, você deverá fazer um fetch
// para a URL https://swapi-trybe.herokuapp.com/api/planets/

// A tabela deve ter uma primeira linha com os headers e as demais com as informações
// de cada campo.

// O que será verificado:
// - Realiza uma requisição para a API
// - Preenche a tabela com os dados retornados
// - Verifica se a tabela tem 13 colunas
// - Verifica se a tabela tem uma linha para cada planeta retornado
// ============================================

function Table() {
  const { data, setData } = useContext(MyContext);

  // Similar ao componentDidMount: useEffect
  useEffect(() => {
    // Requisição da API
    const getData = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const fetchApi = await fetch(url);
      const json = await fetchApi.json();
      const { results } = json;
      // Função que altera o estado utilizando o resultado da chamada da API
      setData(results);
    };

    getData();
  }, []);

  // Criando a table: https://www.valentinog.com/blog/html-table/
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { data.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
