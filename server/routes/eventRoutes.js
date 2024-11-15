import express from "express";
import {
  createEvent,
  getOrganizationEvents,
  getAllEvents,
} from "../controllers/eventController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware for authentication

const router = express.Router();

// Route to create a new event
router.post("/create", authMiddleware, createEvent);

// Route to get all events for a specific organization
router.get("/organization-events", authMiddleware, getOrganizationEvents);

// Route to get all events
router.get("/all-events", getAllEvents);

export default router;
