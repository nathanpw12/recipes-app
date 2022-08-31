import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import styles from '../pages/DoneRecipes.module.css';

function DoneRecipeCard({ data, index }) {
  const [isCopied, setIsCopied] = useState(false);
  const {
    id, type, nationality, category, alcoholicOrNot, name, image, doneDate, tags,
  } = data;

  const hrefToDetails = () => {
    const { origin } = window.location;
    return `${origin}/${type}s/${id}`;
  };

  const renderTags = () => {
    if (tags.length === 1) {
      return (
        <span
          data-testid={ `${index}-${tags}-horizontal-tag` }
        >
          {tags}
        </span>);
    }
    if (tags.length === 2) {
      return tags.map((tag) => (
        <span data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>{tag}</span>
      ));
    }
    const tagsToRender = tags.slice(0, 2);
    return tagsToRender.map((tag) => (
      <span data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>{tag}</span>
    ));
  };

  const handleCopyClick = () => {
    setIsCopied(true);
    const contentToCopy = hrefToDetails();
    clipboardCopy(contentToCopy);
  };

  // const topText = `${alcoholicOrNot || nationality} - ${category}`;

  return (
    <div className={ styles.main }>
      <div className={ styles.card }>
        <Link to={ `/${type}s/${id}` }>
          <img
            alt="foobar"
            src={ image }
            data-testid={ `${index}-horizontal-image` }
            className={ styles.image }
          />
        </Link>
        <div>
          <div>
            {/* <h5 data-testid={ `${index}-horizontal-top-text` }>
              { topText }
            </h5> */}

            <Link to={ `/${type}s/${id}` }>
              <h4 data-testid={ `${index}-horizontal-name` }>
                { name }
              </h4>
            </Link>
            { tags.length && renderTags() } 
            <h5 data-testid={ `${index}-horizontal-done-date` }>
              { `Done in: ${doneDate}` }
            </h5>
          </div>
        </div>
        <button
          className={ `${styles.button} $` }
          type="button"
          onClick={ () => handleCopyClick() }
        >
          <img
            alt="shareButton"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
      </div>
      { isCopied && <span>Link copied!</span> }
    </div>
  );
}

DoneRecipeCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
