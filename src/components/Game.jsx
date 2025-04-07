import React from 'react';
import A11yStatus from './A11yStatus';
import LanguageChips from './LanguageChips';
import { clsx } from 'clsx';
import { languages } from '../data/languages';
import { words } from '../data/words';
import { getRandomWord } from '../utils';
import WonBanner from './WonBanner';
import LostBanner from './LostBanner';
import StatusBanner from './StatusBanner';
import Confetti from 'react-confetti';

function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWord(words));
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  console.log('Current word: ', currentWord);
  console.log('Guessed letters: ', guessedLetters);
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

  // Reset game to fresh state
  function resetGame() {
    setCurrentWord(getRandomWord(words));
    setGuessedLetters([]);
    setIsGameStarted(false);
  }

  // Add the clicked letter to the guessedLetters array
  function addGuessedLetter(letter) {
    // Check if the clicked letter is in the currentWord
    setGuessedLetters(prevLetters => (
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
      )
    )
    setIsGameStarted(true);
  }

  // Render the current game word
  // Create <p> elements for each letter of current game word
  const letterElements = currentWord.split('').map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx('letter', {
      missedLetter: isGameLost && !guessedLetters.includes(letter),
      correctLetter: (isGameLost || isGameWon) && guessedLetters.includes(letter),
    });

    return (
      <p key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ''}
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
        disabled={isGuessed || isGameOver}
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

  return (
    <div className="game-wrapper">
      {isGameWon && 
        <Confetti 
          recycle={false}
          numberOfPieces={1000}
        />
      }
      <section className={bannerSectionClassName} aria-live='polite' role='status'>
        <h2 className='visually-hidden'>Current Game Status</h2>
        {(!isGameOver && isLastGuessIncorrect) && <StatusBanner lostLanguage={languages[wrongGuessCount - 1].name} />}
        {isGameWon && <WonBanner />}
        {isGameLost && <LostBanner />}
      </section>
      <LanguageChips wrongGuessCount={wrongGuessCount} />
      <section className="word-section">
        <h2 className='visually-hidden'>Game Word</h2>
        <div className="word-container">{letterElements}</div>
      </section>
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
        <button onClick={resetGame} className="button new-game-button">New Game</button>
      )}
    </div>
  );
}

export default AssemblyEndgame;