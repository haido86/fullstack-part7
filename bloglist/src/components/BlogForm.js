import React from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ user }) => {
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';
    dispatch(createBlog({ title, author, url }, user));
  };

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <p>
            title:
            <input name="title" placeholder="write here title" />
          </p>
          <p>
            author:
            <input name="author" placeholder="write here author" />
          </p>
          <p>
            url:
            <input name="url" placeholder="write here url" />
          </p>
        </div>
        <div>
          <button id="submit-button" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
