export const getToken = () => {
  const data = localStorage.getItem('token');
  return data;
};

export const disableButton = (recipeid, setdisable, ingred) => {
  const conf = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const ll = conf.filter((e) => e.includes(recipeid));
  setdisable(ll.length !== ingred.length);
};

export const lineText = async (
  recipeid, param2, check, setcheck,
) => {
  if (check.includes(`${recipeid}-${param2}`)) {
    const yy = check.filter((e) => e !== `${recipeid}-${param2}`);
    setcheck(yy);
    localStorage.setItem('inProgressRecipes', JSON.stringify(yy));
  } else {
    const pp = [...check, `${recipeid}-${param2}`];
    setcheck(pp);
    localStorage.setItem('inProgressRecipes', JSON.stringify(pp));
  }
};

export const getLists = (param1, param2, param3) => {
  const max = 20;
  const ingredientsFF = [];
  const ingredientsList = [];
  for (let i = 1; i < max; i += 1) {
    const ingr = param1[`${param2}${i}`];
    if (ingr) {
      ingredientsFF.push(ingr);
    }
  }
  ingredientsFF.map((e) => (e !== '' ? (ingredientsList.push(e)) : ('')));
  param3(ingredientsList);
};

// export const getFood = async (endpoint, setfood, type) => {
//   const response = await fetch(endpoint);
//   const data = await response.json();
//   getLists(data[type][0], 'strIngredient', setIngredients);
//   getLists(data[type][0], 'strMeasure', setMeasure);
//   setfood(data[type][0]);
// };

export const funcFinishRecipe = (recipeid) => {
  const fazendo = JSON.parse(localStorage.getItem('doneRecipes'));
  if (fazendo !== null && !fazendo.includes(recipeid)) {
    fazendo.push(recipeid);
    localStorage.setItem('doneRecipes', JSON.stringify(fazendo));
  } else if (fazendo === null) {
    const dd = [recipeid];
    localStorage.setItem('doneRecipes', JSON.stringify(dd));
  }
};

// export const generateList = (ingred, recipeid, measu, linete) => ingred.map((e) => (
//   <div key={ ingred.indexOf(e) }>
//     <label htmlFor={ `${ingred.indexOf(e)}-checkbox` }>
//       <p
//         data-testid={ `${ingred.indexOf(e)}-ingredient-step` }
//         id={ `${ingred.indexOf(e)}-ingredient-step` }
//         className={ checkIn(e) ? styles.line : styles.none }
//       >
//         <input
//           type="checkbox"
//           onClick={ () => linete(`${ingred.indexOf(e)}-checkbox`) }
//           id={ `${ingred.indexOf(e)}-checkbox` }
//           checked={ check.includes(`${recipeid}-${ingred.indexOf(e)}-checkbox`) }
//           className={ styles.input }
//         />
//         {measu[ingredients.indexOf(e)] ? `${e} - ${measu[ingredients.indexOf(e)]}`
//           : e}
//       </p>
//     </label>
//   </div>
// ));

export const heartFunction = (param, recipeid, comida, setheart) => {
  const fv = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const zz = [{
    id: recipeid,
    type: param,
    nationality: comida.strArea,
    category: comida.strCategory,
    alcoholicOrNot: comida.strAlcoholic,
    name: comida.strMeal,
    image: comida.strMealThumb,
  }];
  if (fv === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(zz));
    setheart(true);
  } else if (fv !== null) {
    const aa = [];
    fv.map((e) => aa.push(e.id));
    if (aa.includes(recipeid)) {
      const lm = fv.filter((e) => e.id !== recipeid);
      localStorage.setItem('favoriteRecipes', JSON.stringify(lm));
      setheart(false);
    } else if (!aa.includes(recipeid)) {
      fv.push(zz[0]);
      localStorage.setItem('favoriteRecipes', JSON.stringify(fv));
      setheart(true);
    }
  }
};
