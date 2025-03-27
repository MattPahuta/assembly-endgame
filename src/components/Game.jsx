import React from 'react';
import A11yStatus from './A11yStatus';
import LanguageChips from './LanguageChips';
import { clsx } from 'clsx';
import { languages } from '../data/languages';
import WonBanner from './WonBanner';
import LostBanner from './LostBanner';
import StatusBanner from './StatusBanner';

function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = React.useState('react');
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  // Derived values
  const startingWrongGuessesAvailable = languages.length - 2;
  console.log(startingWrongGuessesAvailable);
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;

  // Game status logic
  console.log('Wrong guess count: ', wrongGuessCount);
  const currentWrongGuessesAvailable = startingWrongGuessesAvailable - wrongGuessCount;
  console.log(`You onnly have ${currentWrongGuessesAvailable} wrong guesses left!`);


  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const isGameWon = currentWord
    .split('')
    .every((letter) =>
      guessedLetters.includes(letter)
    );
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  // check for wrong answer
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)



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
    setIsGameStarted(true);

  }

  // Create <p> elements for each letter of current game word
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
        disabled={isGameOver}
        aria-label={`Letter ${letter}`}
        aria-disabled={guessedLetters.includes(letter)}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
  });

  const bannerSectionClassName = clsx('banner', {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  })

  // ToDo: each section should have a heading
  return (
    <div className="game-wrapper">
      <section className={bannerSectionClassName} aria-live='polite' role='status'>
        {(!isGameOver && isLastGuessIncorrect) && <StatusBanner lostLanguage={languages[wrongGuessCount - 1].name} />}
        {isGameWon && <WonBanner />}
        {isGameLost && <LostBanner />}
      </section>
      <LanguageChips wrongGuessCount={wrongGuessCount} />
      <section className="word-section">
        <h2 className='visually-hidden'>Game Word</h2>
        <div className="word-container">{letterElements}</div>
      </section>
      {/* Section for accessibility-specific content (sr-only). ToDo: create components, helper funcs */}
      {/* Only render this if game has started - add isGameInProgress state */}
      <A11yStatus
        isGameStarted={isGameStarted}
        currentWord={currentWord}
        lastGuessedLetter={lastGuessedLetter}
        isLastGuessIncorrect={isLastGuessIncorrect}
        currentWrongGuessesAvailable={currentWrongGuessesAvailable}
        guessedLetters={guessedLetters}
      />
      <section className="keyboard-section">
        <h2 className='visually-hidden'>Game Keyboard</h2>
        <div className="keyboard">{keyboardElements}</div>
      </section>
      {isGameOver && (
        <button className="button new-game-button">New Game</button>
      )}
    </div>
  );
}

export default AssemblyEndgame;