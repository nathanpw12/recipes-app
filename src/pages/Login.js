import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveTokenToLocalStorage, setLocalStorage } from '../helpers/localStorage';
import recebeEmail from '../redux/actions';
import styles from './Login.module.css';

const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const minLength = 7;
  const isPasswordValid = password.length < minLength;
  const isEmailValid = !VALID_EMAIL_REGEX.test(email);
  const isButtonDisabled = isPasswordValid || isEmailValid;
  const dispatch = useDispatch();
  const chave = { email };
  const history = useHistory();
  const sendAction = () => {
    dispatch(recebeEmail(email));
    setLocalStorage('user', chave);
    saveTokenToLocalStorage('mealsToken', '1');
    saveTokenToLocalStorage('cocktailsToken', '1');
    history.push('/foods');
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <main className={ styles.main }>
      <form className={ styles.form }>
        <h1 className={ styles.h1 }>Sing In</h1>
        <fieldset className={ styles.fieldset }>
          <input
            className={ `${styles.input} ${styles.input__placeholder}` }
            name="email"
            placeholder="Email"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </fieldset>
        <fieldset className={ styles.password__wrapper }>
          <input
            className={ `${styles.input} ${styles.input__placeholder}` }
            name="password"
            placeholder="Password"
            type={ passwordShown ? 'text' : 'password' }
            data-testid="password-input"
            onChange={ ({ target: { value } }) => setPassword(value) }
            value={ password }
          />
          <input
            className={ styles.show__password }
            type="checkbox"
            onClick={ togglePasswordVisiblity }
          />
        </fieldset>
        <fieldset className={ styles.fieldset }>
          <button
            className={ `${styles.button} ${styles.button} ${styles.button__hover} 
            ${styles.button__disable}` }
            type="submit"
            data-testid="login-submit-btn"
            disabled={ isButtonDisabled }
            onClick={ sendAction }
          >
            Enter
          </button>
        </fieldset>
      </form>
    </main>
  );
};
export default Login;
