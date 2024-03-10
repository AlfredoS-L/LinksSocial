import { createSlice } from "@reduxjs/toolkit";

// initial/default state of auth slice
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// using createSlice function to create a slice 
// of the Redux store named 'auth' with the initial state and reducers
export const authSlice = createSlice({
  name: "auth", // slice name
  initialState, // initial state

  reducers: {
    setMode: (state) => {
      // toggle between light and dark
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      // sets the user and token upon login
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      // clear user and token on log out
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      // update friends list for logged in user
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("no friends found");
      }
    },
    setPosts: (state, action) => {
      // set posts array with new posts array
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      // update a single post by its id
      const updatedPosts = state.posts.map((post) => {
        // if post id matches, return the updated post 
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;