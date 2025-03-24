import React from 'react';
import Banner from './Banner';
import LanguageChips from './LanguageChips';
import { clsx } from 'clsx';
import { languages } from '../data/languages';
import WonBanner from './WonBanner';
import LostBanner from './LostBanner';

function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = React.useState('react');
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;

  const isGameWon = currentWord
    .split('')
    .every((letter) =>
      guessedLetters.includes(letter)
    );
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  // ToDo: add constants file? language number, alphabet
  // - import languages/languages.length to assign value?
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

  const bannerSectionClassName = clsx('banner', {
    won: isGameWon,
    lost: isGameLost,
  })

  // Banner needs

  return (
    <div className="game-wrapper">
      <section className={bannerSectionClassName}>
        {isGameWon && <WonBanner />}
        {isGameLost && <LostBanner />}
      </section>
      <LanguageChips wrongGuessCount={wrongGuessCount} />
      <section className="word-section">
        <div className="word-container">{letterElements}</div>
      </section>
      <section className="keyboard-section">
        <div className="keyboard">{keyboardElements}</div>
      </section>
      {isGameOver && (
        <button className="button new-game-button">New Game</button>
      )}
    </div>
  );
}

export default AssemblyEndgame;