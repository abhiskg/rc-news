// Category Section
const loadCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/news/categories"
    );
    const { data } = await res.json();
    console.log(data.news_category);
  } catch (error) {
    console.log(error);
  }
};
loadCategory();
