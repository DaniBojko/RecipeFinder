import { FilterObject } from "../components/FilterDrawer";

export const requestLinkBuilder = (filterData: FilterObject) => {
  let diets = filterData.diets.map((data) => data.value).join("|");
  let intolerances = filterData.intolerances
    .map((data) => data.value)
    .join(",");
  let ingredients = filterData.ingredients.map((data) => data.value).join(",+");

  if (diets) diets = `&diet=${diets}`;
  if (intolerances) intolerances = `&intolerances=${intolerances}`;
  if (ingredients)
    ingredients = `&sort=min-missing-ingredients&includeIngredients=${ingredients}`;
  return diets + intolerances + ingredients;
};
