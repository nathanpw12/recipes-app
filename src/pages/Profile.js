import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from './Profile.module.css';

const Profile = () => {
  const history = useHistory();

  const redirectHistory = (param) => {
    history.push(param);
  };
  const dados = JSON.parse(localStorage.getItem('user'));

  const redirectLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className={ styles.main }>
      <Header />
      <div className={ styles.form }>

        <h2 className={ styles.h2 } data-testid="profile-email">{dados?.email}</h2>

        <button
          className={ `${styles.button} ${styles.button__hover}` }
          type="button"
          data-testid="profile-done-btn"
          onClick={
            () => redirectHistory('/done-recipes')
          }
        >
          Done Recipes
        </button>
        <button
          className={ `${styles.button} ${styles.button__hover}` }
          type="button"
          data-testid="profile-favorite-btn"
          onClick={
            () => redirectHistory('/favorite-recipes')
          }
        >
          Favorite Recipes
        </button>
        <button
          className={ `${styles.button} ${styles.button__hover}` }
          type="button"
          data-testid="profile-logout-btn"
          onClick={
            () => redirectLogout()
          }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
