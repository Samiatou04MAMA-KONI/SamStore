import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Section principale */}
        <div className="footer-main">
          
          {/* Colonne 1 - À propos */}
          <div className="footer-column">
            <h3>SamStore</h3>
            <p className="footer-description">
              Votre destination shopping de confiance au Bénin. Produits de qualité, livraison rapide et service client exceptionnel.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">📘 Facebook</a>
              <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
              <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
              <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
            </div>
          </div>

          {/* Colonne 2 - Catégories */}
          <div className="footer-column">
            <h4>Catégories</h4>
            <div className="footer-links">
              <Link to="/electronic" className="footer-link">📱 Électronique</Link>
              <Link to="/fashion" className="footer-link">👗 Mode & Vêtements</Link>
              <Link to="/jardin" className="footer-link">🏠 Maison & Jardin</Link>
              <Link to="/beauty" className="footer-link">💄 Beauté & Santé</Link>
              <Link to="/sport" className="footer-link">⚽ Sports & Loisirs</Link>
              <Link to="/jeux" className="footer-link">🧸 Jeux & Jouets</Link>
            </div>
          </div>

          {/* Colonne 3 - Mon compte */}
          <div className="footer-column">
            <h4>Mon Compte</h4>
            <div className="footer-links">
              <Link to="/login" className="footer-link">🔐 Connexion</Link>
              <Link to="/register" className="footer-link">📝 Inscription</Link>
              <Link to="/profile" className="footer-link">👤 Mon profil</Link>
              <Link to="/commande" className="footer-link">📦 Mes commandes</Link>
              <Link to="/favoris" className="footer-link">❤️ Mes favoris</Link>
              <Link to="/cart" className="footer-link">🛒 Mon panier</Link>
            </div>
          </div>

          {/* Colonne 4 - Service client */}
          <div className="footer-column">
            <h4>Service Client</h4>
            <div className="footer-links">
              <Link to="/chatbot" className="footer-link">❓ Centre d'aide</Link>
              <Link to="/service" className="footer-link">📞 Nous contacter</Link>
              <Link to="/commande" className="footer-link">📦 Suivre ma commande</Link>
              <Link to="/returns" className="footer-link">↩️ Retours & Échanges</Link>
              <Link to="/shipping" className="footer-link">🚚 Livraison</Link>
              <Link to="/guarantee" className="footer-link">🛡️ Garantie</Link>
            </div>
          </div>

          {/* Colonne 5 - Informations */}
          <div className="footer-column">
            <h4>Informations</h4>
            <div className="footer-links">
              <Link to="/about" className="footer-link">ℹ️ À propos</Link>
              <Link to="/careers" className="footer-link">💼 Carrières</Link>
              <Link to="/press" className="footer-link">📰 Presse</Link>
              <Link to="/terms" className="footer-link">📄 CGV</Link>
              <Link to="/privacy" className="footer-link">🔒 Confidentialité</Link>
              <Link to="/cookies" className="footer-link">🍪 Cookies</Link>
            </div>
          </div>

        </div>

        {/* Section de contact */}
        <div className="footer-contact">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <div className="contact-label">Service client</div>
                <div className="contact-value">+229 01 59 23 35 17</div>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">contact@samstore.bj</div>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <div>
                <div className="contact-label">Horaires</div>
                <div className="contact-value">Lun - Sam: 8h - 20h</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section de sécurité */}
        <div className="footer-security">
          <div className="security-badges">
            <div className="security-badge">🛡️ Paiement sécurisé</div>
            <div className="security-badge">🔒 Données protégées</div>
            <div className="security-badge">🚚 Livraison rapide</div>
            <div className="security-badge">💯 Satisfaction garantie</div>
          </div>
        </div>

        {/* Section bas de footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              © 2024 SamStore. Tous droits réservés.
            </div>
            <div className="payment-methods">
              <span className="payment-text">Paiements acceptés :</span>
              <div className="payment-icons">
                <span className="payment-icon">📱 Mobile Money</span>
                <span className="payment-icon">💳 Carte bancaire</span>
                <span className="payment-icon">💰 Espèces</span>
                <span className="payment-icon">🏦 Virement</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;