import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setComments } from './commentReducer';
import { setNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      return state.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
    removeBlog(state, action) {
      return state.filter((i) => i.id !== action.payload);
    },
  },
});

export const { appendBlog, setBlogs, removeBlog, updateBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(
        appendBlog({
          ...newBlog,
          user: { id: newBlog.user, username: user.username },
        })
      );
      dispatch(setNotification(`Added ${newBlog.title}`, 5000, 'success'));
    } catch (error) {
      dispatch(setNotification(`${error.message}`, 5000));
    }
  };
};
export const updateBlogByLikes = (blog) => {
  return async (dispatch) => {
    try {
      const editBlog = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      });
      dispatch(updateBlog(editBlog));

      console.log('blog', editBlog);
    } catch (error) {
      dispatch(setNotification(`${error.message}`, 5000));
    }
  };
};

export const eliminateBlog = (id) => {
  return async (dispatch) => {
    console.log('id', id);
    await blogService.eliminate(id);
    dispatch(removeBlog(id));
  };
};

export const getComments = (blogId) => {
  return async (dispatch) => {
    const comments = await blogService.getAllComment(blogId);
    dispatch(setComments(comments));
  };
};

export const createComment = (content, blogId) => {
  return async (dispatch) => {
    try {
      const newComment = await blogService.createComment(content, blogId);
      const comments = await blogService.getAllComment(blogId);
      dispatch(setComments(comments));
      dispatch(
        setNotification(`Added comment: ${newComment.title}`, 5000, 'success')
      );
    } catch (error) {
      console.log(error);
      dispatch(setNotification(`${error.message}`, 5000));
    }
  };
};

export default blogSlice.reducer;
