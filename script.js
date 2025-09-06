const categoriesContainer = document.getElementById("categoriesContainer");

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
    <li id="${cat.id}" class=" p-2  font-medium hover:text-white hover:bg-[#15803d] rounded-[4px] list-none">
    ${cat.category_name}
    </li>
    `;
  });
};

loadCategory();
