import React, { useState } from 'react';
import './service-client.css';

const ServiceClient = () => {
  const [activeSection, setActiveSection] = useState('contact');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    problemType: '',
    orderNumber: '',
    description: '',
    attachments: null
  });

  // TES VRAIES COORDONNÉES
  const contactInfo = {
    phone: '+2290159233517', // Format international sans espaces
    whatsapp: '+22958595425', // Même numéro pour WhatsApp
    email: 'mamakonisami@gmail.com',
    address: 'Cotonou, Bénin'
  };

  // Fonctions pour gérer les actions de contact
  const handleCall = () => {
    // Ouvre l'appel téléphonique
    window.open(`tel:${contactInfo.phone}`);
    
    // Tracking (optionnel)
    console.log('Appel initié vers le service client');
  };

  const openWhatsApp = () => {
    const message = "Bonjour SamStore, j'ai une question concernant vos produits/services.";
    const encodedMessage = encodeURIComponent(message);
    
    // Format WhatsApp : numéro sans le + pour l'URL
    const whatsappNumber = contactInfo.whatsapp.replace('+', '');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    console.log('WhatsApp ouvert pour le service client');
  };

  const sendEmail = () => {
    const subject = "Question SamStore - Service Client";
    const body = `Bonjour SamStore,

Je vous contacte via votre site internet concernant :

[Votre question ou problème ici]

Cordialement,
[Votre nom]`;
  
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    // Utiliser window.open() au lieu de window.location.href
    window.open(`mailto:mamakonisami@gmail.com?subject=${encodedSubject}&body=${encodedBody}`);
  };

  const openMap = () => {
    const encodedAddress = encodeURIComponent(`SamStore ${contactInfo.address}`);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent('openChatbot'));
    console.log('Chatbot ouvert');
  };

  // Gestion du formulaire de réclamation
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulation d'envoi - tu peux remplacer par un appel API réel
    console.log('Données du formulaire:', formData);
    
    // Afficher la confirmation
    setFormSubmitted(true);
    
    // Réinitialiser après 5 secondes (optionnel)
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        problemType: '',
        orderNumber: '',
        description: '',
        attachments: null
      });
    }, 5000);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      problemType: '',
      orderNumber: '',
      description: '',
      attachments: null
    });
  };

  return (
    <div className="service-client-page">
      {/* Hero Section */}
      <section className="service-client-hero">
        <div className="container">
          <h1>🤝 Service Client SamStore</h1>
          <p>Nous sommes là pour vous aider 7j/7</p>
        </div>
      </section>

      {/* Navigation */}
      <section className="service-nav">
        <div className="container">
          <div className="service-nav-buttons">
            <button 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => setActiveSection('contact')}
            >
              📞 Contact
            </button>
            <button 
              className={activeSection === 'faq' ? 'active' : ''}
              onClick={() => setActiveSection('faq')}
            >
              ❓ FAQ
            </button>
            <button 
              className={activeSection === 'guides' ? 'active' : ''}
              onClick={() => setActiveSection('guides')}
            >
              📚 Guides
            </button>
            <button 
              className={activeSection === 'reclamation' ? 'active' : ''}
              onClick={() => setActiveSection('reclamation')}
            >
              ⚠️ Réclamation
            </button>
          </div>
        </div>
      </section>

      {/* Section Contact - AVEC TES VRAIES COORDONNÉES */}
      {activeSection === 'contact' && (
        <section className="contact-section">
          <div className="container">
            <h2>📞 Contactez-Nous</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>Téléphone</h3>
                <p><strong>+229 01 59 23 35 17</strong></p>
                <p>Lun-Sam: 8h-20h | Dim: 9h-18h</p>
                <button className="contact-btn" onClick={handleCall}>
                  Appeler Maintenant
                </button>
              </div>

              <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>WhatsApp</h3>
                <p><strong>+229 58 59 54 25</strong></p>
                <p>Réponse instantanée</p>
                <button className="contact-btn" onClick={openWhatsApp}>
                  Ouvrir WhatsApp
                </button>
              </div>

              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <h3>Email</h3>
                <p><strong>mamakonisami@gmail.com</strong></p>
                <p>Réponse sous 24h</p>
                <button className="contact-btn" onClick={sendEmail}>
                  Envoyer un Email
                </button>
              </div>

              <div className="contact-card">
                <div className="contact-icon">🏪</div>
                <h3>Boutique Physique</h3>
                <p><strong>Cotonou, Bénin</strong></p>
                <p>Lun-Sam: 8h-20h | Dim: 9h-18h</p>
                <button className="contact-btn" onClick={openMap}>
                  Voir sur la Carte
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Les autres sections restent inchangées */}
      {activeSection === 'faq' && (
        <section className="faq-section">
          <div className="container">
            <h2>❓ Questions Fréquentes</h2>
            <div className="faq-grid">
              <div className="faq-category">
                <h3>🛒 Commandes & Livraison</h3>
                <div className="faq-item">
                  <h4>Quels sont les délais de livraison ?</h4>
                  <p>Livraison en 24h à Cotonou, 48h dans tout le Bénin. Livraison gratuite dès 50.000 FCFA.</p>
                </div>
                <div className="faq-item">
                  <h4>Comment suivre ma commande ?</h4>
                  <p>Un numéro de suivi vous est envoyé par SMS et email après l'expédition.</p>
                </div>
              </div>

              <div className="faq-category">
                <h3>💳 Paiement</h3>
                <div className="faq-item">
                  <h4>Quels moyens de paiement acceptez-vous ?</h4>
                  <p>Mobile Money, cartes bancaires, et paiement à la livraison.</p>
                </div>
                <div className="faq-item">
                  <h4>Le paiement est-il sécurisé ?</h4>
                  <p>Oui, tous nos paiements sont cryptés et 100% sécurisés.</p>
                </div>
              </div>

              <div className="faq-category">
                <h3>🛡️ Garanties & Retours</h3>
                <div className="faq-item">
                  <h4>Quelle est votre politique de retour ?</h4>
                  <p>14 jours pour changer d'avis, retours gratuits.</p>
                </div>
                <div className="faq-item">
                  <h4>Y a-t-il une garantie ?</h4>
                  <p>Garantie 2 ans sur l'électronique, satisfait ou remboursé.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'guides' && (
        <section className="guides-section">
          <div className="container">
            <h2>📚 Guides d'Aide</h2>
            <div className="guides-grid">
              <div className="guide-card">
                <h3>🛒 Premier Achat</h3>
                <p>Guide complet pour votre première commande</p>
                <button className="guide-btn">Lire le Guide</button>
              </div>
              <div className="guide-card">
                <h3>📦 Retour Produit</h3>
                <p>Comment retourner un produit facilement</p>
                <button className="guide-btn">Lire le Guide</button>
              </div>
              <div className="guide-card">
                <h3>🔧 Installation Produit</h3>
                <p>Guides d'installation et manuels</p>
                <button className="guide-btn">Voir les Guides</button>
              </div>
              <div className="guide-card">
                <h3>💡 Conseils d'Utilisation</h3>
                <p>Optimisez l'utilisation de vos produits</p>
                <button className="guide-btn">Découvrir</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'reclamation' && (
        <section className="reclamation-section">
          <div className="container">
            <h2>⚠️ Formulaire de Réclamation</h2>
            
            {!formSubmitted ? (
              <form className="reclamation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Type de problème</label>
                  <select 
                    name="problemType"
                    value={formData.problemType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Sélectionnez un type de problème</option>
                    <option value="Produit défectueux">Produit défectueux</option>
                    <option value="Livraison non reçue">Livraison non reçue</option>
                    <option value="Problème de facturation">Problème de facturation</option>
                    <option value="Service client">Service client</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Numéro de commande (si applicable)</label>
                  <input 
                    type="text" 
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleInputChange}
                    placeholder="Ex: CMD-12345" 
                  />
                </div>
                
                <div className="form-group">
                  <label>Description détaillée</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="5" 
                    placeholder="Décrivez votre problème en détail..."
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Pièces jointes (photos, factures)</label>
                  <input 
                    type="file" 
                    name="attachments"
                    onChange={handleInputChange}
                    multiple 
                  />
                </div>
                
                <button type="submit" className="submit-btn">
                  Soumettre la Réclamation
                </button>
              </form>
            ) : (
              <div className="confirmation-message">
                <div className="confirmation-icon">✅</div>
                <h3>Réclamation envoyée avec succès !</h3>
                <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
                <p className="confirmation-details">
                  <strong>Numéro de suivi:</strong> RC-{Date.now().toString().slice(-6)}
                </p>
                <p className="confirmation-note">
                  Vous recevrez une confirmation par email sous peu.
                </p>
                <button className="submit-btn" onClick={resetForm}>
                  ↻ Nouvelle Réclamation
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Bannière Assistance */}
      <section className="immediate-help">
        <div className="container">
          <div className="help-banner">
            <h3>🚀 Besoin d'aide immédiate ?</h3>
            <p>Notre assistant virtuel est disponible 24h/24</p>
            <button className="chatbot-btn" onClick={openChatbot}>
              💬 Ouvrir l'Assistant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceClient;