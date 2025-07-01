import React, { useState } from "react";

// Lista de productos disponibles
const productosDisponibles = [
  { id: 1, nombre: "Manzana", precio: 10 },
  { id: 2, nombre: "Pan", precio: 15 },
  { id: 3, nombre: "Leche", precio: 20 },
];

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Eliminar producto
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // Calcular total
  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
          🛒 XochiCarrito
        </h1>

        {/* Productos disponibles */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            Productos disponibles
          </h2>
          <ul className="space-y-4">
            {productosDisponibles.map((producto) => (
              <li
                key={producto.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-lg text-gray-800">
                  {producto.nombre} - ${producto.precio}
                </span>
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
                >
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Carrito */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            Tu carrito
          </h2>
          {carrito.length === 0 ? (
            <p className="text-gray-500">El carrito está vacío.</p>
          ) : (
            <ul className="space-y-4">
              {carrito.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="text-gray-800">
                    {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
                  </span>
                  <button
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 text-right text-xl font-bold text-purple-700">
            Total: ${total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
