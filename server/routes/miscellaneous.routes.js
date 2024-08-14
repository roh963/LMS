import { Router } from "express";
const router = Router();

import {contactUs, stats} from '../contoller/miscellaneous.controller.js';
import {isLoggedIn,  authorizeRoles} from '../middlewares/auth.middlware.js'

router.post("/contact", contactUs);
router.get("/admin/stats/users", isLoggedIn,  authorizeRoles("ADMIN"), stats);

export default router;