import PropTypes from 'prop-types';
import React from 'react';
// import PropTypes from 'prop-types';
import style from '../pages/RecipeDetails.module.css';

function RecommendationCard({ data, recipe, testidCard, testidTitle }) {
  return (
    <div>
      {recipe === 'drink' ? (
        <div className={ style.card__recomendation } data-testid={ testidCard }>
          <img
            src={ data.strDrinkThumb }
            alt={ data.strDrink }
            width="250px"
            height="150px"
          />
          <p data-testid={ testidTitle }>{data.strDrink}</p>
          <p>{data.strAlcoholic}</p>
        </div>
      ) : (
        <div className={ style.card__recomendation } data-testid={ testidCard }>
          <img
            src={ data.strMealThumb }
            alt={ data.strMeal }
            width="250px"
            height="150px"
          />
          <p data-testid={ testidTitle }>{data.strMeal}</p>
          <p>{data.strCategory}</p>
        </div>
      )}
    </div>
  );
}

RecommendationCard.propTypes = {
  data: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  recipe: PropTypes.string.isRequired,
  testidCard: PropTypes.string.isRequired,
  testidTitle: PropTypes.string.isRequired,
};

export default RecommendationCard;
