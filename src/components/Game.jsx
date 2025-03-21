import React from 'react';
import Banner from './Banner';
import LanguageChips from './LanguageChips';

function AssemblyEndgame() {

  const [currentWord, setCurrentWord] = React.useState('react');

  const letterElements = currentWord.split('').map((letter, index) => {
    return (
      <p key={index} className="letter">
        {letter.toUpperCase()}
      </p>
    )
  })

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const keyboardElements = alphabet.split('').map((letter, index) => (
    <button key={index} className="keyboard-key">
      {letter.toUpperCase()}
    </button>
  ));

  return (
    <div className="game-wrapper">
      <Banner />
      <LanguageChips />
      <section className="word-section">
        <div className="word-container">
        {letterElements}
        </div>
      </section>
      <section className="keyboard-section">
        <div className="keyboard">
          {keyboardElements}
        </div>
      </section>
    </div>
  )
}

export default AssemblyEndgame;