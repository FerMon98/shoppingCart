/*Puedes modificar el código facilitado si ello te ayuda con el ejercicio,
pero deberás justificarlo.
Recuerda la importancia comentar con detalle el código. Lo importante es el cálculo, no los estilos css*/

////////////////////////////////////////////////  Working on the Modal box and creating objects  ///////////////////////////////////////////////////////

// Select the DOM elements
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.btn-close');
const productsSection = document.querySelector('.productes');
let selectedProduct = productsSection.querySelectorAll('div');

let selectedItem =null;
// Crear un array para almacenar los objetos de productos
let productsArray = [];

// Function to show the modal and save the selected product
function showModal(ev) {
    const clickedDiv = ev.currentTarget;
    const imgElement = clickedDiv.querySelector('img');
    selectedItem = imgElement.getAttribute('alt');
    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';
}

// Function to hide the modal
function hideModal() {
    overlay.classList.add('hidden');
    overlay.style.display = 'none';
}

// Event listeners for opening and closing the modal
selectedProduct.forEach(div => {
    div.addEventListener('click', showModal);
});



btnClose.addEventListener('click', hideModal);



// Obtener el valor de alt en cada imagen de cada producto y almacenarla en un array
selectedProduct.forEach(product => {
    let selectedProductImg = product.querySelector('img');
    let getPelement = product.querySelector('p').textContent;
    let priceStr = getPelement.match(/\d+([,.]\d+)?/);
    let price = null;
    let altText = '';
    let unidad = '';

    //Obtener el valor de alt en cada imagen de cada producto

    if (selectedProductImg) {
      altText = selectedProductImg.getAttribute('alt');
      console.log(altText);
    }

    // Convert price to number
    if (priceStr) {
        price = parseFloat(priceStr[0].replace(',', '.'));
    }

    // Asignar el tipo de unidad a los productos
    if (getPelement.includes("kg")) {
        unidad = 'kg';
    } else if (getPelement.includes("ud")) {
        unidad = 'ud';
    }

    // Crear un objeto con los datos de cada producto
    let selectedProductObject = {
        item: altText,
        precio: price,
        unidad: unidad,
        quantity: 0
    };

    productsArray.push(selectedProductObject);
    
    return {selectedProductObject}

});

console.log(productsArray);
console.log(productsArray[0].item)


/////////////////////////////////////////////  Working on the shopping Cart  //////////////////////////////////////////////////////////

// Get DOM element for the product List and each section
let productSection = document.querySelector('#productoLi');
let precioSection = document.querySelector('#precioLi');
let cantidadSection = document.querySelector('cantidadLi');
let totalSection = document.querySelector('#totalLi');
let carritoUl = document.querySelector("#carritoList");

//Variable for product quantity
let quantity;

// Hide the modal box and get quantity from input and add item to cart

function addItem(event) {
    quantity = parseFloat(document.querySelector("#quantity").value);
    if (quantity > 0 && selectedItem) {
        productsArray.forEach(object => {
            if (object.item === selectedItem) {
                object.quantity += quantity;

                // Add item to cart list
                let cartItem = document.createElement("li");

                cartItem.textContent = 
                `${object.item} 
                - ${object.precio}€/kg 
                - ${quantity}${object.unidad} 
                - ${object.precio * quantity}€`;

                productSection.appendChild(cartItem);

                // Update total price
                updateTotal();
            }
        });

        hideModal();
    }
}

// Function to update the total price
function updateTotal() {
    let total = productsArray.reduce((acc, product) => acc + (product.precio * product.quantity), 0);
    document.querySelector('#preuFinal').textContent = `${total.toFixed(2)}€`;
}