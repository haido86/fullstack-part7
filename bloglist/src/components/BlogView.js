import { Link } from '@mui/material';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

const BlogView = ({ handleLikesBlog }) => {
  const blogId = useParams().id;
  const blogs = useSelector((state) => state.blogs);

  const blog = blogs.find((user) => user.id === blogId);

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
      {blog.comments.map((comment) => {
        return <li key={comment._id}>{comment.title}</li>;
      })}
    </>
  );
};

export default BlogView;
