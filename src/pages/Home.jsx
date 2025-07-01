import React from 'react';

const Home = () => {
  return (
    <div className="p-6 space-y-10 max-w-4xl mx-auto text-gray-800">
      
      {/* Sección de Bienvenida */}
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-4">¡Bienvenido a Xochimarket!</h1>
        <p className="text-lg">
          Xochimarket es tu nuevo espacio para comprar y vender productos de manera sencilla, rápida y segura.
          Descubre lo mejor del mercado local desde la comodidad de tu casa.
        </p>
      </section>

      {/* Sección de Valores */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Nuestros Valores</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Confianza:</strong> Nos comprometemos con transacciones seguras y transparentes.</li>
          <li><strong>Comunidad:</strong> Promovemos el comercio justo y el apoyo entre usuarios locales.</li>
          <li><strong>Calidad:</strong> Ofrecemos productos verificados y de alto valor.</li>
        </ul>
      </section>

      {/* Sección de Contacto */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Contáctanos</h2>
        <p className="mb-2">¿Tienes preguntas o sugerencias? ¡Nos encantará escucharte!</p>
        <ul className="space-y-1">
          <li>📧 Email: contacto@xochimarket.com</li>
          <li>📱 WhatsApp: +52 123 456 7890</li>
          <li>🌐 Facebook: <a href="https://facebook.com/xochimarket" className="text-blue-600 hover:underline" target="_blank">facebook.com/xochimarket</a></li>
        </ul>
      </section>

    </div>
  );
};

export default Home;
