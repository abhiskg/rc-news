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
    liElement.classList.add("cursor-pointer", "hover:text-primary");
    categoryContainer.append(liElement);
  });
};

// Category wise News handler section
const loadNews = async (category_id = "01") => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${category_id}`
    );
    const { data } = await res.json();
    showNews(data);
    totalNewsInCategory(data.length, data[0].category_id);
  } catch (error) {
    console.log(error);
  }
};
loadNews();

const showNews = (data) => {
  const newsContainer = document.querySelector("#news-container");
  newsContainer.textContent = "";

  let publishDate;
  data.forEach((news) => {
    if (news.author.published_date !== null) {
      const publishDateTime = news.author.published_date;
      publishDate = publishDateTime.split(" ");
    }

    const divElement = document.createElement("div");
    divElement.innerHTML = `
    <div class="card md:card-side bg-base-100 shadow-xl mt-10">
          <figure>
            <img
              class="h-72 w-full md:w-auto"
              src="${news.thumbnail_url}"
              alt="Album"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${news.title}</h2>
            <p class="text-gray-400">
              ${
                news.details.length < 300
                  ? news.details
                  : news.details.slice(0, 290) + "..."
              }
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img src="${news.author.img}" />
                  </div>
                </div>
                <div>
                  <div class="font-medium">${
                    news.author.name ? news.author.name : "No Name"
                  }</div>
                  <div class="text-sm text-gray-500">${
                    news.author.published_date !== null
                      ? publishDate[0]
                      : "No Date"
                  }</div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <img src="icons/eye.svg" alt="" />
                <span class="font-medium">${
                  news.total_view ? news.total_view : "No View"
                }</span>
              </div>

              <div class="sm:flex items-center gap-1 hidden">
                <img src="icons/starfill.svg" alt="" />
                <img src="icons/starfill.svg" alt="" />
                <img src="icons/starfill.svg" alt="" />
                <img src="icons/star.svg" alt="" />
                <img src="icons/star.svg" alt="" />
              </div>
              <div class:"cursor-pointer">
                <img src="icons/arrow.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
    `;
    newsContainer.append(divElement);
  });
};

// Total News in each category
const totalNewsInCategory = (length, id) => {
  const totalNews = document.querySelector("#total-news");
  const newsCategory = document.querySelector("#news-category");

  totalNews.innerText = length.toString();

  if (id === "01") {
    newsCategory.innerText = "Breaking News";
  } else if (id === "02") {
    newsCategory.innerText = "Regular News";
  } else if (id === "03") {
    newsCategory.innerText = "International News";
  } else if (id === "04") {
    newsCategory.innerText = "Sports";
  } else if (id === "05") {
    newsCategory.innerText = "Entertainment";
  } else if (id === "06") {
    newsCategory.innerText = "Culture";
  } else if (id === "07") {
    newsCategory.innerText = "Arts";
  } else {
    newsCategory.innerText = "All News";
  }
  console.log(length, id);
};
