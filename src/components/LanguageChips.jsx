import {languages} from '../data/languages.js';
import { clsx } from 'clsx';

function LanguageChips({wrongGuessCount}) {
  // Create a div for each language in the languages array
  const languageChipElements = languages.map((language, index) => {
    // determine if rendered language chip has been lost
    const isLanguageLost = index < wrongGuessCount;
    const className = clsx('language-chip', isLanguageLost && 'lost');

    return (
      <div
        className={className}
        key={language.name}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        <p>
        {language.name}
        </p>
      </div>
    )
  })

  return (
    <div className="language-chips">
      {languageChipElements}
    </div>
  )
}

export default LanguageChips;