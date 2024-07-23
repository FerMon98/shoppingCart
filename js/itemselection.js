/*Puedes modificar el código facilitado si ello te ayuda con el ejercicio,
pero deberás justificarlo.
Recuerda la importancia comentar con detalle el código. Lo importante es el cálculo, no los estilos css*/

///////////////////////////////////////////////////////////////////////////////////////////////////////

//Genera un Prompt para que el usuario pueda indicar cantidades por producto elegido

const showPrompt = () => prompt('Introduce la cantidad del producto deseado:');

//Obtener el DOM de La sección dónde están los productos y sus divs.

const productsSection = document.querySelector('.productes');
let selectedProduct = productsSection.querySelectorAll('div');

// Crear un array para almacenar los objetos de productos
let productsArray = [];

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
    
    // Añadir evento click al producto para mostrar un prompt para ingresar la cantidad
    product.addEventListener('click', showPrompt);

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
    };

    productsArray.push(selectedProductObject);
    
    return {selectedProductObject}

});

console.log(productsArray);
