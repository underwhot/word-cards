import { useEffect, useState } from 'react';

import Button from '../UI/Button';

const Body = ({ words, mainLang }) => {
  const [currentWordLang, setCurrentWordLang] = useState(mainLang);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    setCurrentWordIndex(0);
  }, [words])

  useEffect(() => {
    setCurrentWordLang(mainLang);
  }, [mainLang]);

  const currentWordLangHandler = () => {
    currentWordLang === 'default'
      ? setCurrentWordLang('alternate')
      : setCurrentWordLang('default');
  };

  const nextWordHandler = () => {
    setCurrentWordLang(mainLang);
    setCurrentWordIndex((prev) => {
      if (prev !== words.length - 1) {
        return prev + 1;
      } else {
        return 0;
      }
    });
  };

  const prevWordHandler = () => {
    setCurrentWordLang(mainLang);
    setCurrentWordIndex((prev) => {
      if (prev !== 0) {
        return prev - 1;
      } else {
        return words.length - 1;
      }
    });
  };

  return (
    <div className="app__body">
      <div className="app__count">
        <span className="app__current">{currentWordIndex + 1}</span>
        <span className="app__all">{words.length}</span>
      </div>
      <button
        onClick={currentWordLangHandler}
        type="button"
        className="app__card"
      >
        {currentWord && currentWord[currentWordLang]}
      </button>
      <div className="app__action">
        <Button onClick={prevWordHandler}>Prev</Button>
        <Button onClick={nextWordHandler}>Next</Button>
      </div>
    </div>
  );
};

export default Body;
