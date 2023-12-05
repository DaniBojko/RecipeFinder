import { FilterObject } from "../components/FilterDrawer";

export const filterBuilder = (filterData: FilterObject) => {
  let diets = filterData.diets.map((data) => data.value).join("|");
  let intolerances = filterData.intolerances.map((d) => d.value).join(",");
  let ingredients = filterData.ingredients.map((d) => d.value).join(",");
  let mealType = filterData.mealType?.value || "";
  let calorieRange = `&minCalories=${filterData.calorieRange.rangeStart}&maxCalories=${filterData.calorieRange.rangeEnd}`;
  let carbRange = `&minCarbs=${filterData.carbRange.rangeStart}&maxCarbs=${filterData.carbRange.rangeEnd}`;
  let proteinRange = `&minProtein=${filterData.proteinRange.rangeStart}&maxProtein=${filterData.proteinRange.rangeEnd}`;
  let fatRange = `&minFat=${filterData.fatRange.rangeStart}&maxFat=${filterData.fatRange.rangeEnd}`;

  if (diets) diets = `&diet=${diets}`;
  if (intolerances) intolerances = `&intolerances=${intolerances}`;
  if (ingredients)
    ingredients = `&sort=min-missing-ingredients&includeIngredients=${ingredients}`;
  if (mealType) mealType = `&type=${mealType}`;

  const retValue =
    ingredients +
    diets +
    intolerances +
    mealType +
    calorieRange +
    carbRange +
    proteinRange +
    fatRange;

  //console.log("RETVAL: " + retValue);

  return retValue;
};
