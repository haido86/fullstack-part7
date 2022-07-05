import { Link } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { createComment, getComments } from '../reducers/blogReducer';

const BlogView = ({ handleLikesBlog }) => {
  const blogId = useParams().id;
  const blogs = useSelector((state) => state.blogs);

  const blog = blogs.find((user) => user.id === blogId);
  const comments = useSelector((state) => state.comments);

  const dispatch = useDispatch();
  useEffect(() => {
    if (blog) {
      dispatch(getComments(blogId));
    }
  }, [blog, dispatch]);

  const addComment = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    event.target.title.value = '';
    dispatch(createComment({ title }, blog.id));
  };

  if (!blog) {
    return null;
  }

  return (
    <>
      <h1> {blog.title}</h1>
      <Link>{blog.url}</Link>
      <div>
        {blog.likes} likes
        <button id="like-button" onClick={() => handleLikesBlog(blog)}>
          like
        </button>
      </div>
      added by {blog.user.username}
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <div>
          <input name="title" placeholder="write here comment" />
          <button id="submit-button" type="submit">
            add comment
          </button>
        </div>
      </form>
      <ul>
        {comments.map((comment) => {
          return <li key={comment.title}>{comment.title}</li>;
        })}
      </ul>
    </>
  );
};

export default BlogView;
