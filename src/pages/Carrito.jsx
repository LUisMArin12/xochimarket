import React, { useState } from "react";

// Lista de productos disponibles en la tienda (puedes modificar o cargar desde una API)
const productosDisponibles = [
  { id: 1, nombre: "Manzana", precio: 10 },
  { id: 2, nombre: "Pan", precio: 15 },
  { id: 3, nombre: "Leche", precio: 20 },
];

// Componente principal del carrito
const Carrito = () => {
  // Estado para almacenar los productos agregados al carrito
  const [carrito, setCarrito] = useState([]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    // Verifica si el producto ya existe en el carrito
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      // Si ya está, se incrementa la cantidad
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      // Si no está, se agrega al carrito con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Función para eliminar un producto completamente del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // Calcula el total de la compra sumando precio * cantidad por cada producto
  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Sección de productos disponibles */}
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <ul className="mb-6">
        {productosDisponibles.map((producto) => (
          <li
            key={producto.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {producto.nombre} - ${producto.precio}
            </span>
            <button
              onClick={() => agregarAlCarrito(producto)}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Agregar
            </button>
          </li>
        ))}
      </ul>

      {/* Sección del carrito */}
      <h2 className="text-xl font-semibold mb-2">Carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {item.nombre} x {item.cantidad} = $
                {item.precio * item.cantidad}
              </span>
              <button
                onClick={() => eliminarDelCarrito(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Total a pagar */}
      <div className="mt-4 font-bold">Total: ${total}</div>
    </div>
  );
};


export default Carrito;
