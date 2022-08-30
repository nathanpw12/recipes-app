import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import requestSearchFilterThunk from '../redux/actions/requestSearchFilterDataThunk';
import styles from './Header.module.css';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [radioSelected, setRadioSelected] = useState('name');
  const dispatch = useDispatch();
  const { location: { pathname } } = useHistory();

  const validateFirstLetter = () => {
    if (radioSelected === 'first-letter' && search.length !== 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleClick = () => {
    validateFirstLetter();
    dispatch(requestSearchFilterThunk(radioSelected, search, pathname));
  };

  return (
    <div className="searchBar">
      <input
        className={ `${styles.input} ${styles.input__placeholder}` }
        data-testid="search-input"
        value={ search }
        placeholder="lookup for recipe"
        name="inputName"
        onChange={ ({ target: { value } }) => setSearch(value) }
        type="text"
      />
      <div className="radiosSearchBar">

        <label htmlFor="ingredient">
          <input
            className={ styles.checkbox }
            name="test"
            value="ingredient"
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ ({ target: { value } }) => setRadioSelected(value) }
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            className={ styles.checkbox }
            value="name"
            name="test"
            type="radio"
            id="name"
            data-testid="name-search-radio"
            onChange={ ({ target: { value } }) => setRadioSelected(value) }
          />
          Name
        </label>

        <label htmlFor="firstLetter">
          <input
            className={ styles.checkbox }
            value="first-letter"
            name="test"
            type="radio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ ({ target: { value } }) => setRadioSelected(value) }
          />
          First letter
        </label>
      </div>
      <div className={ styles.main }>
        <button
          className={ `${styles.button} ${styles.button__hover}` }
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleClick() }
        >
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
