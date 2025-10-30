import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/contextAuth';
import { CartProvider } from './context/contextPanier'; 
import Home from './page/home/home';
import Electronic from './page/electronic/electronic';
import Fashion from './page/fashion/fashion';
import Jardin from './page/home-jardin/jardin';
import Beauty from './page/beauty/beauty';
import Sport from './page/sport/sport';
import Jeux from './page/jeux/jeux';
import Panier from './page/panier/panier';
import OffresDuJour from './page/offres-du-jour/offres-du-jour';
import Nouveautes from './page/nouveaute/nouveaute';
import Navbar from './components/header/header';
import Footer from './components/footer/footer';
import Paiement from './page/paiement/paiement';
import LoginPage from './page/auth/loginPage';
import RegisterPage from './page/auth/registerPage';
import SuivreCommande from './page/commande/commande';
import ServiceClient from './page/service-client/service-client';
import Profile from './page/profile/profile';
import { FavoritesProvider } from './context/contextFavoris'; 
import Favoris from './page/favoris/favoris';
import { SearchProvider } from './context/contextSearch';
import Chatbot from './components/chatbot/chatbot';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider> 
         <FavoritesProvider>
        <Router> 
          <SearchProvider>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/electronic" element={<Electronic />} />
                <Route path="/fashion" element={<Fashion />} />
                <Route path="/jardin" element={<Jardin />} />
                <Route path="/beauty" element={<Beauty />} />
                <Route path="/sport" element={<Sport />} />
                <Route path="/jeux" element={<Jeux />} />
                <Route path="/cart" element={<Panier />} />
                <Route path="/paiement" element={<Paiement />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* Routes pour les sous-catégories électroniques */}
                <Route path="/smartphones" element={<Electronic />} />
                <Route path="/ordinateurs-tablettes" element={<Electronic />} />
                <Route path="/audio-casques" element={<Electronic />} />
                <Route path="/montres-connectees" element={<Electronic />} />
                <Route path="/drones-cameras" element={<Electronic />} />
                <Route path="/gaming" element={<Electronic />} />
                <Route path="/deals" element={<OffresDuJour />} />
                <Route path="/nouveaute" element={<Nouveautes />} />
                <Route path="/service" element={<ServiceClient />} />
                <Route path="/commande" element={<SuivreCommande />} />
                <Route path="/favoris" element={<Favoris />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
          </div>
          </SearchProvider>
        </Router>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;