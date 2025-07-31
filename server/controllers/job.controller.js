const Job = require("../models/Job");
const jobService = require("../services/job.service");

// Tạo công việc mới
exports.createJob = async (req, res) => {
  try {
    const jobData = jobService.buildJobData(req.body, req.user.userId);

    // Kiểm tra dữ liệu công việc
    jobService.validateJobData(jobData);

    // Tạo công việc mới
    const newJob = await Job.create(jobData);

    res
      .status(201)
      .json({ message: "Công việc đã được tạo thành công!", job: newJob });
  } catch (error) {
    res.status(400).json({ message: `Đã xảy ra lỗi: ${error.message}` });
  }
};
