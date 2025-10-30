import React from 'react';
import { useCart } from '../../context/contextPanier';
import { Link } from 'react-router-dom';
import './panier.css';

const Panier = () => {
  const { articles, total, nombreArticles, updateQuantity, removeFromCart, clearCart } = useCart();

  const formaterPrix = (prix) => {
    return prix.toLocaleString() + ' FCFA';
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (articles.length === 0) {
    return (
      <div className="panier-page">
        <div className="panier-vide">
          <div className="panier-vide-content">
            <div className="panier-vide-icon">🛒</div>
            <h1>Votre panier est vide</h1>
            <p>Découvrez nos produits et ajoutez-les à votre panier !</p>
            <Link to="/electronic" className="btn-continuer-achats">
              ↶ Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panier-page">
      <div className="panier-container">
        {/* En-tête */}
        <div className="panier-header">
          <h1>Mon Panier</h1>
          <span className="nombre-articles">({nombreArticles} article{nombreArticles > 1 ? 's' : ''})</span>
        </div>

        <div className="panier-content">
          {/* Liste des articles */}
          <div className="liste-articles">
            {articles.map((article) => (
              <div key={article.id} className="article-panier">
                <img 
                  src={article.image} 
                  alt={article.name}
                  className="article-image"
                />
                
                <div className="article-info">
                  <h3 className="article-nom">{article.name}</h3>
                  <p className="article-prix-unitaire">
                    {formaterPrix(article.price)} / unité
                  </p>
                  
                  <div className="controles-quantite">
                    <button 
                      onClick={() => handleQuantityChange(article.id, article.quantite - 1)}
                      className="btn-quantite"
                    >
                      -
                    </button>
                    <span className="quantite">{article.quantite}</span>
                    <button 
                      onClick={() => handleQuantityChange(article.id, article.quantite + 1)}
                      className="btn-quantite"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="article-actions">
                  <p className="article-sous-total">
                    {formaterPrix(article.price * article.quantite)}
                  </p>
                  <button 
                    onClick={() => removeFromCart(article.id)}
                    className="btn-supprimer"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Résumé de commande */}
          <div className="resume-commande">
            <h3>Résumé de la commande</h3>
            
            <div className="ligne-resume">
              <span>Sous-total ({nombreArticles} article{nombreArticles > 1 ? 's' : ''})</span>
              <span>{formaterPrix(total)}</span>
            </div>
            
            <div className="ligne-resume">
              <span>Livraison</span>
              <span className="livraison-gratuite">Gratuite</span>
            </div>
            
            <div className="ligne-resume total">
              <span>Total TTC</span>
              <span>{formaterPrix(total)}</span>
            </div>

            <button className="btn-commander">
                <Link to="/paiement" className='btn-commander-link' >
  🛍️ Procéder au paiement
</Link>
            </button>

            <button 
              onClick={clearCart}
              className="btn-vider-panier"
            >
              🗑️ Vider le panier
            </button>

            <Link to="/" className="lien-continuer-achats">
              ↶ Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;