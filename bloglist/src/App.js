import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material';

import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import './App.css';
import Togglable from './components/Togglable';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  // eliminateBlog,
  initializeBlogs,
  setBlogs,
  updateBlogByLikes,
} from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import User from './components/User';
import { Link, Route, Routes } from 'react-router-dom';
import BlogView from './components/BlogView';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogs = useSelector((state) => state.blogs);
  console.log('state.blogs', blogs);
  const users = useSelector((state) => state.users);
  console.log('state.users', users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initializeUsers());
    }
  }, [blogs, dispatch]);

  const blogsForSort = [...blogs];

  const sortedBlogByLikes = blogsForSort.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);

      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5000));
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    dispatch(setBlogs([]));
  };
  const handleLikesBlog = (blog) => {
    dispatch(updateBlogByLikes(blog));
  };

  // const handleRemoveBlog = (blog) => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author} `)) {
  //     dispatch(eliminateBlog(blog.id));
  //   }
  // };

  const Menu = () => {
    const padding = {
      paddingRight: 10,
    };
    return (
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <span style={padding}>
          {user.username} logged in{' '}
          <button onClick={handleLogOut}>Log out</button>
        </span>
      </div>
    );
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2> Log in to application </h2>
        <Togglable buttonLabel="Login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => {
              setUsername(target.value);
            }}
            password={password}
            handlePasswordChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <Menu />

      <h2>blog app</h2>
      <br />

      <Routes>
        <Route path="/users/:id" element={<User />} />

        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="create new blog">
                <BlogForm user={user} />
              </Togglable>
              <br />
              <div>
                {/* {sortedBlogByLikes.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    handleLikesBlog={handleLikesBlog}
                    handleRemoveBlog={handleRemoveBlog}
                  />
                ))} */}
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      {sortedBlogByLikes.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <br />
            </>
          }
        />
        <Route
          path="/blogs/:id"
          element={<BlogView handleLikesBlog={handleLikesBlog} />}
        />
        <Route
          path="/users"
          element={
            <>
              <h2>Users</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>blogs created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Link to={`/users/${user.id}`}>{user.username}</Link>
                        </TableCell>

                        <TableCell>{user.blogs.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          }
        />
      </Routes>

      <User />
    </div>
  );
};

export default App;
