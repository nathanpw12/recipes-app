import React, { useEffect, useState } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import { getLocalStorage } from '../helpers/localStorage';
import styles from './DoneRecipes.module.css';

const DoneRecipes = () => {
  const [noFilter, setNoFilter] = useState([]);
  const [foodFilter, setFoodFilter] = useState([]);
  const [drinkFilter, setDrinkFilter] = useState([]);
  const [whichFilterToApply, setWhichFilterToApply] = useState('noFilter');

  useEffect(() => {
    const data = getLocalStorage('doneRecipes');
    setNoFilter(data);
  }, []);

  const handleNoFilter = () => {
    setFoodFilter(noFilter);
    setWhichFilterToApply('noFilter');
  };

  const handleFoodFilter = () => {
    const filteredByFood = noFilter.filter(({ type }) => type === 'food');
    setFoodFilter(filteredByFood);
    setWhichFilterToApply('food');
  };

  const handleDrinkFilter = () => {
    const filteredByDrink = noFilter.filter(({ type }) => type === 'drink');
    setDrinkFilter(filteredByDrink);
    setWhichFilterToApply('drink');
  };

  const dataToRender = {
    noFilter,
    food: foodFilter,
    drink: drinkFilter,
  };

  const renderDoneRecipeCards = () => (
    dataToRender[whichFilterToApply]?.map((recipeData, index) => (
      <DoneRecipeCard
        data={ recipeData }
        key={ recipeData.id }
        index={ index }
      />
    )));

  return (
    <div>
      <Header />
      <div className={ styles.field }>
        <button
          className={ `${styles.button__filter} ${styles.button__hover__filter}` }
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleNoFilter() }
        >
          All
        </button>
        <button
          className={ `${styles.button__filter} ${styles.button__hover__filter}` }
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleFoodFilter() }
        >
          Food
        </button>
        <button
          className={ `${styles.button__filter} ${styles.button__hover__filter}` }
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleDrinkFilter() }
        >
          Drink
        </button>
      </div>
      <main>
        { renderDoneRecipeCards() }
      </main>
    </div>
  );
};

export default DoneRecipes;
