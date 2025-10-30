import React, { useState } from 'react';
import { useCart } from '../../context/contextPanier';
import { processPayment, formatPhoneNumber } from '../../service/kkiapay';
import './paiement.css';

const Paiement = () => {
  const { articles, total, clearCart } = useCart();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const formaterPrix = (prix) => {
    return prix.toLocaleString() + ' FCFA';
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!phone) {
      setError('Veuillez entrer votre numéro de téléphone');
      return;
    }

    // Validation du numéro
    const formattedPhone = formatPhoneNumber(phone);
    if (formattedPhone.length !== 11) {
      setError('Numéro de téléphone invalide. Format: 97000000 ou +22997000000');
      return;
    }

    setIsLoading(true);
    setError('');
    setPaymentStatus(null);

    try {
      const orderData = {
        items: articles.map(article => ({
          name: article.name,
          quantity: article.quantite,
          price: article.price
        }))
      };

      const response = await processPayment(total, formattedPhone, orderData);
      
      if (response.status === 'SUCCESS') {
        setPaymentStatus('success');
        setTransactionId(response.transaction_id);
        
        // Vider le panier après paiement réussi
        clearCart();
      }
    } catch (error) {
      console.error('Erreur de paiement:', error);
      setPaymentStatus('failed');
      setError(error.message || 'Erreur lors du paiement. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (articles.length === 0 && !paymentStatus) {
    return (
      <div className="paiement-page">
        <div className="panier-vide">
          <h1>Votre panier est vide</h1>
          <p>Ajoutez des produits avant de procéder au paiement</p>
          <a href="/" className="btn-continuer">Continuer mes achats</a>
        </div>
      </div>
    );
  }

  return (
    <div className="paiement-page">
      <div className="paiement-container">
        <h1>Finaliser votre commande</h1>
        
        {/* Résumé de la commande */}
        <div className="resume-commande">
          <h2>Résumé de la commande</h2>
          <div className="articles-resume">
            {articles.map(article => (
              <div key={article.id} className="article-resume">
                <img src={article.image} alt={article.name} />
                <div className="article-info">
                  <h4>{article.name}</h4>
                  <p>Quantité: {article.quantite}</p>
                </div>
                <div className="article-prix">
                  {formaterPrix(article.price * article.quantite)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="total-section">
            <div className="ligne-total">
              <span>Sous-total:</span>
              <span>{formaterPrix(total)}</span>
            </div>
            <div className="ligne-total">
              <span>Livraison:</span>
              <span className="gratuit">Gratuite</span>
            </div>
            <div className="ligne-total total-final">
              <span>Total à payer:</span>
              <span>{formaterPrix(total)}</span>
            </div>
          </div>
        </div>

        {/* Formulaire de paiement */}
        {!paymentStatus && (
          <form className="formulaire-paiement" onSubmit={handlePayment}>
            <h2>Informations de paiement</h2>
            
            <div className="input-group">
              <label htmlFor="phone">Numéro de téléphone *</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 97000000 ou +22997000000"
                required
              />
              <small>Format: 8 chiffres (97000000) ou avec indicatif (+22997000000)</small>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="btn-payer"
              disabled={isLoading}
            >
              {isLoading ? 'Ouverture du paiement...' : `Payer ${formaterPrix(total)}`}
            </button>

            <div className="info-paiement">
              <h4>📱 Paiement Mobile Sécurisé</h4>
              <p>Le widget KkiaPay s'ouvrira pour confirmer votre paiement</p>
              <div className="operateurs">
                <span className="operateur">📱 Orange Money</span>
                <span className="operateur">📱 MTN Money</span>
                <span className="operateur">📱 Moov Money</span>
              </div>
              <p className="security-note">Vos informations de paiement sont sécurisées et cryptées</p>
            </div>
          </form>
        )}

        {/* Statut du paiement */}
        {paymentStatus === 'success' && (
          <div className="payment-status success">
            <div className="status-icon">✅</div>
            <h2>Paiement Réussi !</h2>
            <p>Votre commande a été confirmée et sera traitée rapidement.</p>
            {transactionId && (
              <p className="transaction-id">Référence: {transactionId}</p>
            )}
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="payment-status failed">
            <div className="status-icon">❌</div>
            <h2>Paiement Échoué</h2>
            <p>{error}</p>
            <button 
              onClick={() => setPaymentStatus(null)}
              className="btn-reessayer"
            >
              Réessayer le paiement
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paiement;