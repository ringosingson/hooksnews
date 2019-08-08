import React from 'react';
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import firebase from '../../firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
};

function Login(props) {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = React.useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push('/');
    } catch (err) {
      console.error('Authentication Error', err);
      setFirebaseError(err.message);
    }
  }

  return (
    <div>
      <h2 className='mv3'>{login ? 'Login' : 'Create Account'}</h2>
      <form
        onSubmit={handleSubmit}
        className='flex'
        style={{ flexDirection: 'column' }}
      >
        {!login && (
          <input
            onChange={handleChange}
            value={values.name}
            name='name'
            type='text'
            placeholder='Your name'
            autoComplete='off'
          />
        )}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name='email'
          type='email'
          className={errors.email && 'error-input'}
          placeholder='email'
          autoComplete='off'
        />
        {errors.email && <p className='error-text'>{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && 'error-input'}
          name='password'
          type='password'
          placeholder='password'
        />
        {errors.password && <p className='error-text'>{errors.password}</p>}
        {firebaseError && <p className='error-text'>{firebaseError}</p>}

        <div className='mt7'>
          <button
            type='submit'
            className='button'
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'grey' : 'orange' }}
          >
            submit
          </button>
          <button
            type='button'
            className='button'
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
