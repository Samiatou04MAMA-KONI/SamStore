import React, { useState } from 'react';
import './commande.css';

const SuivreCommande = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderInfo, setOrderInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Données simulées de commandes
  const sampleOrders = {
    'CMD-2024-001': {
      id: 'CMD-2024-001',
      date: '2024-01-15',
      status: 'livrée',
      products: [
        { name: 'iPhone 15 Pro', quantity: 1, price: 899900 },
        { name: 'Coque Protection', quantity: 1, price: 15000 }
      ],
      total: 914900,
      customer: { name: 'Jean Dupont', phone: '+229 97 00 00 01' },
      delivery: {
        address: 'Cotonou, Akpakpa',
        method: 'Livraison express',
        estimated: '2024-01-16',
        delivered: '2024-01-16 14:30'
      },
      timeline: [
        { step: 'commandé', date: '2024-01-15 10:30', status: 'completed' },
        { step: 'confirmé', date: '2024-01-15 10:35', status: 'completed' },
        { step: 'préparation', date: '2024-01-15 14:00', status: 'completed' },
        { step: 'expédié', date: '2024-01-16 08:15', status: 'completed' },
        { step: 'livré', date: '2024-01-16 14:30', status: 'completed' }
      ]
    },
    'CMD-2024-002': {
      id: 'CMD-2024-002',
      date: '2024-01-20',
      status: 'en_cours',
      products: [
        { name: 'Robe Soirée Élégante', quantity: 1, price: 45000 },
        { name: 'Sac à Main Cuir', quantity: 1, price: 35000 }
      ],
      total: 80000,
      customer: { name: 'Marie Kossi', phone: '+229 97 00 00 02' },
      delivery: {
        address: 'Porto-Novo, Centre Ville',
        method: 'Livraison standard',
        estimated: '2024-01-22'
      },
      timeline: [
        { step: 'commandé', date: '2024-01-20 09:15', status: 'completed' },
        { step: 'confirmé', date: '2024-01-20 09:20', status: 'completed' },
        { step: 'préparation', date: '2024-01-20 11:00', status: 'completed' },
        { step: 'expédié', date: '2024-01-21 10:30', status: 'completed' },
        { step: 'en_livraison', date: '2024-01-22 08:00', status: 'current' },
        { step: 'livré', date: null, status: 'pending' }
      ]
    },
    'CMD-2024-003': {
      id: 'CMD-2024-003',
      date: '2024-01-25',
      status: 'confirmée',
      products: [
        { name: 'Parfum Luxury Edition', quantity: 1, price: 55000 }
      ],
      total: 55000,
      customer: { name: 'Paul Sossa', phone: '+229 97 00 00 03' },
      delivery: {
        address: 'Abomey-Calavi, Université',
        method: 'Livraison standard',
        estimated: '2024-01-27'
      },
      timeline: [
        { step: 'commandé', date: '2024-01-25 16:45', status: 'completed' },
        { step: 'confirmé', date: '2024-01-25 16:50', status: 'current' },
        { step: 'préparation', date: null, status: 'pending' },
        { step: 'expédié', date: null, status: 'pending' },
        { step: 'livré', date: null, status: 'pending' }
      ]
    }
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    
    // Simulation de recherche
    setTimeout(() => {
      const order = sampleOrders[orderNumber.toUpperCase()];
      setOrderInfo(order || null);
      setLoading(false);
    }, 1500);
  };

  const getStatusInfo = (status) => {
    const statuses = {
      'confirmée': { text: 'Confirmée', color: '#f59e0b', icon: '✅' },
      'en_cours': { text: 'En cours de livraison', color: '#3b82f6', icon: '🚚' },
      'livrée': { text: 'Livrée', color: '#10b981', icon: '🎉' },
      'annulée': { text: 'Annulée', color: '#ef4444', icon: '❌' }
    };
    return statuses[status] || { text: 'Inconnu', color: '#6b7280', icon: '❓' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="suivre-commande-page">
      {/* Hero Section */}
      <section className="tracking-hero">
        <div className="container">
          <h1>📦 Suivre ma Commande</h1>
          <p>Suivez l'état de votre commande en temps réel</p>
        </div>
      </section>

      {/* Formulaire de recherche */}
      <section className="tracking-search">
        <div className="container">
          <div className="search-card">
            <h2>🔍 Entrez votre numéro de commande</h2>
            <p className="search-subtitle">
              Le numéro de commande se trouve dans votre email de confirmation (ex: CMD-2024-001)
            </p>
            
            <form onSubmit={handleTrackOrder} className="search-form">
              <div className="input-group">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Ex: CMD-2024-001"
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? '🔍 Recherche...' : 'Suivre la commande'}
                </button>
              </div>
            </form>

            {/* Exemples de numéros de test */}
            <div className="test-numbers">
              <p><strong>Numéros de test :</strong></p>
              <div className="test-list">
                <span onClick={() => setOrderNumber('CMD-2024-001')}>CMD-2024-001</span>
                <span onClick={() => setOrderNumber('CMD-2024-002')}>CMD-2024-002</span>
                <span onClick={() => setOrderNumber('CMD-2024-003')}>CMD-2024-003</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats de suivi */}
      {orderInfo && (
        <section className="tracking-results">
          <div className="container">
            {/* En-tête de la commande */}
            <div className="order-header">
              <div className="order-id">
                <h2>Commande {orderInfo.id}</h2>
                <span className="order-date">Passée le {formatDate(orderInfo.date)}</span>
              </div>
              <div className="order-status">
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusInfo(orderInfo.status).color }}
                >
                  {getStatusInfo(orderInfo.status).icon} {getStatusInfo(orderInfo.status).text}
                </div>
              </div>
            </div>

            {/* Timeline de la commande */}
            <div className="timeline-section">
              <h3>📋 État d'avancement</h3>
              <div className="timeline">
                {orderInfo.timeline.map((step, index) => (
                  <div key={step.step} className={`timeline-step ${step.status}`}>
                    <div className="timeline-marker">
                      {step.status === 'completed' && '✅'}
                      {step.status === 'current' && '⏳'}
                      {step.status === 'pending' && '⭕'}
                    </div>
                    <div className="timeline-content">
                      <h4>{step.step.charAt(0).toUpperCase() + step.step.slice(1)}</h4>
                      <p>{formatDate(step.date)}</p>
                    </div>
                    {index < orderInfo.timeline.length - 1 && (
                      <div className="timeline-connector"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Détails de la commande */}
            <div className="order-details-grid">
              {/* Produits commandés */}
              <div className="detail-card">
                <h3>🛍️ Produits commandés</h3>
                <div className="products-list">
                  {orderInfo.products.map((product, index) => (
                    <div key={index} className="product-item">
                      <span className="product-name">{product.name}</span>
                      <span className="product-quantity">x{product.quantity}</span>
                      <span className="product-price">{product.price.toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <strong>Total : {orderInfo.total.toLocaleString()} FCFA</strong>
                </div>
              </div>

              {/* Livraison */}
              <div className="detail-card">
                <h3>🚚 Livraison</h3>
                <div className="delivery-info">
                  <p><strong>Adresse :</strong> {orderInfo.delivery.address}</p>
                  <p><strong>Méthode :</strong> {orderInfo.delivery.method}</p>
                  <p><strong>Estimation :</strong> {formatDate(orderInfo.delivery.estimated)}</p>
                  {orderInfo.delivery.delivered && (
                    <p><strong>Livrée le :</strong> {formatDate(orderInfo.delivery.delivered)}</p>
                  )}
                </div>
              </div>

              {/* Informations client */}
              <div className="detail-card">
                <h3>👤 Informations client</h3>
                <div className="customer-info">
                  <p><strong>Nom :</strong> {orderInfo.customer.name}</p>
                  <p><strong>Téléphone :</strong> {orderInfo.customer.phone}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="detail-card">
                <h3>⚡ Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn primary">📄 Télécharger la facture</button>
                  <button className="action-btn secondary">🔄 Demander un retour</button>
                  <button className="action-btn secondary">📞 Contacter le support</button>
                </div>
              </div>
            </div>

            {/* Support rapide */}
            <div className="quick-support">
              <h3>❓ Besoin d'aide ?</h3>
              <p>Notre équipe support est disponible pour vous aider</p>
              <div className="support-buttons">
                <button className="support-btn">📞 Appeler le support</button>
                <button 
                  className="support-btn"
                  onClick={() => window.dispatchEvent(new CustomEvent('openChatbot'))}
                >
                  💬 Chat en direct
                </button>
                <button className="support-btn">📧 Envoyer un email</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Message si commande non trouvée */}
      {orderInfo === null && orderNumber && (
        <section className="not-found">
          <div className="container">
            <div className="not-found-card">
              <h3>❌ Commande non trouvée</h3>
              <p>Le numéro de commande <strong>"{orderNumber}"</strong> n'a pas été trouvé.</p>
              <div className="suggestions">
                <p><strong>Vérifiez :</strong></p>
                <ul>
                  <li>Le numéro de commande dans votre email de confirmation</li>
                  <li>Que la commande a bien été passée</li>
                  <li>Vos spams pour l'email de confirmation</li>
                </ul>
              </div>
              <button 
                className="contact-support"
                onClick={() => window.dispatchEvent(new CustomEvent('openChatbot'))}
              >
                💬 Contacter le support
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SuivreCommande;