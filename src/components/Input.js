import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { onChange } = props;
  return (
    <label htmlFor="name">
      <input
        type="text"
        name="name"
        id="name"
        data-testid="name-filter"
        onChange={ onChange }
      />
    </label>
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Input;
