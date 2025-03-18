import {languages} from '../data/languages.js';

function LanguageChips() {
  // Create a div for each language in the languages array
  const languageChipElements = languages.map(language => {
    return (
      <div
        className="language-chip"
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