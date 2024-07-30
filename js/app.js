/*Puedes modificar el código facilitado si ello te ayuda con el ejercicio,
pero deberás justificarlo.
Recuerda la importancia comentar con detalle el código. Lo importante es el cálculo, no los estilos css*/

////////////////////////////////////////////////  Working on the Modal box and creating objects  ///////////////////////////////////////////////////////

// Select the DOM elements
const overlay = document.querySelector(".overlay");
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


/////////////////////////////////////////////  Working on the shopping Cart  //////////////////////////////////////////////////////////

// Get DOM element for the product List and final Purchase button.
let carritoList = document.querySelector("#productsLi tbody");
let printPurchase = document.querySelector("#printPurchase");
let carritoListElements = carritoList.querySelectorAll("tr");


//Variable for product quantity
let quantity;


// Hide the modal box and get quantity from input and add item to cart

function addItem() {
    quantity = parseFloat(document.querySelector("#quantity").value);


    if (quantity > 0) {
        printPurchase.classList.remove('hidden');
    };

    productsArray.forEach(object => {
        if (object.item === selectedItem) {
            object.quantity += quantity;

            // Creating table row and each cell, 
            let cartRow = document.createElement("tr");
            let cartItem = document.createElement("td");
            let cartPrice = document.createElement("td");
            let cartQuantity = document.createElement("td");
            let cartTotal = document.createElement("td");
            let deleteItemIcon = document.createElement("td");

            // Add trash icon to delete button
            let trashIcon = document.createElement("i");
            trashIcon.classList.add("fa", "fa-trash");
            trashIcon.addEventListener("click", deleteProduct);

            //Adding details from the selected product to each cell
            
            cartItem.textContent = `${object.item}`;
            cartPrice.textContent = `${object.precio}`;
            cartQuantity.textContent = `${quantity}${object.unidad} `;
            cartTotal.textContent = `${(object.precio * quantity).toFixed(2)} €`;
            deleteItemIcon.appendChild(trashIcon);

            //Showing that data in the assigned row
            cartRow.appendChild(cartItem);
            cartRow.appendChild(cartPrice);
            cartRow.appendChild(cartQuantity);
            cartRow.appendChild(cartTotal);
            cartRow.appendChild(deleteItemIcon);

            //Setting the attributes
            cartRow.setAttribute("id", `${selectedItem}`);
            cartPrice.setAttribute("class", "itemPrice");
            cartQuantity.setAttribute("class", "itemQuantity");

            // Append the new row before the total row
            carritoList.insertBefore(cartRow, document.querySelector("#totalRow"));

            // Update total price
            updateTotal();

            // Update the cart items object
        }
    });

    console.log(cartItems)
        
    //Reset Quantity value to null to refresh input
    document.querySelector("#quantity").value = null;
    hideModal();

}
        


function deleteProduct(ev) {
    const clickedItem = ev.currentTarget;
    const cartRow = clickedItem.parentElement.parentElement;
    cartRow.remove();
    updateTotal();
}

// Function to update the total price
function updateTotal() {
    let total = productsArray.reduce((acc, product) => acc + (product.precio * product.quantity), 0);
    document.querySelector('#preuFinal').textContent = `${total.toFixed(2)}€`;
}
 
/////////////////////////////////////////////  Working on the final purchase Modal  //////////////////////////////////////////////////////////

// Get the modal
const finalPurchaseModal = document.getElementById("finalPurchaseModal");
const modalCloseBtn = document.querySelector(".close");
const finalPurchaseBtn = document.getElementById("finalPurchase");


// Array to track cart items
let cartItems = [];

function cartItemsArray (carritoList) {

    for (let i = 0; i < carritoList.rows.length; i++) {
        let row = carritoList.rows[i];
        let item = row.cells[0].textContent;
        let price = parseFloat(row.cells[1].textContent);
        let quantity = parseInt(row.cells[2].textContent.split(' ')[0]);
        let total = price * quantity;

        // Create an object for each item with its properties
        let selectedProductObject = {
            item: item,
            price: price,
            quantity: quantity,
            total: total
        };

        cartItems.push(selectedProductObject); // Add item to the cartItems object
    }
  
}

cartItemsArray();

// Function to update the modal with cart items
function updateModalCart() {


    const modalCartItems = document.querySelector("#modalCartItems");
    modalCartItems.innerHTML = ''; // Clear previous items

    Object.values(cartItems).forEach(item => {
       modalCartItems.innerHTML = `<li>${item.item} -  x${item.quantity} ..... ${item.total}`;
    });
}

// Function to show the modal and save the selected product
function showFinal() {
    finalPurchaseModal.style.display = 'flex';
}

// Function to hide the modal
function hideFinal() {
    finalPurchaseModal.style.display = 'none';
}

// Event listeners for opening and closing the modal

finalPurchaseBtn.addEventListener('click', showFinal);
modalCloseBtn.addEventListener('click', hideFinal);