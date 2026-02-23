

const jwt = require("jsonwebtoken");

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECERT); 
    req.doctorId = decoded.id;

    next();
  } catch (error) {
    console.error("❌ Doctor Auth Error:", error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token. Login again.' });
  }
};

exports.authDoctor = authDoctor;