import Button from '../UI/Button';

const AppBottom = ({
  words,
  mainLang,
  mainLangHandler,
  shuffleWordsHandler,
}) => {
  return (
    <div className="app__bottom">
      <Button onClick={shuffleWordsHandler} disabled={words.length === 0}>
        Shuffle words
      </Button>
      <Button onClick={mainLangHandler} disabled={words.length === 0}>
        Switch {mainLang === 'default' ? '(En / Ru)' : '(Ru \\ En)'}
      </Button>
    </div>
  );
};

export default AppBottom;
