import express from "express";
import { addAgent } from "../controllers/agentController.js";

const router = express.Router();

router.post("/add-agent", addAgent);

export default router;
