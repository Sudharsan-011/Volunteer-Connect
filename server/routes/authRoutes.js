import express from "express";

// const express = require("express");
import {
  registerOrganization,
  loginOrganization,
} from "../controllers/authController.js";

const router = express.Router();

// Route for organization registration
router.post("/register", registerOrganization);

// Route for organization login
router.post("/login", loginOrganization);

export default router;
