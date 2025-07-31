let input = document.querySelector('input');
let box = document.querySelector('.box');
let select = document.querySelector('select');  
let img = document.querySelector('.img');
let allProducts = []; 

img.style.display = 'block'
fetch('https://dummyjson.com/products')
  .then((response) => response.json())
  .then((data) => {
    allProducts = data.products;
    renderProducts(allProducts);
  });

function renderProducts(products) {
  box.innerHTML = ''; 
  products.forEach((item) => {
    box.innerHTML += `
      <div class="item">
        <img src="${item.images[0]}" alt="${item.title}">
        <h3>${item.category}</h3>
        <p>${item.description}</p>
        <span>${item.price}</span>
        <h3>${item.discountPercentage}</h3>
      </div>
    `;
  });
  img.style.display = 'none'; // Hide the image after products are loaded
}

input.addEventListener('input', () => {
  img.style.display = 'block';
  let filteredData = allProducts.filter((item) =>
    item.title.toLowerCase().includes(input.value.toLowerCase())
  );
    img.style.display = 'none';
  renderProducts(filteredData); 
});

select.addEventListener('change', () => {
    img.style.display = 'block';
  let sorted = [...allProducts];
  if (select.value === 'name') {
    sorted.sort((a, b) => a.title.localeCompare(b.title)); // to‘g‘ri maydon: title
  } else if (select.value === 'name2') {
    sorted.sort((b, a) => b.title.localeCompare(a.title));
  } else if (select.value === 'price') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (select.value === 'price2') {
    sorted.sort((b, a) => b.price - a.price);
  }
    img.style.display = 'none';
  renderProducts(sorted);
});
