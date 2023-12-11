import { useEffect, useState } from 'react';

import Top from '../components/MainPage/Top';
import Body from '../components/MainPage/Body';
import Bottom from '../components/MainPage/Bottom';

export const Home = ({ isLoading, words, shuffleWordsHandler }) => {
  const storedLand = localStorage.getItem('mainLang');

  const [mainLang, setMainLang] = useState(storedLand || 'default');

  const mainLangHandler = () => {
    mainLang === 'default' ? setMainLang('alternate') : setMainLang('default');
  };

  useEffect(() => {
    localStorage.setItem('mainLang', mainLang);
  }, [mainLang]);

  return (
    <div className="app">
      <Top />
      <Body isLoading={isLoading} words={words} mainLang={mainLang} />
      <Bottom
        words={words}
        mainLang={mainLang}
        mainLangHandler={mainLangHandler}
        shuffleWordsHandler={shuffleWordsHandler}
      />
    </div>
  );
};
