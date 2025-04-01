import { useState } from 'react'
import './App.css'

const images = import.meta.glob('../src/assets/cards/*', { eager: true });
const imageArray = Object.values(images).map((img) => img.default);

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const shuffledImages = shuffleArray(imageArray);

const toTitleCase = (str) => {
  return str
    .split('_')
    .join(' ');
};

function Card({ imgUrl, label }) {
  return (
    <div className='card'>
      <img src={imgUrl} alt="sinister-mark" />
      <p>{label}</p>
    </div>
  );
}

function SideBar() {
  return (
    <aside>
      <h1>Invincible Variants</h1>
      <p className='instruction'>Instructions: Don't pick the same card twice</p>
      <h2>Score</h2>
      <p className="score">0</p>
      <h2>Best Score</h2>
      <p className="best-score">0</p>
    </aside>
  );
}

function App() {

  return (
    <main>
      <SideBar />
      <section className='card-container'>
        {imageArray.map((imgUrl, index) => {
          const fileName = imgUrl.split('/').pop().split('.').shift();
          const titleCaseLabel = toTitleCase(fileName);
          return (
            <Card key={index} imgUrl={imgUrl} label={titleCaseLabel} />
          );
        })}
      </section>
    </main>
  )
}

export default App
