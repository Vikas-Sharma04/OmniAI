import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlogTitle, resumeReview } from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";

const aiRouter = express.Router();

aiRouter.post('/generate-article',auth, generateArticle)
aiRouter.post('/generate-blog-title',auth, generateBlogTitle)
aiRouter.post('/resume-review',upload.single('resume'),auth, resumeReview)

export default aiRouter;