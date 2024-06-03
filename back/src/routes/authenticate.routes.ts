import { Router } from "express";
import { authenticate } from "../controllers/authenticate.controller.ts";
import { authMiddleware } from "../middlewares/auth-middleware.ts";
const router: Router = Router();

router.post("/authenticate", authMiddleware, authenticate)

export default router