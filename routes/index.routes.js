const router = require("express").Router();
const authRoutes = require("./auth.routes");
const fileUploader = require("../config/cloudinary.config");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

router.use("/auth", authRoutes);

module.exports = router;
