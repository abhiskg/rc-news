// Category Section
const loadCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/news/categories"
    );
    const { data } = await res.json();

    showCategory(data.news_category);
  } catch (error) {
    console.log(error);
  }
};
loadCategory();

const showCategory = (categories) => {
  const categoryContainer = document.querySelector("#category-container");

  categories.forEach((category) => {
    const liElement = document.createElement("li");

    liElement.innerText = category.category_name;
    liElement.setAttribute("onclick", `loadNews('${category.category_id}')`);
    categoryContainer.append(liElement);
  });
};

// Category wise News handler section
const loadNews = async (category_id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${category_id}`
    );
    const { data } = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
