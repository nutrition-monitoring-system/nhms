const useState = require("react");

const fetchNutrition = () => {
  const nutrition = [];
  const url = `https://world.openfoodfacts.org/api/v2/search?fields=product_name,nutriments&countries_tags_en='uk'&page=2&page_size=100`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const products = data.products;
      let i = 0;
      for (let product of products) {
        nutrition.push({
          name: product.product_name,
          energy_100g: product.nutriments["energy_100g"],
          fat_100g: product.nutriments["fat_100g"],
          saturated_fat_100g: product.nutriments["saturated_fat_100g"],
          carbohydrates_100g: product.nutriments["carbohydrates_100g"],
          sugars_100g: product.nutriments["sugars_100g"],
          proteins_100g: product.nutriments["proteins_100g"],
          salts_100g: product.nutriments["salt_100g"],
        });
      }
      console.log(nutrition);
    });
};

fetchNutrition();
