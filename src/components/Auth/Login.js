import React from 'react';

function Login(props) {
  const [login, setLogin] = React.useState(true);

  return (
    <div>
      <h2 className='mv3'>{login ? 'Login' : 'Create Account'}</h2>
      <form className='flex' style={{ flexDirection: 'column' }}>
        {!login && (
          <input type='text' placeholder='Your name' autoComplete='off' />
        )}
        <input type='email' placeholder='email' autoComplete='off' />
        <input type='password' placeholder='password' />
        <div className='mt7'>
          <button type='submit' className='button'>
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
