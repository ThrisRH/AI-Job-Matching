const router = require("express").Router();
const jobController = require("../controllers/job.controller");
const { verifyToken } = require("../middleware/auth");
const { checkRecruiter } = require("../middleware/checkRecruiter");

router.get("/search", jobController.getJobByQuery);
router.post("/create", verifyToken, checkRecruiter, jobController.createJob);
router.get("/", jobController.getAllJobs);

module.exports = router;
