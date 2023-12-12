import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GrPowerReset } from 'react-icons/gr';

import Button from '../UI/Button';
import Loader from '../UI/Loader';

const Body = ({ isLoading, words, mainLang }) => {
  let storedCurrentWordIndex = localStorage.getItem('currentWordIndex');

  if (words.length && storedCurrentWordIndex >= words.length - 1) {
    console.log(words.length);
    storedCurrentWordIndex = words.length - 1;
  }

  const [flipCard, setFlipCard] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(
    Number(storedCurrentWordIndex) || 0
  );
  const [animationToggle, setAnimationToggle] = useState(null);

  const currentWord = words[currentWordIndex];
  const currentWordDef = currentWord && currentWord.default;
  const currentWordAlt = currentWord && currentWord.alternate;

  useEffect(() => {
    localStorage.setItem('currentWordIndex', currentWordIndex);
  }, [currentWordIndex]);

  useEffect(() => {
    mainLang === 'default' ? setFlipCard(false) : setFlipCard(true);
  }, [mainLang]);

  const toggleCurrentWordLangHandler = () => {
    setFlipCard(!flipCard);
  };

  const nextWordHandler = () => {
    mainLang === 'default' ? setFlipCard(false) : setFlipCard(true);
    setCurrentWordIndex((prev) => {
      if (prev !== words.length - 1) {
        return prev + 1;
      } else {
        return 0;
      }
    });
  };

  const prevWordHandler = () => {
    setCurrentWordIndex((prev) => {
      if (prev !== 0) {
        return prev - 1;
      } else {
        return words.length - 1;
      }
    });
  };

  const resetCurrentWordIndexHandler = () => {
    setCurrentWordIndex(0);
    setAnimationToggle((prev) => !prev);
    if (mainLang === 'default') {
      setFlipCard(false);
    }
    if (mainLang === 'alternate') {
      setFlipCard(true);
    }
  };

  const loading = isLoading ? <Loader /> : null;
  const empty = !isLoading && words.length === 0 ? <Empty /> : null;
  const content =
    !isLoading && words.length > 0 ? (
      <WordButton
        currentWordDef={currentWordDef}
        currentWordAlt={currentWordAlt}
        currentWordLangHandler={toggleCurrentWordLangHandler}
        flipCard={flipCard}
      />
    ) : null;

  return (
    <div className="app__body">
      <div className="app__top">
        <button
          disabled={words.length === 0 || currentWordIndex === 0}
          title="Reset words counter"
          onClick={resetCurrentWordIndexHandler}
          type="button"
          key={animationToggle}
          className={
            animationToggle === null
              ? 'app__count-reset'
              : 'app__count-reset active'
          }
        >
          <GrPowerReset size={18} />
        </button>
        <div className="app__counter">
          <span className="app__current">
            {words.length > 0 ? currentWordIndex + 1 : 0}
          </span>
          <span className="app__all">{words.length}</span>
        </div>
      </div>
      <div className="app__flip-card flip-card">
        {loading}
        {empty}
        {content}
      </div>

      <div className="app__action">
        <Button onClick={prevWordHandler} disabled={words.length === 0}>
          Prev
        </Button>
        <Button onClick={nextWordHandler} disabled={words.length === 0}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Body;

const WordButton = ({
  currentWordDef,
  currentWordAlt,
  currentWordLangHandler,
  flipCard,
}) => {
  return (
    <div
      onClick={currentWordLangHandler}
      className={`flip-card__body ${flipCard ? 'flip' : ''}`}
    >
      <div className="flip-card__inner">
        <button type="button" className="flip-card__front">
          <span key={currentWordDef}>{currentWordDef}</span>
        </button>
        <button type="button" className="flip-card__back">
          <span key={currentWordAlt}>{currentWordAlt}</span>
        </button>
      </div>
    </div>
  );
};

const Empty = () => {
  return (
    <Link to="all-words" className="flip-card__empty">
      No words found. <br />
      Click here to add new one
    </Link>
  );
};
