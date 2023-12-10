import { Link } from 'react-router-dom';
import Button from '../UI/Button';

const Top = () => {
  return (
    <div className="app__top">
      <Link to="/all-words" className="btn">
        All words
      </Link>
    </div>
  );
};

export default Top;
