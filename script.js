const categoriesContainer = document.getElementById("categoriesContainer");
const cardContainer = document.getElementById("cardContainer");

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("cardContainer").classList.add("hidden");
  } else {
    document.getElementById("cardContainer").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

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
    <li id="${cat.id}" class=" p-2  font-medium hover:text-white hover:bg-[#15803d] rounded-[4px] list-none cursor-pointer">
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

const loadCardAll = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showCardByCategory(data.plants);
    });
};

const loadCardByCategory = (cardId) => {
  manageSpinner(true);
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
    cardContainer.innerHTML += `
                <div class=" card bg-white rounded-xl shadow-sm">
              
                <img
                  src="${plant.image}"
                  alt=""
                  class=" rounded-xl h-[200px] object-cover px-4 pt-4 "
                />
              
              <div class=" p-4 card-body">
                <h2 class="font-bold text-xl">${plant.name}</h2>
                <p class="py-5">
                  ${plant.description}
                </p>
                <div class="flex justify-between items-center py-5">
                  <span class=" px-3 py-1 rounded-full text-[#15803d] font-medium text-sm  bg-[#dcfce7]">
                  ${plant.category}
                  </span>
                  <p class="font-semibold">৳<span>${plant.price}</span></p>
                </div>

                <div class="card-actions justify-end mt-auto">
                <button class="btn text-white w-full rounded-full bg-[#15803d] ">
                  Add to Cart
                </button>
                </div>
              </div>
            </div>
    `;
  });
  manageSpinner(false);
};

loadCategory();
loadCardAll();
