import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import styles from '../components/ProgressList.module.css';
import {
  disableButton,
  funcFinishRecipe, getLists, heartFunction, lineText
} from '../helpers/recipesFunctions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import styles from './RecipesInProgress.module.css';

// http://localhost:3000/drinks/11007/in-progress
// http://localhost:3000/foods/52772/in-progress

const RecipeInProgress = (props) => {
  const { match } = props;
  const recipeId = match.params.id;
  const [food, setFood] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const history = useHistory();
  const [share, setShare] = useState(false);
  const [heart, setHeart] = useState(false);
  const [disable, setDisable] = useState(true);
  const [check, setCheck] = useState([]);
  const [finalizada, setFinalizada] = useState([]);

  const getFood = async (endpoint, getlists, setfood, type) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    getlists(data[type][0], 'strIngredient', setIngredients);
    getlists(data[type][0], 'strMeasure', setMeasure);
    setfood(data[type][0]);
  };

  const mealsEnd = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const drinkEnd = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

  const getRecipeDet = () => (match.path.includes('food') ? (
    getFood(mealsEnd, getLists, setFood, 'meals')) : (
    getFood(drinkEnd, getLists, setFood, 'drinks')));

  const funcFinishRecipee = () => {
    funcFinishRecipe(recipeId, food);
    history.push('/done-recipes');
  };

  const lineTexttt = async (param2) => {
    lineText(recipeId, param2, check, setCheck);
    disableButton(recipeId, setDisable, ingredients);
  };

  const checkIn = (p) => check.includes(`${recipeId}-${ingredients.indexOf(p)}-checkbox`);

  const generateList = ingredients.map((e) => (
    <div key={ ingredients.indexOf(e) }>
      <label
        htmlFor={ `${ingredients.indexOf(e)}-checkbox` }
      >
        <div className={ styles.ingredients }>
          <p
            data-testid={ `${ingredients.indexOf(e)}-ingredient-step` }
            id={ `${ingredients.indexOf(e)}-ingredient-step` }
            className={ checkIn(e) ? styles.line : styles.none }
          >

            <input
              type="checkbox"
              onClick={ () => lineTexttt(`${ingredients.indexOf(e)}-checkbox`) }
              id={ `${ingredients.indexOf(e)}-checkbox` }
              checked={ check
                .includes(`${recipeId}-${ingredients.indexOf(e)}-checkbox`) }
            />

            {measure[ingredients.indexOf(e)] ? `${e} - ${measure[ingredients.indexOf(e)]}`
              : e}
          </p>
        </div>
      </label>
    </div>
  ));

  useEffect(() => {
    getRecipeDet();
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      setCheck(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
    if (JSON.parse(localStorage.getItem('doneRecipes')) !== null) {
      const vv = [];
      JSON.parse(localStorage.getItem('doneRecipes')).forEach((e) => vv.push(e.id));
      setFinalizada(vv);
    }
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null) {
      const aa = [];
      JSON.parse(localStorage.getItem('favoriteRecipes')).map((e) => aa.push(e.id));
      if (aa.includes(recipeId)) {
        setHeart(true);
      }
    }
  }, []);

  const btnFinish = (
    <button
      className={ styles.container }
      type="submit"
      data-testid="finish-recipe-btn"
      onClick={ funcFinishRecipee }
      disabled={ disable }
    >
      Finish Recipe
    </button>
  );

  const btnShare = (
    <button
      className={ `${styles.button} ${styles.button__hover}` }
      type="button"
      data-testid="share-btn"
      src={ shareIcon }
      onClick={ () => {
        clipboardCopy(`${'http://localhost:3000'}${match.url}`);
        setShare(true);
      } }
    >
      <img src={ shareIcon } alt="share-icon" />
    </button>
  );

  const thumb = (param1, param2) => (
    <img
      className={ styles.image }
      src={ food[param1] }
      alt={ food[param2] }
      data-testid="recipe-photo"
      width="500px"
      height="300px"
    />
  );

  const btnFavorite = (param) => (
    <button
      className={ `${styles.button} ${styles.button__hover}` }
      type="button"
      data-testid="favorite-btn"
      src={ heart ? blackHeartIcon : whiteHeartIcon }
      onClick={ () => heartFunction(param, recipeId, food, setHeart) }
    >
      <img
        src={ heart ? blackHeartIcon : whiteHeartIcon }
        alt="heart-icon"
      />
    </button>
  );

  return (
    <div>
      {
        match.path.includes('food') && food ? (
          <div>
            <main className={ styles.main }>
              <div className={ styles.card }>
                {thumb('strMealThumb', 'strMeal')}
                <p data-testid="recipe-title">{food.strMeal}</p>
                <p data-testid="recipe-category">{food.strCategory}</p>
              </div>

              <div
                className={ styles.share__fav__div }
              >
                {btnShare}
                {btnFavorite('food')}
              </div>
              {share ? (<p>Link copied!</p>) : ('')}

              <h3 className={ styles.titles }>Ingredients</h3>
              {generateList}
              <h3 className={ styles.titles }>Instructions</h3>
              <p
                className={ styles.instructions }
                data-testid="instructions"
              >
                {food.strInstructions}

              </p>
              {!finalizada.includes(recipeId) && btnFinish}
            </main>
          </div>
        ) : (
          <div>
            <main className={ styles.main }>
              <div className={ styles.card }>
                {thumb('strDrinkThumb', 'strDrink')}
                <p data-testid="recipe-title">{food.strDrink}</p>
                <p data-testid="recipe-category">{food.strAlcoholic}</p>
              </div>
              <div className={ styles.share__fav__div }>
                {btnShare}
                {btnFavorite('drink')}
              </div>
              {share ? (<p>Link copied!</p>) : ('')}
              <h3 className={ styles.titles }>Ingredients</h3>
              {generateList}
              <h3 className={ styles.titles }>Instructions</h3>
              <p
                className={ styles.instructions }
                data-testid="instructions"
              >
                {food.strInstructions}

              </p>
              {!finalizada.includes(recipeId) && btnFinish}
            </main>
          </div>
        )
      }
    </div>
  );
};

// RecipeInProgress.propTypes = {
//   match: PropTypes.shape({
//     url: PropTypes.string,
//     params: PropTypes.shape({
//       id: PropTypes.string,
//     }),
//     path: PropTypes.shape({
//       includes: PropTypes.func,
//     }),
//   }).isRequired,
// };

export default RecipeInProgress;
