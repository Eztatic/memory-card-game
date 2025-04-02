import { useState, useEffect } from 'react'
import './App.css'

const images = import.meta.glob('../src/assets/cards/*', { eager: true });
const imageArray = Object.values(images).map((img, index) => ({
  id: index,
  src: img.default,
}));

const shuffleArray = (array) => {
  return [...array]
    .map((item) => ({ ...item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ sort, ...item }) => item);
};

const toTitleCase = (str) => {
  return str.split('_').join(' ');
};

function Card({ id, imgUrl, label, clickHandler }) {
  return (
    <div className='card' onClick={() => clickHandler(id)}>
      <img src={imgUrl} alt="img" />
      <p>{label}</p>
    </div>
  );
}

function SideBar({ score, highScore }) {
  return (
    <aside>
      <h1>Invincible Variants</h1>
      <p className='instruction'>Instructions: Don't pick the same card twice</p>
      <h2>Score</h2>
      <p className="score">{score}</p>
      <h2>Best Score</h2>
      <p className="best-score">{highScore}</p>
    </aside>
  );
}

function App() {
  const [shuffledImages, setShuffledImages] = useState(shuffleArray(imageArray));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Set());

  const handleCardClick = (id) => {
    if (clickedCards.has(id)) {
			setScore(0);
			setClickedCards(new Set()); 
		} else {
			const newClickedCards = new Set(clickedCards);
			newClickedCards.add(id);
			setClickedCards(newClickedCards);
			setScore(prev => {
				const newScore = prev + 1;
				setHighScore(high => Math.max(high, newScore));
				return newScore;
			});
		}

    setShuffledImages(shuffleArray(shuffledImages));
  };

  return (
    <main>
      <SideBar score={score} highScore={highScore} />
      <section className='card-container'>
        {shuffledImages.map(({ id, src }) => {
          const fileName = src.split('/').pop().split('.').shift();
          const titleCaseLabel = toTitleCase(fileName);
          return (
            <Card
              key={id}
              id={id}
              imgUrl={src}
              label={titleCaseLabel}
              clickHandler={handleCardClick} />
          );
        })}
      </section>
    </main>
  )
}

export default App
