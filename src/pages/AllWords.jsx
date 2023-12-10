import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const AllWords = ({
  words,
  onDeleteWordHandler,
  onAddNewWordHandler,
}) => {
  const [defInput, setDefInput] = useState('');
  const [altInput, setAltInput] = useState('');

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
          <button type="submit" className="words__add btn">
            Add +
          </button>
        </form>

        <ol reversed className="words__list">
          {wordsList}
        </ol>
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
      <div className="words__row">
        <div className="words__box">{defWord}</div>
        <div className="words__box">{altWord}</div>
        <button
          onClick={() => onDeleteWordHandler(id)}
          className="words__delete"
        >
          X
        </button>
      </div>
    </li>
  );
};
