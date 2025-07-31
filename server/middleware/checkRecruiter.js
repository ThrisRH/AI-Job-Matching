exports.checkRecruiter = (req, res, next) => {
  if (req.user.role !== "RC") {
    return res.status(403).json({
      message: "Chỉ người dùng có vai trò Recruiter mới được truy cập.",
    });
  }
  next();
};
