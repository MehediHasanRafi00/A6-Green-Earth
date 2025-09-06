const categoriesContainer = document.getElementById("categoriesContainer");
const cardContainer = document.getElementById("cardContainer");

loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
    });
};

showCategory = (category) => {
  category.forEach((cat) => {
    categoriesContainer.innerHTML += `
    <li id="${cat.id}" class=" p-2  font-medium hover:text-white hover:bg-[#15803d] rounded-[4px] list-none ">
    ${cat.category_name}
    </li>
    `;
  });

  categoriesContainer.addEventListener("click", (e) => {
    const liCategory = document.querySelectorAll("li");
    liCategory.forEach((li) => {
      li.classList.remove("bg-[#15803d]", "text-white");
    });

    if (e.target.localName === "li") {
      e.target.classList.add("bg-[#15803d]", "text-white");
      loadCardByCategory(e.target.id);
    }
  });
};

const loadCardByCategory = (cardId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${cardId}`)
    .then((res) => res.json())
    .then((data) => {
      showCardByCategory(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCardByCategory = (plants) => {
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    console.log(plant);
    cardContainer.innerHTML += `
                <div class="card bg-base-100 shadow-sm">
              <figure class="px-4 pt-4">
                <img
                  src="${plant.image}"
                  alt=""
                  class="rounded-xl  "
                />
              </figure>
              <div class="card-body p-4">
                <h2 class="card-title">${plant.name}</h2>
                <p>
                  ${plant.description}
                </p>
                <div class="flex justify-between items-center">
                  <span class=" px-3 py-1 rounded-full text-[#15803d] font-medium  bg-[#dcfce7]">
                  ${plant.category}
                  </span>
                  <p class="font-semibold">৳<span>${plant.price}</span></p>
                </div>

                <button class="btn text-white rounded-full bg-[#15803d]">
                  Add to Cart
                </button>
              </div>
            </div>
    `;
  });
};

loadCategory();
