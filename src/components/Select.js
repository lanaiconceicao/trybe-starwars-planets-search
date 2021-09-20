import React, { useState, useContext } from 'react';
import MyContext from '../context/MyContext';

function Select() {
  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];
  // Trazer meu estado global
  const { data, setData } = useContext(MyContext);
  // Criar meu estado local
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: '>',
    value: 0,
  });
  const [filterColumns, setFilterColumns] = useState(
    columns,
  );

  // Função do filtro que não deve se repetir (requisito 4)
  const noRepeat = () => {
    setFilterColumns(columns);
    const filtered = filterColumns.filter((item) => item !== selected.column);
    setFilterColumns(filtered);
  };

  // Função que cria as <options> de column
  const columnGenerate = () => {
    const columnGenerated = filterColumns.map((option, id) => <option key={ id }>{ option }</option>);
    return columnGenerated;
  };

  // Função que cria as <options> de comparison
  const comparisonGenerate = () => {
    const comparision = ['maior que',
      'menor que', 'igual a'];
    const comparisionMap = comparision
      .map((option, id) => <option key={ id }>{ option }</option>);
    return comparisionMap;
  };

  // Função executada nos onChanges:
  const handleChange = (event) => {
    // mudando o estado do meu selected:
    setSelected({
      ...selected,
      [event.target.id]: event.target.value });
  };

  // Função que de acordo com a option escolhida faz algo diferente:
  const conditionComparison = () => {
    if (selected.comparison === 'maior que') {
      const biggerThan = data
        .filter((item) => Number(item[selected.column]) > Number(selected.value));
      return biggerThan;
    }
    if (selected.comparison === 'menor que') {
      const lowerThan = data
        .filter((item) => Number(item[selected.column]) < Number(selected.value));
      return lowerThan;
    }
    const equalTo = data
      .filter((item) => Number(item[selected.column]) === Number(selected.value));
    return equalTo;
  };

  // Função usada no click do botão que envia para o estado global nossa condição
  const onChangeComparison = () => {
    setData(conditionComparison);
    noRepeat();
  };

  return (

    <div>
      <label htmlFor="name">
        <select
          id="column"
          onChange={ handleChange }
          data-testid="column-filter"
          name="name"
        >
          { columnGenerate() }
        </select>
      </label>

      <label htmlFor="name">
        <select
          id="comparison"
          onChange={ handleChange }
          data-testid="comparison-filter"
          name="name"
        >
          { comparisonGenerate() }
        </select>

        <input
          onChange={ handleChange }
          type="number"
          id="value"
          data-testid="value-filter"
        />

        <button
          onClick={ onChangeComparison }
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </label>
    </div>
  );
}

export default Select;
