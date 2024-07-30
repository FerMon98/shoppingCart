/*Puedes modificar el código facilitado si ello te ayuda con el ejercicio,
pero deberás justificarlo.
Recuerda la importancia comentar con detalle el código. Lo importante es el cálculo, no los estilos css*/

////////////////////////////////////////////////  Working on the Modal box and creating objects  ///////////////////////////////////////////////////////

// Select the DOM elements
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector('.btn-close');
const productsSection = document.querySelector('.productes');
let selectedProduct = productsSection.querySelectorAll('div');
let breakDownProducts = [];


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


//Variable for product quantity
let quantity;


// Hide the modal box and get quantity from input and add item to cart

function addItem() {
    quantity = parseFloat(document.querySelector("#quantity").value);

    //Verify if numbers are negative
    if(quantity <= 0)
    {
        alert("No seas trampillas que los negativos no valen!!!")
        return;
    }
    //Show button when products are added
    else if (quantity > 0) {
        printPurchase.classList.remove('hidden');
    }
    
    //Get selected element and add it or update it
    var currentItem = productsArray.find(product => product.item == selectedItem);
    var isAddedInBreakDown = breakDownProducts.some(product => product.item == selectedItem);

    //Add when is new product
    if(breakDownProducts.length == 0 || !isAddedInBreakDown)
        breakDownProducts.push({item: selectedItem, quantity:quantity, precio:currentItem.precio, unidad:currentItem.unidad })

    //Reset the breakdown html
    let rows = carritoList.querySelectorAll("tr:not(#totalRow):not(#printPurchase)");
    rows.forEach(row => row.remove());

    //Build new breakdown html
    breakDownProducts.forEach(object => {
        //Update quantity only in selectedItem
        if (isAddedInBreakDown && object.item === selectedItem) {
            object.quantity += quantity;
        }

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
            cartPrice.textContent = `${object.precio}/${object.unidad}`;
            cartQuantity.textContent = `${object.quantity} ${object.unidad}`;
            cartTotal.textContent = `${(object.precio * object.quantity).toFixed(2)} €`;
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
    });

        
    //Reset Quantity value to null to refresh input
    document.querySelector("#quantity").value = null;
    hideModal();

}  

function deleteProduct(ev) {
    //delete product from breakdown and update total
    const clickedItem = ev.currentTarget;
    const cartRow = clickedItem.parentElement.parentElement;
    let productToDelete = cartRow.firstElementChild.textContent;
    breakDownProducts = breakDownProducts.filter(product => product.item !== productToDelete);
    cartRow.remove();
    if(breakDownProducts.length === 0)
    {
        printPurchase.classList.add('hidden');
    }
    updateTotal();
}

//Variable for saving final total
let preuFinal;

// Function to update the total price
function updateTotal() {
    let total = breakDownProducts.reduce((acc, product) => acc + (product.precio * product.quantity), 0);
    preuFinal = document.querySelector('.preuFinal').textContent = `${total.toFixed(2)}€`;
}
 
/////////////////////////////////////////////  Working on the final purchase Modal  //////////////////////////////////////////////////////////

// Get the modal
const finalPurchaseModal = document.getElementById("finalPurchaseModal");
const modalCloseBtn = document.querySelector(".close");
const finalPurchaseBtn = document.getElementById("finalPurchase");


// Get all <tr> elements within the table body, excluding the totalRow
//let rows = carritoList.querySelectorAll("tr:not(#totalRow):not(#printPurchase)");

// Function to update the modal with cart items
function updateModalCart() {
    breakDownProducts

    // Getting the ul section and clearing its contents
    const modalCartItems = document.querySelector("#modalCartItems");
    modalCartItems.innerHTML = ''; // Clear previous items

    // Looping through the cartItems array and adding each item to the modal's list
    breakDownProducts.forEach(item => {
        const li = document.createElement('li');
        var total = item.quantity * item.precio;
        li.textContent = `${item.item}    -    x${item.quantity} ${item.unidad}  .......    ${total} €`;
        modalCartItems.appendChild(li);
    });

    
    document.querySelector('#finalprice').textContent = preuFinal;
}

// Function to show the modal and save the selected product
function showFinal() {
    updateModalCart(); // Update the modal with the current cart items
    finalPurchaseModal.style.display = 'flex';
}

// Function to hide the modal
function hideFinal() {
    finalPurchaseModal.style.display = 'none';
}

// Event listeners for opening and closing the modal

finalPurchaseBtn.addEventListener('click', showFinal);
modalCloseBtn.addEventListener('click', hideFinal);