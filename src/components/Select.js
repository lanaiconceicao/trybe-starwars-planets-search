import React, { useState, useContext } from 'react';
import MyContext from '../context/MyContext';

function Select() {
  const { data, setData } = useContext(MyContext);
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: '>',
    value: 0,
  });

  // Função que cria as options de column
  const columnGenerate = () => {
    const columns = ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const columnMap = columns.map((option, id) => <option key={ id }>{ option }</option>);
    return columnMap;
  };

  // Função que cria as options de comparison
  const comparisonGenerate = () => {
    const comparision = ['maior que',
      'menor que', 'igual a'];
    const comparisionMap = comparision
      .map((option, id) => <option key={ id }>{ option }</option>);
    return comparisionMap;
  };

  // Função executada no click do select:
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
      console.log(biggerThan);
      return biggerThan;
    }
    if (selected.comparison === 'menor que') {
      const lowerThan = data
        .filter((item) => Number(item[selected.column]) < Number(selected.value));
      console.log(lowerThan);
      return lowerThan;
    }
    const equalTo = data
      .filter((item) => Number(item[selected.column]) === Number(selected.value));
    console.log(equalTo);
    return equalTo;
  };

  const onChangeComparison = () => {
    setData(conditionComparison);
  };

  return (

    <div>
      console.log(data)
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
