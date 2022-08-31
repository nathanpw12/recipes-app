import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';

function RecipeCard({ recipeData: { index, thumbnail, recipeName, id, pathname } }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <Link
        className={ styles.container }
        to={ `${pathname}/${id}` }
        data-testid="card-link"
      >
        <img
          className={ styles['card-image'] }
          data-testid={ `${index}-card-img` }
          alt="foto"
          src={ thumbnail }
        />
        <span data-testid={ `${styles.text}` }>
          { recipeName }
        </span>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  recipeData: PropTypes.shape({
    index: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    recipeName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
