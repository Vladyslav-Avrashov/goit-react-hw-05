import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1>404 - Page not found</h1>
      <Link to="/" className={s.link}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
