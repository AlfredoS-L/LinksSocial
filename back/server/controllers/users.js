import User from "../models/User.js";

// READ details of a single user
export const getUser = async (req, res) => {
  try {
    // get user ID from req params
    const { id } = req.params;
    // get the user from the database by their ID
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// get the friends of a user
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // using promise all to asynchonously find all the
    // friends' details based on thei ids in the user's friend array
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    // formatting friends info to only include necessary fields
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE friends for a user
export const addRemoveFriend = async (req, res) => {
  try {
    // get user and friend id from reqparams
    const { id, friendId } = req.params;
    // get both user and friend from the database 
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // check if the frind id is already in the user's friend array
    if (user.friends.includes(friendId)) {
      // if so remove both user and friend from eachother
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // if not, add eachother to both of their friend arrays
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    // save and update the user and friend in the database
    await user.save();
    await friend.save();

    // get the updated friends list for the user
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    // format friend information
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};