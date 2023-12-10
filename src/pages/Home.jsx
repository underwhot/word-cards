import { useState } from 'react';

import Top from '../components/MainPage/Top';
import Body from '../components/MainPage/Body';
import Bottom from '../components/MainPage/Bottom';

export const Home = ({ words, shuffleWordsHandler }) => {
  const [mainLang, setMainLang] = useState('default');

  const mainLangHandler = () => {
    mainLang === 'default' ? setMainLang('alternate') : setMainLang('default');
  };

  return (
    <div className="app">
      <Top />
      <Body words={words} mainLang={mainLang} />
      <Bottom
        mainLang={mainLang}
        mainLangHandler={mainLangHandler}
        shuffleWordsHandler={shuffleWordsHandler}
      />
    </div>
  );
};
