import { 
  openKkiapayWidget, 
  addSuccessListener, 
  addFailedListener,
  addPendingListener
} from 'kkiapay';

// Configuration avec les BONNES clés
const KKIAPAY_CONFIG = {
  api_key: process.env.REACT_APP_KKIAPAY_PUBLIC_KEY,
  sandbox: true,
  amount: 0,
  phone: '22997000000',
  data: {},
  theme: '#FFA82F',
  name: 'SamStore',
  payment_methods: ['moov', 'mtn'],
  position: 'center'
};

// Fonction pour lancer un paiement
export const processPayment = (amount, phone, orderData = {}) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('🚀 Début du processus de paiement');
      console.log('🔑 Clé API utilisée:', KKIAPAY_CONFIG.api_key?.substring(0, 10) + '...');
      console.log('🌍 Environnement: SANDBOX');

      // Vérifications essentielles
      if (!amount || amount <= 0) {
        throw new Error('Le montant doit être supérieur à 0');
      }

      if (!phone || phone.length !== 11) {
        throw new Error('Numéro de téléphone invalide');
      }

      // Configuration finale
      const paymentConfig = {
        ...KKIAPAY_CONFIG,
        amount: Math.round(amount),
        phone: phone,
        data: {
          order_id: `CMD-${Date.now()}`,
          customer_name: 'Client SamStore',
          customer_phone: phone,
          items: orderData.items || [],
          ...orderData
        }
      };

      console.log('🎯 Configuration du paiement:', {
        amount: paymentConfig.amount,
        phone: paymentConfig.phone,
        api_key: paymentConfig.api_key?.substring(0, 10) + '...'
      });

      // Ouvrir le widget de paiement
      openKkiapayWidget(paymentConfig);

      console.log('✅ Widget KkiaPay ouvert');

      // Écouter le succès du paiement
      addSuccessListener((response) => {
        console.log('✅ Paiement réussi:', response);
        resolve({
          status: 'SUCCESS',
          transaction_id: response.transactionId,
          data: response
        });
      });

      // Écouter l'échec du paiement
      addFailedListener((error) => {
        console.error('❌ Paiement échoué:', error);
        let errorMessage = 'Erreur de paiement';
        
        if (error && error.message) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        reject(new Error(errorMessage));
      });

      // Écouter les paiements en attente
      addPendingListener((response) => {
        console.log('⏳ Paiement en attente:', response);
      });

      // Timeout de sécurité
      setTimeout(() => {
        reject(new Error('Délai de paiement dépassé'));
      }, 180000);

    } catch (error) {
      console.error('💥 Erreur initialisation KkiaPay:', error);
      reject(error);
    }
  });
};

// Fonction pour formater le numéro de téléphone
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\s/g, '').replace(/\+/g, '');
  
  // Si 8 chiffres → ajouter 229
  if (cleaned.length === 8 && /^\d+$/.test(cleaned)) {
    return `229${cleaned}`;
  }
  
  // Si 11 chiffres et commence par 229 → OK
  if (cleaned.length === 11 && cleaned.startsWith('229')) {
    return cleaned;
  }
  
  return cleaned;
};