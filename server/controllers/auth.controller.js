const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Lấy thông tin tài khoản
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    res.status(200).json({ message: "Người dùng hợp lệ", user: user });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Đăng ký
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({
        message: `Email của bạn đã tồn tại trong hệ thống. Vui lòng đăng nhập hoặc tạo bằng email khác.`,
      });
    }
    const validRoles = ["JS", "RC"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: `${role} là role không hợp lệ!` });
    }

    const newUser = await User.create({
      email: email,
      full_name: name,
      password: hashedPassword,
      role: role || "JS",
    });

    return res
      .status(200)
      .json({ message: "Tạo tài khoản thành công!", data: newUser });
  } catch (error) {
    res.status(400).json({ message: `Đã xảy ra lỗi: ${error.message}` });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: `Tài khoản không tồn tại trong hệ thống!`,
      });
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isMatchPassword) {
      return res.status(400).json({ message: "Sai mật khẩu!" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: `Đăng nhập thành công! Xin chào ${existingUser.full_name}`,
      token: token,
      user: {
        _id: existingUser._id,
        full_name: existingUser.full_name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: `Đã xảy ra lỗi: ${error.message}` });
  }
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword?.trim() || !newPassword?.trim()) {
    return res.status(400).json({ message: "Không được để trống thông tin!" });
  }
  const userId = req.user.userId;

  try {
    const user = await User.findById({ _id: userId });

    if (!user)
      return res.status(400).json({ message: "Người dùng không tồn tại!" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Mật khẩu cũ không đúng!" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error: error.message });
  }
};
