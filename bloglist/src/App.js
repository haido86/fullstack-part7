import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
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
  eliminateBlog,
  initializeBlogs,
  setBlogs,
  updateBlogByLikes,
} from './reducers/blogReducer';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogs = useSelector((state) => state.blogs);
  console.log('state.blogs', blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user, dispatch]);

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

  const handleRemoveBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} `)) {
      dispatch(eliminateBlog(blog.id));
    }
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
      <h2>blogs</h2>
      <div>
        {user.username} logged in
        <button onClick={handleLogOut}>Log out</button>
      </div>
      <br />
      <Togglable buttonLabel="create new blog">
        <BlogForm user={user} />
      </Togglable>
      <br />
      <div>
        {sortedBlogByLikes.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLikesBlog={handleLikesBlog}
            handleRemoveBlog={handleRemoveBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
