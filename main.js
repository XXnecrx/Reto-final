let carrito = []; // El carrito está vacío al principio

// Función para agregar un producto al carrito
function agregarAlCarrito(producto, precio) {
    // Verificamos si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.producto === producto);

    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no está en el carrito, lo agregamos con cantidad 1
        carrito.push({
            producto: producto,
            precio: precio,
            cantidad: 1
        });
    }

    // Actualizamos el carrito después de agregar el producto
    actualizarCarrito();
}

// Función para actualizar el carrito y mostrarlo en pantalla
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    listaCarrito.innerHTML = ''; // Limpiamos el carrito antes de actualizarlo
    let total = 0;

    carrito.forEach(item => {
        // Creamos un elemento de lista para cada producto en el carrito
        const li = document.createElement("li");
        li.classList.add("list-group-item");

        // Agregamos el nombre, cantidad y precio total de cada producto
        li.innerHTML = `${item.producto} (x${item.cantidad}) - $${(item.precio * item.cantidad).toFixed(2)}`;

        // Añadimos el item a la lista
        listaCarrito.appendChild(li);

        // Sumamos el precio total de cada producto
        total += item.precio * item.cantidad;
    });

    // Mostramos el total del carrito
    totalCarrito.innerHTML = `Total: $${total.toFixed(2)}`;

    // Si hay productos en el carrito, mostramos el botón de "Finalizar compra"
    if (carrito.length > 0) {
        document.getElementById("finalizar-compra-btn").style.display = "block";
    } else {
        document.getElementById("finalizar-compra-btn").style.display = "none";
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(producto) {
    carrito = carrito.filter(item => item.producto !== producto);
    actualizarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
    const resumenCompra = document.getElementById("resumen-compra");
    const listaResumen = document.getElementById("lista-resumen");
    const totalResumen = document.getElementById("total-resumen");

    // Limpiamos el resumen de compra
    listaResumen.innerHTML = '';
    let totalResumenCompra = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `${item.producto} (x${item.cantidad}) - $${(item.precio * item.cantidad).toFixed(2)}`;
        listaResumen.appendChild(li);

        totalResumenCompra += item.precio * item.cantidad;
    });

    // Mostramos el total del resumen
    totalResumen.innerHTML = `Total a pagar: $${totalResumenCompra.toFixed(2)}`;

    // Ocultamos la vista del carrito y mostramos el resumen de compra
    document.getElementById("lista-carrito").style.display = "none";
    document.getElementById("total-carrito").style.display = "none";
    document.getElementById("finalizar-compra-btn").style.display = "none";
    resumenCompra.style.display = "block";

    // Mostramos el mensaje de "Compra finalizada"
    const mensajeCompra = document.getElementById("mensaje-compra");
    mensajeCompra.style.display = "block"; // Mostramos el mensaje de compra finalizada
}

// Función de pago (simulada)
function realizarPago() {
    alert("Pago realizado con éxito. ¡Gracias por tu compra!");
    
    // Limpiamos el carrito después del pago
    carrito = [];
    actualizarCarrito();

    // Volver a mostrar el carrito vacío y las opciones de compra
    document.getElementById("resumen-compra").style.display = "none";
    document.getElementById("lista-carrito").style.display = "block";
    document.getElementById("total-carrito").style.display = "block";
    
    // Ocultamos el mensaje de "Compra finalizada"
    const mensajeCompra = document.getElementById("mensaje-compra");
    mensajeCompra.style.display = "none";
}
