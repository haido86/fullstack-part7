import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const userId = useParams().id;
  const users = useSelector((state) => state.users);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return null;
  }

  return (
    <>
      <h1> {user.username}</h1>
      <h3>added blogs</h3>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </>
  );
};

export default User;
