import { useEffect, useState } from 'react';

import shuffleArray from './utils/shuffleArray';

import Top from './components/MainPage/Top';
import Body from './components/MainPage/Body';
import Bottom from './components/MainPage/Bottom';

function App() {
  const [words, setWords] = useState([]);
  const [mainLang, setMainLang] = useState('default');

  useEffect(() => {
    async function fetchWords() {
      try {
        const res = await fetch(
          'https://654fb2ee358230d8f0cda05a.mockapi.io/words'
        );
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        setWords(data);
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    }

    fetchWords();
  }, []);

  const mainLangHandler = () => {
    mainLang === 'default' ? setMainLang('alternate') : setMainLang('default');
  };

  const shuffleWordsHandler = () => {
    setWords((prev) => shuffleArray(prev));
  };

  return (
    <main className="page">
      <div className="app">
        <Top />
        <Body words={words} mainLang={mainLang} />
        <Bottom
          mainLang={mainLang}
          mainLangHandler={mainLangHandler}
          shuffleWordsHandler={shuffleWordsHandler}
        />
      </div>
    </main>
  );
}

export default App;
