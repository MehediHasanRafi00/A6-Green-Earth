const categoriesContainer = document.getElementById("categoriesContainer");
const cardContainer = document.getElementById("cardContainer");
const cartContainer = document.getElementById("cartContainer");
const cardModal = document.getElementById("card-modal");
const modalContainer = document.getElementById("modalContainer");

let carts = [];

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
    <li id="${cat.id}" class=" p-2  font-medium hover:text-white hover:bg-[#15803d] rounded-[4px]  cursor-pointer">
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
               
            <div id="${
              plant.id
            }" class="shadow-sm p-4 space-y-5 bg-white rounded-xl">
        <img class="rounded-xl h-[200px] w-[400px] object-cover" src="${
          plant.image
        }" alt="">
        <h1 class="font-bold cursor-pointer">${plant.name}</h1>
        <p>${plant.description.slice(0, 85)}...</p>
        <div class="flex justify-between">
            <span class="py-1 px-3 rounded-full text-sm bg-[#dcfce7] text-[#15803d]">${
              plant.category
            }</span>
            <p class="font-medium ">৳<span>${plant.price}</span></p>
        </div>
        <button class="btn rounded-full bg-[#15803d] w-full text-white">Add to Cart</button>
    </div>

            
    `;
  });
  manageSpinner(false);
};

cardContainer.addEventListener("click", (e) => {
  console.log();
  if (e.target.innerText === "Add to Cart") {
    handleCart(e);
  }
  if (e.target.localName === "h1") {
    loadCardInfo(e);
  }
});

const handleCart = (e) => {
  const plantName = e.target.parentNode.children[1].innerText;
  // alert(`${plantName} has been added to the cart`);
  const plantPrice =
    e.target.parentNode.children[3].children[1].children[0].innerText;
  const plantId = e.target.parentNode.id;

  const totalPrice = document.getElementById("totalPrice").innerText;

  const currentTotal = Number(plantPrice) + Number(totalPrice);

  document.getElementById("totalPrice").innerText = currentTotal;

  carts.push({
    name: plantName,
    price: plantPrice,
    id: plantId,
    uId: Date.now(),
  });
  showCart(carts);
};
const loadCardInfo = (e) => {
  const plantId = e.target.parentNode.id;
  fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
    .then((res) => res.json())
    .then((data) => {
      handleModal(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleModal = (plants) => {
  cardModal.showModal();

  console.log(plants);
  modalContainer.innerHTML = `
   <div class="space-y-3">
          <h2 class="font-extrabold text-xl">${plants.name}</h2>
          <img class="rounded-xl h-[400px] w-[500px] object-cover" src="${plants.image}" alt="">
          <p><span class="font-bold">Category:</span> ${plants.category} </p>
          <p><Span class="font-bold">price:</Span> ৳${plants.price}</p>
          <p><span class="font-semibold">Description:</span> ${plants.description}</p>
        </div>
 `;
};

const showCart = (carts) => {
  cartContainer.innerHTML = "";
  carts.forEach((cart) => {
    cartContainer.innerHTML += `
                  <div class="flex justify-between items-center bg-[#f0fdf4] rounded-lg p-2">
                <div>
                  <h4 class="font-semibold">${cart.name}</h4>
                  <p class="text-[#879395]">৳<span>${cart.price}</span> x 1</p>
                </div>
                <button onclick="handleDeleteCart('${cart.uId}')" class="text-[#879395] hover:text-white hover:bg-[#15803cc2] btn btn-ghost"><span>
                  <i class="fa-solid fa-x"></i>
                </span></button>
              </div>
    `;
  });
};

const handleDeleteCart = (cartId) => {
  const deleteCard = carts.filter((cart) => cart.uId == cartId);

  const deletePrice = deleteCard[0].price;
  const totalPrice = document.getElementById("totalPrice").innerText;

  const currentTotal = Number(totalPrice) - Number(deletePrice);

  document.getElementById("totalPrice").innerText = currentTotal;

  const filteredCarts = carts.filter((cart) => cart.uId !== Number(cartId));

  carts = filteredCarts;

  showCart(carts);
};

loadCategory();
loadCardAll();
