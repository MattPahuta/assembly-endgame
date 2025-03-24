import React from 'react';
import Banner from './Banner';
import LanguageChips from './LanguageChips';
import { clsx } from 'clsx';

function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = React.useState('react');
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;

  // Static values / constants
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';


  function addGuessedLetter(letter) {
    // Add the clicked letter to the guessedLetters array
    // Check if the clicked letter is in the currentWord
    setGuessedLetters(prevLetters => (
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
      )
    )
  }


  const letterElements = currentWord.split('').map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    return (
      <p key={index} className="letter">
        {isGuessed ? letter.toUpperCase() : ''}
      </p>
    )
  })


  // Create a button for each letter in the alphabet
  const keyboardElements = alphabet.split('').map((letter) => {
    // has letter been guessed?
    const isGuessed = guessedLetters.includes(letter);
    // if the letter has been guessed, is it in the current word?
    const isCorrect = isGuessed && currentWord.includes(letter);
    // if the letter has been guessed, is it NOT in the current word?
    const isIncorrect = isGuessed && !currentWord.includes(letter);
    // build the class name based on the above conditions
    const className = clsx('button keyboard-button',{
      correct: isCorrect,
      incorrect: isIncorrect,
    })


    return (
      <button 
        className={className}
        key={letter} 
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
  });

  return (
    <div className="game-wrapper">
      <Banner />
      <LanguageChips wrongGuessCount={wrongGuessCount} />
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
      <button className="button new-game-button">New Game</button>
    </div>
  )
}

export default AssemblyEndgame;