function A11yStatus({isGameStarted, currentWord, lastGuessedLetter, isLastGuessIncorrect, currentWrongGuessesAvailable, guessedLetters}) {

  function guessesRemainingMessage() {
    if (currentWrongGuessesAvailable === 0) {
      return `You can't guess wrong again!`;
    } else if (currentWrongGuessesAvailable === 1) {
      return `You can only guess wrong one more time!`;
    } else {
      return `You can guess wrong ${currentWrongGuessesAvailable} more times.`;
    }
  }


  return (
    <section
      className="visually-hidden"
      aria-live="polite"
      role="status">
      <h2>{`Guess this ${currentWord.length} letter word.`}</h2>
      {/* read the result of the last guess and guessed remaining. should start reading after first guess is made */}
      <p>
        Current game state of the letters:{' '}
        {currentWord
          .split('')
          .map((letter) =>
            guessedLetters.includes(letter) ? letter + '.' : 'hidden'
          )
          .join(' ')}
      </p>
        {isGameStarted && (
          <p>
            {currentWord.includes(lastGuessedLetter)
              ? `Correct. The letter ${lastGuessedLetter} is in the word!`
              : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
            {isLastGuessIncorrect && guessesRemainingMessage()}
          </p>
        )}
    </section>
  );
}

export default A11yStatus;