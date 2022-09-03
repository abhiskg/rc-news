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
    liElement.setAttribute(
      "onclick",
      `loadNews(['${category.category_id}','${category.category_name}'])`
    );
    liElement.classList.add(
      "cursor-pointer",
      "hover:text-primary",
      "font-medium"
    );
    categoryContainer.append(liElement);
  });
};

// Loading Section

const toggleSpinner = (isLoading) => {
  const loaderSection = document.querySelector("#loader-section");

  if (isLoading) {
    loaderSection.classList.remove("hidden");
  } else {
    loaderSection.classList.add("hidden");
  }
};

// Category wise News handler section
const loadNews = async (category) => {
  toggleSpinner(true);
  const category_id = category[0];
  const category_name = category[1];

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${category_id}`
    );
    const { data } = await res.json();

    showNews(data);

    totalNewsInCategory(data.length, category_name);
  } catch (error) {
    console.log(error);
    toggleSpinner(false);
  }
};
loadNews(["01", "Breaking News"]);

const showNews = (data) => {
  const newsContainer = document.querySelector("#news-container");
  newsContainer.textContent = "";

  // Sorting
  data = data.sort((a, b) => b.total_view - a.total_view);

  if (data.length < 1) {
    const divElement = document.createElement("div");
    const divClasses = [
      "flex",
      "justify-center",
      "items-center",
      "h-[30rem]",
      "text-xl",
      "font-semibold",
      "text-red-500",
    ];
    divElement.innerText = "No News Found";
    divElement.classList.add(...divClasses);
    newsContainer.append(divElement);
    toggleSpinner(false);
    return;
  }
  toggleSpinner(false);

  data.forEach((news) => {
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
                    news.author.name && news.author.name !== null
                      ? news.author.name
                      : "No Name Available"
                  }</div>
                  <div class="text-sm text-gray-500">${
                    news.author.published_date &&
                    news.author.published_date !== null
                      ? news.author.published_date.split(" ")[0]
                      : "No Date Available"
                  }</div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <img src="icons/eye.svg" alt="" />
                <span class="font-medium">${
                  news.total_view && news.total_view !== null
                    ? news.total_view
                    : "No View"
                }</span>
              </div>

              <div class="sm:flex items-center gap-1 hidden">
                <img src="icons/starfill.svg" alt="" />
                <img src="icons/starfill.svg" alt="" />
                <img src="icons/starfill.svg" alt="" />
                <img src="icons/star.svg" alt="" />
                <img src="icons/star.svg" alt="" />
              </div>
              <label for="my-modal" onclick="loadNewsDetails('${
                news._id
              }')" class="cursor-pointer modal-button hover:bg-[#EEEFFF] rounded-full p-1 animate-wiggle">
                <img src="icons/arrow.svg" alt="" />
              </label>
            </div>
          </div>
        </div>
    `;

    newsContainer.append(divElement);
  });
};

// Total News in each category
const totalNewsInCategory = (length = 0, category_name) => {
  const totalNews = document.querySelector("#total-news");
  const newsCategory = document.querySelector("#news-category");

  totalNews.innerText = length.toString();
  newsCategory.innerText = category_name;
};

// News Details in Modal Handler
const loadNewsDetails = async (news_id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${news_id}`
    );
    const { data } = await res.json();
    showNewsDetails(data[0]);
  } catch (error) {
    console.log(error);
  }
};

const showNewsDetails = (news) => {
  const modalContainer = document.querySelector("#modal-container");
  modalContainer.textContent = "";
  modalContainer.innerHTML = `
  <div
        class="card xl:w-7/12 md:w-9/12 w-11/12 bg-base-100 shadow-xl image-full"
      >
        <figure>
          <img
            class="w-full"
            src="${news.image_url}"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="font-semibold text-base md:text-xl">
          ${news.title}
          </h2>
          <div class="font-medium md:text-base text-sm">
            Author Name: <span>${
              news.author.name && news.author.name !== null
                ? news.author.name
                : "No Name Available"
            }</span>
          </div>
          <div class="font-medium md:text-base text-sm">
            Publish Date: <span>${
              news.author.published_date && news.author.published_date !== null
                ? news.author.published_date.split(" ")[0]
                : "No Date Available"
            }</span>
          </div>
          <div class="font-medium md:text-base text-sm">
            Total View: <span>${
              news.total_view && news.total_view !== null
                ? news.total_view
                : "No View"
            }</span>
          </div>
          <p class="text-gray-300 hidden md:block">
          ${
            news.details.length < 350
              ? news.details
              : news.details.slice(0, 320) + "..."
          }
          </p>

          <div class="modal-action">
            <label for="my-modal" class="btn btn-error">Close</label>
          </div>
        </div>
      </div>
  `;
};
