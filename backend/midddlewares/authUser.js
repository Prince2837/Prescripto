import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized. Login Again',
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECERT); // ✅ Fixed typo
    req.userId = token_decode.id; // ✅ Store it in a safe place

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export { authUser };