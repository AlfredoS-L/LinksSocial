import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE a new user post
export const createPost = async (req, res) => {
  try {
    // geting userId, desc, and picture path from request body
    const { userId, description, picturePath } = req.body;
    // find which user is creating a post by their userId
    const user = await User.findById(userId);

    // create new post with user and post details
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save(); // save new post to database

    // retrieving all posts and returning to the client
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// READ all posts for the user's feed
export const getFeedPosts = async (req, res) => {
  try {
    // fetch all the posts from the database 
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// gets posts from a specific user
export const getUserPosts = async (req, res) => {
  try {
    // get the userId from the request paramaters
    const { userId } = req.params;
    // fetch posts that match the userId in the database
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE the like count on a post
export const likePost = async (req, res) => {
  try {
    // get postId from reqparams
    const { id } = req.params;
    // get user id from reqbody, this is the person liking the post
    const { userId } = req.body;
    // find the post by its ID 
    const post = await Post.findById(id);

    // check if the post is already liked by the user
    const isLiked = post.likes.get(userId);

    // if its liked remove like, if not liked add like
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    //Update the post in the database with the new likes
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true } // return updated post
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};