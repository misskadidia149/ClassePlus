import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student' // Nouveau champ pour le rôle
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email) => {
    // Validation pour email académique (exemple: @ista-mali.com)
    return email.endsWith('@ista-mali.com');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation supplémentaire
    if (!validateEmail(formData.email)) {
      setError('Veuillez utiliser votre email académique (@ista-mali.com)');
      setIsLoading(false);
      return;
    }

    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      const { data } = await axios.post(url, formData);
      
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.user.role); // Stocker le rôle
      
      // Redirection basée sur le rôle
      if (data.user.role === 'teacher') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <h1>Classroom ISTA</h1>
          <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Prénom et Nom"
                />
              </div>

              <div className="form-group">
                <label>Rôle</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="role-select"
                >
                  <option value="student">Étudiant</option>
                  <option value="teacher">Enseignant</option>
                </select>
              </div>
            </>
          )}
          
          <div className="form-group">
            <label>Email académique</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="exemple@ista-mali.com"
            />
          </div>
          
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Minimum 6 caractères"
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner">Chargement...</span>
            ) : (
              isLogin ? 'Se connecter' : 'S\'inscrire'
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {isLogin ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}
            <span 
              className="toggle-link"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? 'Créer un compte' : 'Se connecter'}
            </span>
          </p>
          
          {isLogin && (
            <p className="forgot-password">
              <span onClick={() => navigate('/forgot-password')}>
                Mot de passe oublié ?
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;