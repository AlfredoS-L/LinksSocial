import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

// define component to display posts, either all or just for a specific user profile
const PostsWidget = ({ userId, isProfile = false }) => {
  // hook that dispatches actions to the redux store
  const dispatch = useDispatch();
  // accesses posts and token from redux store
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  
  // fetch all posts from server
  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // dispatch an action to update the posts state in the redux store
    dispatch(setPosts({ posts: data }));
  };

  // fetch a given users posts from server
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // dispatch an action to update the posts state in the redux store
    dispatch(setPosts({ posts: data }));
  };

  // hook that decides whether to fetch all posts or just user posts
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // render posts using postWidget
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;