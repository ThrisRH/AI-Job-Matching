const jwt = require("jsonwebtoken");

// Xác thực token
exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Không tìm thấy token!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // tiếp tục đến middleware hoặc controller tiếp theo
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};
