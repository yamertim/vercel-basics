import { useState, useEffect } from 'react'; // Importe les hooks React nécessaires
import './App.css'; // Importe le fichier CSS pour l'application


/* Génère un dégradé aléatoire */
function randomGradient() {
  // Cette fonction crée une couleur hexadécimale aléatoire
  const randHex = () =>
    Math.floor(Math.random() * 0xffffff) // Génère un nombre entre 0 et 16777215 (0xffffff en décimal)
      .toString(16) // Convertit en hexadécimal (base 16)
      .padStart(6, '0'); // Assure que la chaîne a 6 caractères en ajoutant des zéros si nécessaire
  
  // Retourne un gradient CSS avec deux couleurs aléatoires
  return `linear-gradient(135deg, #${randHex()}, #${randHex()})`;
}

export default function App() {
  // useState crée des variables d'état qui, lorsqu'elles changent, déclenchent un re-rendu
  const [fact, setFact] = useState(''); // État pour stocker l'anecdote sur les chats
  const [bg, setBg] = useState(randomGradient()); // État pour stocker le gradient de fond

  /* Charge une anecdote sur les chats et la traduit en français */
  const loadFact = async () => {
    setFact('Chargement…'); // Affiche un message de chargement pendant la requête
    try {
      // async/await permet d'écrire du code asynchrone de façon plus lisible

      // 1) on récupère l'anecdote en anglais depuis l'API catfact.ninja
      const res = await fetch('https://catfact.ninja/fact');
      const { fact: enFact } = await res.json(); // Extrait la propriété "fact" et la renomme en "enFact"

      // 2) on appelle l'API MyMemory pour traduire le texte de l'anglais vers le français
      const trRes = await fetch(
        'https://api.mymemory.translated.net/get?' +
        new URLSearchParams({ // Construit les paramètres de l'URL proprement
          q: enFact, // Le texte à traduire
          langpair: 'en|fr' // De l'anglais vers le français
        })
      );
      const trData = await trRes.json();
      // Récupère le texte traduit ou garde l'original si la traduction échoue
      const frFact = trData.responseData?.translatedText || enFact;

      // Met à jour l'état avec la nouvelle anecdote et un nouveau fond
      setFact(frFact);
      setBg(randomGradient());
    } catch (err) {
      // Gestion des erreurs si une des requêtes échoue
      console.error(err);
      setFact("😿 Impossible de charger la cat‑fact en français. Réessayez !");
    }
  };

  // useEffect s'exécute après le rendu du composant
  useEffect(() => {
    loadFact(); // Charge une anecdote au chargement initial de la page
  }, []); // Le tableau vide [] signifie "exécuter une seule fois après le premier rendu"

  // La partie JSX qui définit l'interface utilisateur
  return (
    <div
      className="App"
      style={{
        // Styles inline pour le conteneur principal
        minHeight: '100vh', // Hauteur minimale: 100% de la hauteur de la fenêtre
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        background: bg, // Utilise le gradient aléatoire stocké dans l'état
        color: '#fff',
        textShadow: '0 1px 4px rgba(0,0,0,.6)', // Ombre pour améliorer la lisibilité sur fond coloré
      }}
    >
      <h1>Cat Facts  😺</h1>
      <p style={{ maxWidth: 600, fontSize: '1.25rem', lineHeight: 1.4 }}>
        {fact} {/* Affiche l'anecdote stockée dans l'état */}
      </p>
      <button
        onClick={loadFact} // Appelle la fonction loadFact quand on clique sur le bouton
        style={{
          // Styles pour le bouton
          marginTop: '1.5rem',
          padding: '.6rem 1.4rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          background: '#ffffffbb', // Blanc semi-transparent
          color: '#111',
        }}
      >
        Une autre !
      </button>
    </div>
  );
}
