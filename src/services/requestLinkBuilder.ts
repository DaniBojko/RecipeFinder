import { FilterObject } from "../components/FilterDrawer";

export const requestLinkBuilder = (filterData: FilterObject) => {
  let diets = filterData.diets.map((data) => data.value).join("|");
  let intolerances = filterData.intolerances.map((d) => d.value).join(",");
  let ingredients = filterData.ingredients.map((d) => d.value).join(",+");
  let calorieRange = `&minCalories=${filterData.calorieRange.rangeStart}&maxCalories=${filterData.calorieRange.rangeEnd}`;

  if (diets) diets = `&diet=${diets}`;
  if (intolerances) intolerances = `&intolerances=${intolerances}`;
  if (ingredients)
    ingredients = `&sort=min-missing-ingredients&includeIngredients=${ingredients}`;

  const retValue = diets + intolerances + ingredients + calorieRange;
  console.log(retValue);

  return retValue;
};
