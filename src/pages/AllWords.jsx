import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../components/UI/Loader';
import Button from '../components/UI/Button';

import { FaDeleteLeft } from 'react-icons/fa6';

export const AllWords = ({
  isLoading,
  words,
  onDeleteWordHandler,
  onAddNewWordHandler,
}) => {
  const [defInput, setDefInput] = useState('');
  const [altInput, setAltInput] = useState('');

  const isValid = !!defInput.trim() && !!altInput.trim();

  const wordsList = words.map((word) => (
    <WordElem
      id={word.id}
      defWord={word.default}
      altWord={word.alternate}
      key={word.id}
      onDeleteWordHandler={onDeleteWordHandler}
    />
  ));

  const onInputWordHandler = (e, set) => {
    set(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (defInput.trim() === '' || altInput.trim() === '') {
      return;
    }

    const newWord = {
      default: defInput.trim(),
      alternate: altInput.trim(),
      id: uuidv4(),
    };

    onAddNewWordHandler(newWord);
    setDefInput('');
    setAltInput('');
  };

  const loading = isLoading ? <Loader /> : null;
  const empty = !isLoading && words.length === 0 ? <Empty /> : null;
  const content =
    !isLoading && words.length > 0 ? (
      <ol reversed className="words__list">
        {wordsList}
      </ol>
    ) : null;

  return (
    <>
      <div className="words">
        <h1 className="words__title">Words list</h1>
        <form className="words__form" onSubmit={onSubmitHandler}>
          <label className="words__label">
            Def:
            <input
              onChange={(e) => onInputWordHandler(e, setDefInput)}
              value={defInput}
              autoComplete="off"
              type="text"
              placeholder=""
              className="words__input"
            />
          </label>
          <label className="words__label">
            Alt:
            <input
              onChange={(e) => onInputWordHandler(e, setAltInput)}
              value={altInput}
              autoComplete="off"
              type="text"
              placeholder=""
              className="words__input"
            />
          </label>
          <Button type="submit" disabled={!isValid}>
            Add +
          </Button>
        </form>

        {loading}
        {empty}
        {content}
      </div>
      <Link to="/" type="button" className="home btn">
        Go home
      </Link>
    </>
  );
};

const WordElem = ({ defWord, altWord, id, onDeleteWordHandler }) => {
  return (
    <li className="words__item">
      <div className="words__box">
        <div className="words__row">
          <div className="words__word">{defWord}</div>
          <div className="words__word">{altWord}</div>
        </div>
        <button
          onClick={() => onDeleteWordHandler(id)}
          className="words__delete btn"
        >
          <FaDeleteLeft size={16} />
        </button>
      </div>
    </li>
  );
};

const Empty = () => {
  return <div className="words__epmty">Words list is empty!</div>;
};
