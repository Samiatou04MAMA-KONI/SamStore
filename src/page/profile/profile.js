import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/contextAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useFavorites } from '../../context/contextFavoris';
import { useCart } from '../../context/contextPanier';
import './profile.css';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  const { nombreArticles } = useCart();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  // Rediriger si non connecté
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Charger les données utilisateur
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    // Sauvegarder les modifications
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    window.location.reload(); // Recharger pour mettre à jour le contexte
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Header avec bannière */}
      <section className="profile-hero">
        <div className="container">
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : '👤'}
              </div>
            </div>
            <div className="profile-info">
              <h1>Bonjour, {user.firstName || 'Utilisateur'} !</h1>
              <p>Bienvenue sur votre espace personnel SamStore</p>
              <div className="profile-stats">
                <div className="stat">
                  <strong>{favorites.length}</strong>
                  <span>Favoris</span>
                </div>
                <div className="stat">
                  <strong>0</strong>
                  <span>Commandes</span>
                </div>
                <div className="stat">
                  <strong>Membre</strong>
                  <span>Depuis 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container profile-layout">
        {/* Navigation latérale */}
        <aside className="profile-sidebar">
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Vue d'ensemble</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <span className="nav-icon">👤</span>
              <span className="nav-text">Informations personnelles</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="nav-icon">📦</span>
              <span className="nav-text">Mes commandes</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <span className="nav-icon">❤️</span>
              <span className="nav-text">Mes favoris</span>
              <span className="nav-badge">{favorites.length}</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <span className="nav-icon">🔒</span>
              <span className="nav-text">Sécurité</span>
            </button>

            <hr className="nav-divider" />

            <button className="nav-item nav-item--logout" onClick={handleLogout}>
              <span className="nav-icon">🚪</span>
              <span className="nav-text">Déconnexion</span>
            </button>
          </nav>
        </aside>

        {/* Contenu principal */}
        <main className="profile-content">
          {/* Vue d'ensemble */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>Vue d'ensemble du compte</h2>
              
              <div className="overview-grid">
                <div className="overview-card">
                  <div className="card-icon">📦</div>
                  <h3>Mes commandes</h3>
                  <p>Suivez vos commandes en cours et consultez votre historique</p>
                  <Link to="/commande" className="card-link">
                    Voir mes commandes →
                  </Link>
                </div>

                <div className="overview-card">
                  <div className="card-icon">❤️</div>
                  <h3>Mes favoris</h3>
                  <p>{favorites.length} produit(s) sauvegardé(s)</p>
                  <Link to="/favoris" className="card-link">
                    Voir mes favoris →
                  </Link>
                </div>

                <div className="overview-card">
                  <div className="card-icon">🛒</div>
                  <h3>Panier actuel</h3>
                  <p>{nombreArticles} article(s) dans le panier</p>
                  <Link to="/cart" className="card-link">
                    Voir mon panier →
                  </Link>
                </div>

                <div className="overview-card">
                  <div className="card-icon">🔔</div>
                  <h3>Notifications</h3>
                  <p>Restez informé des promotions et nouveautés</p>
                  <button className="card-link">
                    Gérer les notifications →
                  </button>
                </div>
              </div>

              {/* Recommandations rapides */}
              <div className="quick-actions-section">
                <h3>Actions rapides</h3>
                <div className="quick-actions">
                  <button 
                    className="quick-action-btn"
                    onClick={() => navigate('/nouveaute')}
                  >
                    🌟 Voir les nouveautés
                  </button>
                  <button 
                    className="quick-action-btn"
                    onClick={() => navigate('/deals')}
                  >
                    🔥 Offres du jour
                  </button>
                  <button 
                    className="quick-action-btn"
                    onClick={() => navigate('/service')}
                  >
                    💁 Besoin d'aide ?
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Informations personnelles */}
          {activeTab === 'personal' && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>Informations personnelles</h2>
                <button 
                  className={`edit-btn ${isEditing ? 'save' : 'edit'}`}
                  onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                >
                  {isEditing ? '💾 Sauvegarder' : '✏️ Modifier'}
                </button>
              </div>

              <div className="personal-info-form">
                <div className="form-row">
                  <div className="input-group">
                    <label>Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="input-group">
                    <label>Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="input-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="+229 XX XX XX XX"
                  />
                </div>

                <div className="input-group">
                  <label>Adresse</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Votre adresse complète..."
                    rows="3"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                    ❌ Annuler
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Commandes */}
          {activeTab === 'orders' && (
            <div className="tab-content">
              <h2>Mes commandes</h2>
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>Aucune commande pour le moment</h3>
                <p>Vous n'avez pas encore passé de commande sur SamStore</p>
                <button 
                  className="browse-btn"
                  onClick={() => navigate('/')}
                >
                  🛍️ Découvrir nos produits
                </button>
              </div>
            </div>
          )}

          {/* Favoris */}
          {activeTab === 'favorites' && (
            <div className="tab-content">
              <h2>Mes produits favoris</h2>
              {favorites.length > 0 ? (
                <div className="favorites-preview">
                  <p>Vous avez {favorites.length} produit(s) dans vos favoris</p>
                  <Link to="/favoris" className="view-all-btn">
                    👀 Voir tous mes favoris
                  </Link>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">❤️</div>
                  <h3>Aucun favori pour le moment</h3>
                  <p>Ajoutez des produits à vos favoris pour les retrouver facilement</p>
                  <button 
                    className="browse-btn"
                    onClick={() => navigate('/')}
                  >
                    🛍️ Parcourir les produits
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Sécurité */}
          {activeTab === 'security' && (
            <div className="tab-content">
              <h2>Sécurité du compte</h2>
              
              <div className="security-settings">
                <div className="security-item">
                  <div className="security-info">
                    <h3>Mot de passe</h3>
                    <p>Défini le {new Date(user.createdAt || Date.now()).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <button className="security-action">
                    🔄 Modifier
                  </button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <h3>Connexions actives</h3>
                    <p>1 appareil connecté</p>
                  </div>
                  <button className="security-action">
                    👁️ Voir
                  </button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <h3>Notifications de sécurité</h3>
                    <p>Activées pour les connexions suspectes</p>
                  </div>
                  <button className="security-action">
                    ⚙️ Paramétrer
                  </button>
                </div>
              </div>

              <div className="security-tips">
                <h4>💡 Conseils de sécurité</h4>
                <ul>
                  <li>Utilisez un mot de passe unique et fort</li>
                  <li>Ne partagez jamais vos identifiants</li>
                  <li>Déconnectez-vous sur les appareils partagés</li>
                  <li>Vérifiez régulièrement votre activité</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;