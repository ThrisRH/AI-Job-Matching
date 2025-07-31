const router = require("express").Router();
const jobController = require("../controllers/job.controller");
const { verifyToken } = require("../middleware/auth");
const { checkRecruiter } = require("../middleware/checkRecruiter");

router.post("/create", verifyToken, checkRecruiter, jobController.createJob);

module.exports = router;
