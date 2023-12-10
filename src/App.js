import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Home } from './pages/Home';
import { AllWords } from './pages/AllWords';

import shuffleArray from './utils/shuffleArray';

function App() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    async function fetchWords() {
      try {
        const res = await axios.get(
          'https://654fb2ee358230d8f0cda05a.mockapi.io/words'
        );

        setWords(res.data);
      } catch (error) {
        console.error('Error fetching words:', error.message);
      }
    }

    fetchWords();
  }, []);

  const shuffleWordsHandler = () => {
    setWords((prev) => shuffleArray(prev));
  };

  const onDeleteWordHandler = async (id) => {
    setWords((prev) => {
      return prev.filter((word) => word.id !== id);
    });

    try {
      const res = await axios.delete(
        'https://654fb2ee358230d8f0cda05a.mockapi.io/words/' + id
      );
    } catch (error) {
      console.error('Error deleting words:', error.message);
    }
  };

  const onAddNewWordHandler = async (newWord) => {
    setWords((prev) => {
      return [newWord, ...prev];
    });

    try {
      const res = await axios.post(
        'https://654fb2ee358230d8f0cda05a.mockapi.io/words',
        newWord
      );
    } catch (error) {
      console.error('Error posting words:', error.message);
    }
  };

  return (
    <main className="page">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home words={words} shuffleWordsHandler={shuffleWordsHandler} />
            }
          />
          <Route
            path="/all-words"
            element={
              <AllWords
                words={words}
                onDeleteWordHandler={onDeleteWordHandler}
                onAddNewWordHandler={onAddNewWordHandler}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
