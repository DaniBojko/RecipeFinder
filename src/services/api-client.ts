import axios from "axios";

export const MAX_RESULT_COUNT = 3;
const BASE_PARAMS = `/complexSearch?number=${MAX_RESULT_COUNT}`;

export default axios.create({
  baseURL: `https://api.spoonacular.com/recipes${BASE_PARAMS}`,
  params: {
    apiKey: "ea62de69b40f4fe98ac8a5cb27b3b2c2",
  },
});
