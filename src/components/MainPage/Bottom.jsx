import Button from '../UI/Button';

const AppBottom = ({ mainLang, mainLangHandler, shuffleWordsHandler }) => {
  return (
    <div className="app__bottom">
      <Button onClick={shuffleWordsHandler}>Shuffle words</Button>
      <Button onClick={mainLangHandler}>
        Switch {mainLang === 'default' ? '(En / Ru)' : '(Ru \\ En)'}
      </Button>
    </div>
  );
};

export default AppBottom;
