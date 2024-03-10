import jwt from "jsonwebtoken";

// Middle ware verifies if the request has a valid JWT 
export const verifyToken = async (req, res, next) => {
  try {
    // get the token from the Authorization header of the request
    let token = req.header("Authorization");

    // forbidden if their is no token
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      // slice off the Bearer schema to get the actual token
      token = token.slice(7, token.length).trimLeft();
    }

    // verify the token user the secret key and if valid, attach the
    // userpayload to the request object
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    // call next middle ware funciton in the stack
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};