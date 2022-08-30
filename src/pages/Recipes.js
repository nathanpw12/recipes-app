import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { showAllCategoriesAction } from '../redux/actions/recipeDataActions';
import requestCategoriesThunk from '../redux/actions/requestCategoriesThunk';
import requestFilteredCategoriesThunk from '../redux/actions/requestFilteredRecipesThunk';
import requestRecipesThunk from '../redux/actions/requestRecipesThunk';
import styles from './Recipes.module.css';

const Recipes = () => {
  const { location: { pathname }, push } = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const rest = -1;
    const query = pathname.slice(1, rest);
    dispatch(requestRecipesThunk(query));
    dispatch(requestCategoriesThunk(query));
  }, []);

  const storedRecipeData = useSelector((state) => state.recipeDataReducer.recipeData);

  const toRender = useSelector((state) => state
    .recipeDataReducer.toRender);

  const {
    recipeData, recipeCategoryData, recipeSearchData,
  } = useSelector((state) => state
    .recipeDataReducer);

  const handleSingleElement = (data) => {
    const hasOnlyOneElement = data.length === 1;
    const isRenderingSearchBar = toRender === 'recipeSearchData';
    const id = data[0].idDrink || data[0].idMeal;
    if (hasOnlyOneElement && isRenderingSearchBar) { push(`${pathname}/${id}`); }
  };

  const renderCases = {
    recipeData,
    recipeCategoryData,
    recipeSearchData,
  };

  const renderCards = () => {
    const rawDataToRender = renderCases[toRender];
    const decideFoodOrDrinkData = rawDataToRender.meals || rawDataToRender.drinks;
    const numberOfRecipes = 12;

    handleSingleElement(decideFoodOrDrinkData);

    const processedDataToRender = decideFoodOrDrinkData.slice(0, numberOfRecipes);
    return processedDataToRender.map((
      { strMealThumb, strDrinkThumb, strMeal, strDrink, idMeal, idDrink },
      index,
    ) => {
      const data = {
        thumbnail: strMealThumb ?? strDrinkThumb,
        recipeName: strMeal ?? strDrink,
        id: idMeal ?? idDrink,
        index,
        pathname,
      };
      return (
        <RecipeCard
          recipeData={ data }
          key={ data.index }
        />
      );
    });
  };

  const storedRecipeCategoryData = useSelector((state) => state
    .recipeDataReducer.recipeCategoryData);

  const handleCategoryClick = (category, type) => {
    const isCategoryTrue = !!storedRecipeCategoryData?.meals?.length
    || !!storedRecipeCategoryData?.drinks?.length;
    if (isCategoryTrue) { dispatch(showAllCategoriesAction()); }
    if (!isCategoryTrue) { dispatch(requestFilteredCategoriesThunk(category, type)); }
  };

  const storedRecipeCategories = useSelector((state) => state
    .recipeDataReducer.recipeCategories);

  const renderCategoryButtons = () => {
    const categories = storedRecipeCategories.meals || storedRecipeCategories.drinks;
    const maxCategories = 5;

    const firstFiveCategories = categories.slice(0, maxCategories);
    const response = firstFiveCategories.map((categoryObj) => {
      const type = storedRecipeCategories.meals ? 'food' : 'drink';
      const { strCategory: category } = categoryObj;
      return (
        <button
          className={ `${styles.button} ${styles.button__hover}` }
          data-testid={ `${category}-category-filter` }
          key={ category }
          type="button"
          onClick={ () => handleCategoryClick(type, category) }
        >
          {category}
        </button>
      );
    });
    return response;
  };

  const handleShowAllCategories = () => {
    dispatch(showAllCategoriesAction());
  };

  const isRecipeFetchDone = !!storedRecipeData?.meals?.length
    || !!storedRecipeData?.drinks?.length;
  const isCategoryFetchDone = !!storedRecipeCategories?.meals?.length
    || !!storedRecipeCategories?.drinks?.length;
  const areAllFetchesDone = isRecipeFetchDone && isCategoryFetchDone;

  return (
    <div>
      <Header />
      {
        areAllFetchesDone && (
          <div className={ styles.main }>
            <section className={ styles.section }>
              <button
                type="button"
                className={ `${styles.button} ${styles.button__hover}` }
                data-testid="All-category-filter"
                onClick={ () => handleShowAllCategories() }
              >
                All
              </button>
              { renderCategoryButtons() }
            </section>

            <main className={ styles.card__container }>
              { renderCards() }
            </main>
          </div>
        )
      }
      <Footer />
    </div>
  );
};

export default Recipes;
