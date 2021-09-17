import React, { useEffect, useContext, useState } from 'react';
import MyContext from '../context/MyContext';
import Input from './Input';

function Table() {
  // Estado para requisito 1
  const { data, setData } = useContext(MyContext);
  // Estado para requisito 2
  const [filteredName, setFilteredName] = useState('');

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

  const onChangeInput = (event) => {
    setFilteredName(event.target.value);
  };

  // Criando a table: https://www.valentinog.com/blog/html-table/
  return (
    <div>
      <Input onChange={ onChangeInput } />
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
          { data.filter((d) => filteredName === '' || d.name.includes(filteredName))
            .map((planet) => (
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
