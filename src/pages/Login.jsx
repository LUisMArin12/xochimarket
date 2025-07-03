import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de autenticación
    const { username, password } = formData;
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '50px auto', textAlign: 'center' }}>
      <h2>Login</h2>
      {isLoggedIn ? (
        <div>
          <p>¡Bienvenido, {formData.username}!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <button type="submit">Iniciar sesión</button>
          </div>
          {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default Login;
