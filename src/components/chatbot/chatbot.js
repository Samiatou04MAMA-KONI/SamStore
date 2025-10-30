import React, { useState, useRef, useEffect } from 'react';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Bonjour ! Je suis l'assistant SamStore. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

// 🔥 IMPORTANT : Écouter l'événement 'openChatbot'
  useEffect(() => {
    // Fonction qui sera appelée quand l'événement est déclenché
    const handleOpenChatbot = () => {
      console.log('📢 Événement openChatbot reçu - Ouverture du chatbot');
      setIsOpen(true); // Ouvre le chatbot
    };

    // S'abonner à l'événement
    window.addEventListener('openChatbot', handleOpenChatbot);

    // 🔥 NETTOYAGE : Désabonner quand le composant est détruit
    return () => {
      window.removeEventListener('openChatbot', handleOpenChatbot);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Réponses automatiques du bot
// Réponses automatiques du bot
const getBotResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  // Salutations
  if (message.includes('bonjour') || message.includes('salut') || message.includes('hello') || message.includes('coucou')) {
    return "👋 Bonjour ! Je suis l'assistant SamStore. Je peux vous aider avec :\n• Nos produits et catégories 📱\n• Livraison et paiement 🚚\n• Promotions et nouveautés 🔥\n• Service client 📞\n\nComment puis-je vous aider aujourd'hui ?";
  }
  
  // Au revoir
  if (message.includes('au revoir') || message.includes('bye') || message.includes('à bientôt') || message.includes('bonne journée')) {
    return "À bientôt ! 😊 N'hésitez pas à revenir si vous avez d'autres questions. Bonne journée !";
  }

  // Catégories de produits
  if (message.includes('catégorie') || message.includes('catégories') || message.includes('produits') || message.includes('rayon')) {
    return "🛍️ **Nos catégories principales :**\n\n• 📱 **Électronique** : Smartphones, tablettes, ordinateurs, accessoires\n• 👗 **Mode & Vêtements** : Robes, sacs, chaussures, accessoires\n• 💄 **Beauté & Parfums** : Maquillage, soins, parfums, produits cheveux\n• 🏠 **Maison & Jardin** : Décoration, cuisine, jardinage, bricolage\n• 🎮 **Jeux & Jouets** : Jeux vidéo, jouets enfants, jeux éducatifs\n• ⚽ **Sports & Loisirs** : Fitness, yoga, sports, drones, musique\n\nQuelle catégorie vous intéresse ?";
  }

  // Électronique
  if (message.includes('électronique') || message.includes('electronique') || message.includes('smartphone') || message.includes('iphone') || message.includes('samsung') || message.includes('ordinateur') || message.includes('pc') || message.includes('tablette')) {
    return "📱 **Électronique - Nos produits :**\n\n• **Smartphones** : iPhone, Samsung, Huawei, Xiaomi\n• **Ordinateurs** : PC portable, MacBook, accessoires\n• **Tablettes** : iPad, Samsung Tab, accessoires\n• **Audio** : Casques, écouteurs, enceintes\n• **Gaming** : Consoles, manettes, accessoires\n• **Montres connectées** : Apple Watch, Samsung Galaxy Watch\n• **Accessoires** : Câbles, chargeurs, coques\n\n💡 **Conseil** : Visitez la section Électronique pour découvrir tous nos produits !";
  }

  // Mode
  if (message.includes('mode') || message.includes('fashion') || message.includes('vêtement') || message.includes('vetement') || message.includes('robe') || message.includes('sac') || message.includes('chaussure') || message.includes('bijou')) {
    return "👗 **Mode & Vêtements - Nos collections :**\n\n• **Robes** : Soirée, quotidien, été, cocktail\n• **Sacs** : À main, sacs à dos, besace\n• **Chaussures** : Talons, baskets, sandales\n• **Accessoires** : Bijoux, ceintures, lunettes\n• **Prêt-à-porter** : Hauts, bas, ensembles\n• **Collections saisonnières** : Printemps, été, automne, hiver\n\n🌟 **Nouveauté** : Découvrez notre nouvelle collection Printemps 2024 !";
  }

  // Beauté
  if (message.includes('beauté') || message.includes('beaute') || message.includes('parfum') || message.includes('maquillage') || message.includes('cosmétique') || message.includes('soin') || message.includes('cheveux') || message.includes('peau')) {
    return "💄 **Beauté & Parfums - Notre gamme :**\n\n• **Parfums** : Homme, femme, édition limitée\n• **Maquillage** : Fond de teint, rouge à lèvres, mascara\n• **Soins visage** : Crèmes, sérums, nettoyants\n• **Soins cheveux** : Shampoings, après-shampoings, soins\n• **Corps & Bain** : Gels douche, lotions, parfums d'ambiance\n• **Accessoires** : Pinceaux, miroirs, trousses\n\n🌸 **Conseil beauté** : Nos conseillers peuvent vous aider à choisir les produits adaptés à votre type de peau !";
  }

  // Maison & Jardin
  if (message.includes('maison') || message.includes('jardin') || message.includes('décoration') || message.includes('decoration') || message.includes('cuisine') || message.includes('mobilier') || message.includes('bricolage') || message.includes('jardinage')) {
    return "🏠 **Maison & Jardin - Nos univers :**\n\n• **Décoration** : Tableaux, vases, coussins, luminaires\n• **Cuisine** : Ustensiles, électroménager, vaisselle\n• **Jardinage** : Plantes, pots, outils, mobilier extérieur\n• **Bricolage** : Outils, quincaillerie, peinture\n• **Salle de bain** : Accessoires, miroirs, rangement\n• **Textile** : Draps, couvertures, serviettes\n\n🌻 **Astuce** : Créez votre espace de rêve avec nos produits de décoration !";
  }

  // Jeux & Jouets
  if (message.includes('jeux') || message.includes('jouet') || message.includes('gaming') || message.includes('enfant') || message.includes('bébé') || message.includes('bebe') || message.includes('éducatif') || message.includes('educatif')) {
    return "🎮 **Jeux & Jouets - Notre sélection :**\n\n• **Jeux vidéo** : Consoles, jeux, accessoires gaming\n• **Jouets enfants** : Peluches, poupées, voitures, jeux de construction\n• **Jeux éducatifs** : Apprentissage, développement, créativité\n• **Jeux d'extérieur** : Toboggans, balançoires, vélos\n• **Jeux de société** : Famille, stratégie, cartes\n• **Figurines** : Collection, animation, décoration\n\n🧸 **Pour tous les âges** : De 0 à 99 ans, nous avons le jeu parfait !";
  }

  // Sports
  if (message.includes('sport') || message.includes('fitness') || message.includes('yoga') || message.includes('musculation') || message.includes('football') || message.includes('basket') || message.includes('natation') || message.includes('drone')) {
    return "⚽ **Sports & Loisirs - Nos équipements :**\n\n• **Fitness** : Tapis, haltères, vêtements sport\n• **Yoga & Pilates** : Tapis, blocs, vêtements\n• **Sports collectifs** : Football, basket, volley\n• **Sports outdoor** : Randonnée, camping, vélo\n• **Natation** : Maillots, lunettes, accessoires\n• **Drones & High-tech** : Drones, caméras, accessoires\n• **Instruments musique** : Guitares, pianos, batteries\n\n💪 **Conseil sport** : Trouvez l'équipement adapté à votre pratique sportive !";
  }

  // Prix et coûts
  if (message.includes('prix') || message.includes('coût') || message.includes('cout') || message.includes('combien') || message.includes('cher') || message.includes('coûte') || message.includes('coute')) {
    return "💰 **Informations prix :**\n\n• Les prix varient selon les produits et marques\n• Nous proposons des produits de qualité à prix compétitifs\n• Paiement en plusieurs fois disponible\n• Livraison gratuite dès 50.000 FCFA\n• Promotions régulières jusqu'à -70%\n\n💡 **Conseil** : Consultez les fiches produits pour les prix exacts et les promotions en cours !";
  }
  
  // Livraison
  if (message.includes('livraison') || message.includes('délai') || message.includes('delai') || message.includes('shipping') || message.includes('delivery') || message.includes('expédition') || message.includes('expedition') || message.includes('frais de port')) {
    return "🚚 **Service Livraison :**\n\n• **Cotonou** : Livraison express en 24h\n• **Bénin** : Livraison en 48h partout au pays\n• **Gratuité** : Livraison offerte dès 50.000 FCFA d'achat\n• **Suivi** : Numéro de suivi fourni pour chaque commande\n• **Points relais** : Retrait disponible dans nos points partenaires\n• **Emballage** : Emballage soigné et sécurisé\n\n📦 **Options** : Livraison standard ou express disponible !";
  }
  
  // Paiement
  if (message.includes('paiement') || message.includes('payer') || message.includes('moyen') || message.includes('payment') || message.includes('carte') || message.includes('momo') || message.includes('mobile money') || message.includes('espèce') || message.includes('espece')) {
    return "💳 **Modes de Paiement :**\n\n• **Mobile Money** : MTN, Moov, Flooz\n• **Cartes bancaires** : Visa, Mastercard, local\n• **Paiement à la livraison** : Espèces ou mobile money\n• **Paiement sécurisé** : Cryptage SSL, protection des données\n• **Paiement en plusieurs fois** : Options disponibles\n• **Virements** : Virements bancaires acceptés\n\n🔒 **Sécurité** : Tous nos paiements sont 100% sécurisés !";
  }
  
  // Garanties et retours
  if (message.includes('garantie') || message.includes('retour') || message.includes('échange') || message.includes('echange') || message.includes('remboursement') || message.includes('satisfait') || message.includes('garanti')) {
    return "🛡️ **Garanties & Retours :**\n\n• **Garantie constructeur** : 2 ans sur l'électronique\n• **Retours gratuits** : 14 jours pour changer d'avis\n• **Satisfait ou remboursé** : Politique de satisfaction client\n• **Échanges** : Produits défectueux échangés immédiatement\n• **Service après-vente** : Assistance technique disponible\n• **Pièces détachées** : Disponibilité des pièces de rechange\n\n✅ **Confiance** : Votre satisfaction est notre priorité !";
  }

  // Contact
  if (message.includes('contact') || message.includes('téléphone') || message.includes('telephone') || message.includes('email') || message.includes('adresse') || message.includes('appeler') || message.includes('appel')) {
    return "📞 **Contactez-nous :**\n\n• **Téléphone** : +229 97 00 00 00\n• **WhatsApp** : +229 97 00 00 00\n• **Email** : contact@samstore.bj\n• **Adresse** : Cotonou, Bénin\n• **Réseaux sociaux** : @SamStoreBenin\n• **Heures d'ouverture** : Lun-Sam 8h-20h, Dim 9h-18h\n\n💬 **Disponibilité** : Notre équipe est là pour vous aider !";
  }
  
  // Horaires
  if (message.includes('heure') || message.includes('ouvert') || message.includes('fermé') || message.includes('ferme') || message.includes('ouverture') || message.includes('fermeture') || message.includes('weekend')) {
    return "🕒 **Horaires d'ouverture :**\n\n• **Lundi - Vendredi** : 8h00 - 20h00\n• **Samedi** : 8h00 - 20h00\n• **Dimanche** : 9h00 - 18h00\n• **Jours fériés** : 9h00 - 17h00\n• **Service client** : 7j/7 de 8h à 22h\n• **Livraisons** : Du lundi au samedi\n\n⏰ **Flexibilité** : Commandez 24h/24 sur notre site !";
  }
  
  // Promotions
  if (message.includes('promo') || message.includes('réduction') || message.includes('reduction') || message.includes('solde') || message.includes('offre') || message.includes('discount') || message.includes('rabais')) {
    return "🔥 **Promotions & Offres :**\n\n• **Offres du jour** : Promotions flash quotidiennes\n• **Soldes** : -30% à -70% sur sélection\n• **Black Friday** : Événement annuel avec réductions exceptionnelles\n• **Nouveaux clients** : -15% sur première commande\n• **Fidélité** : Programme de points et cadeaux\n• **Newsletter** : Recevez nos meilleures offres en exclusivité\n\n🎯 **Astuce** : Abonnez-vous à notre newsletter pour ne rien manquer !";
  }

  // Nouveautés
  if (message.includes('nouveau') || message.includes('nouveauté') || message.includes('nouveaute') || message.includes('dernier') || message.includes('récent') || message.includes('recent') || message.includes('sortie')) {
    return "🌟 **Nouveautés :**\n\n• **Dernières sorties** : Produits juste arrivés\n• **Tendances** : Articles les plus populaires\n• **Éditions limitées** : Produits exclusifs\n• **Collections saisonnières** : Printemps, été, etc.\n• **Innovations** : Technologies et designs nouveaux\n• **Pré-commandes** : Réservez les produits à venir\n\n🚀 **Soyez le premier** : Découvrez nos nouveautés en avant-première !";
  }

  // Commande
  if (message.includes('commande') || message.includes('commander') || message.includes('acheter') || message.includes('achat') || message.includes('panier') || message.includes('cart')) {
    return "🛒 **Passer commande :**\n\n1. **Ajoutez** les produits au panier\n2. **Vérifiez** votre sélection\n3. **Choisissez** le mode de livraison\n4. **Sélectionnez** le mode de paiement\n5. **Confirmez** votre commande\n6. **Recevez** votre confirmation\n\n📱 **Facile** : Processus simple et sécurisé en quelques clics !";
  }

  // Service client
  if (message.includes('service client') || message.includes('sav') || message.includes('assistance') || message.includes('aide') || message.includes('problème') || message.includes('probleme') || message.includes('difficulté') || message.includes('difficulte')) {
    return "🤝 **Service Client :**\n\n• **Assistance technique** : Produits et fonctionnement\n• **Suivi commande** : Statut et livraison\n• **Réclamations** : Problèmes et solutions\n• **Conseils produits** : Aide au choix\n• **Support après-vente** : Installation et utilisation\n• **Formations** : Prise en main des produits\n\n🎯 **Engagement** : Nous vous accompagnons à chaque étape !";
  }

  // Merci
  if (message.includes('merci') || message.includes('thanks') || message.includes('thank you') || message.includes('gratitude')) {
    return "Avec grand plaisir ! 😊\n\nN'hésitez pas si vous avez d'autres questions. Je suis là pour vous aider à trouver exactement ce dont vous avez besoin !\n\nBonne visite sur SamStore 🛍️";
  }

  // Réponse par défaut
  return `Je comprends que vous cherchez des informations sur : "${userMessage}" 🤔

Voici comment je peux vous aider :
• 🛍️ **Produits & Catégories**
• 💰 **Prix & Promotions**
• 🚚 **Livraison & Retours**
• 💳 **Paiement & Sécurité**
• 📞 **Contact & Service client**

Pour une assistance personnalisée, contactez notre équipe :
📞 +229 97 00 00 00
📧 contact@samstore.bj

Y a-t-il un sujet particulier sur lequel je peux vous renseigner ?`;
};

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulation du temps de réponse du bot
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Bouton flottant */}
      <div 
        className={`chatbot-floating-btn ${isOpen ? 'hidden' : ''}`}
        onClick={toggleChat}
      >
        <div className="chatbot-icon">💬</div>
        <div className="chatbot-pulse"></div>
      </div>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="chatbot-window">
          {/* En-tête */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div className="chatbot-info">
              <h4>Assistant SamStore</h4>
              <span className="status online">● En ligne</span>
            </div>
            <button className="chatbot-close" onClick={toggleChat}>
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tapez votre message..."
              autoFocus
            />
            <button type="submit" disabled={!inputMessage.trim()}>
              📤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;