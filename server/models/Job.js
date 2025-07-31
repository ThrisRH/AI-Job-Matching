const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    // THÔNG TIN CƠ BẢN
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    benefits: { type: String, required: true },
    category: { type: String, required: true },
    skillTags: [{ type: String }],
    jdFileUrl: { type: String },

    // LOẠI CÔNG VIỆC & ĐỊA ĐIỂM
    jobType: { type: String, required: true, enum: ["Full-time", "Part-time"] },
    locationType: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid"],
      default: "On-site",
    },
    location: { type: String, required: true },
    workingHours: { type: String },

    // MỨC ĐỘ KINH NGHIỆM
    experienceLevel: {
      type: String,
      required: true,
      enum: [
        "Intern",
        "Fresher",
        "Junior",
        "Mid-level",
        "Senior",
        "Lead",
        "Manager",
        "Principal",
        "Director",
      ],
    },
    levelScore: { type: Number, default: 0 }, // 0 = intern, 1 = fresher,...

    // LƯƠNG & SỐ LƯỢNG
    minSalary: { type: Number },
    maxSalary: { type: Number },
    slot: { type: Number, required: true, default: 1 },

    // TRẠNG THÁI & HẠN NỘP
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Open", "Closed", "Draft"],
      default: "Open",
    },

    // THỐNG KÊ
    views: { type: Number, default: 0 },
    appliedCount: { type: Number, default: 0 },

    // LIÊN KẾT NGƯỜI ĐĂNG
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
