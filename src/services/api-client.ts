import axios from "axios";

export default axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  params: {
    apiKey: "ea62de69b40f4fe98ac8a5cb27b3b2c2",
  },
});
