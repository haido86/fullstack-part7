import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            type="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <br />
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <br />
        <div>
          <Button
            variant="contained"
            size="small"
            id="login-button"
            type="submit"
          >
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
