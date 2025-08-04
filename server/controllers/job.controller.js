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

// Các phương thức GET
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error.message}` });
  }
};

exports.getJobByQuery = async (req, res) => {
  try {
    const { experienceLevel, jobType } = req.query;
    let filter = {};

    if (experienceLevel) {
      filter.experienceLevel = { $in: experienceLevel.split(",") };
    }

    if (jobType) {
      filter.jobType = { $in: jobType.split(",") };
    }

    const jobs = await Job.find(filter);
    res.status(200).json({ message: "Danh sách công việc", jobs });
  } catch (error) {
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error.message}` });
  }
};
