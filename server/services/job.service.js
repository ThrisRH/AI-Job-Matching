exports.buildJobData = (body, userId) => {
  switch (body.experienceLevel) {
    case "Intern":
      body.levelScore = 0;
      break;
    case "Fresher":
      body.levelScore = 1;
      break;
    case "Junior":
      body.levelScore = 2;
      break;
    case "Mid-level":
      body.levelScore = 3;
      break;
    case "Senior":
      body.levelScore = 4;
      break;
    case "Lead":
      body.levelScore = 5;
      break;
    case "Manager":
      body.levelScore = 6;
      break;
    case "Principal":
      body.levelScore = 7;
      break;
    case "Director":
      body.levelScore = 8;
      break;
    default:
      throw new Error("Mức kinh nghiệm không hợp lệ.");
  }
  return {
    title: body.title,
    description: body.description,
    requirements: body.requirements,
    benefits: body.benefits,
    skillTags: body.skillTags,
    jdFileUrl: body.jdFileUrl,
    jobType: body.jobType,
    locationType: body.locationType,
    location: body.location,
    workingHours: body.workingHours,
    experienceLevel: body.experienceLevel,
    levelScore: body.levelScore || 0,
    minSalary: body.minSalary || 0,
    maxSalary: body.maxSalary || 0,
    slot: body.slot || 1,
    deadline: new Date(body.deadline),
    recruiter: userId,
    category: body.category,
  };
};

exports.validateJobData = (jobData) => {
  const requiredFields = ["title", "description", "requirements", "benefits"];
  const validTypes = ["Full-time", "Part-time"];
  const validLocations = ["Remote", "On-site", "Hybrid"];
  const validLevels = [
    "Intern",
    "Fresher",
    "Junior",
    "Mid-level",
    "Senior",
    "Lead",
    "Manager",
    "Principal",
    "Director",
  ];

  for (let field of requiredFields) {
    if (!jobData[field] || jobData[field].trim() === "") {
      throw new Error(`Trường "${field}" là bắt buộc!`);
    }
  }

  if (new Date(jobData.deadline) < new Date()) {
    throw new Error("Hạn nộp không được trong quá khứ.");
  }

  if (jobData.minSalary < 0 || jobData.maxSalary < 0) {
    throw new Error("Mức lương không được âm.");
  }

  if (jobData.minSalary > jobData.maxSalary) {
    throw new Error("Lương tối thiểu không được lớn hơn tối đa.");
  }

  if (!Array.isArray(jobData.skillTags) || jobData.skillTags.length === 0) {
    throw new Error("Cần ít nhất 1 kỹ năng yêu cầu!");
  }

  if (!validTypes.includes(jobData.jobType)) {
    throw new Error("Loại hình công việc chưa phù hợp.");
  }

  if (!validLocations.includes(jobData.locationType)) {
    throw new Error("Hình thức làm việc chưa phù hợp.");
  }

  if (!validLevels.includes(jobData.experienceLevel)) {
    throw new Error("Mức kinh nghiệm không hợp lệ.");
  }
};
