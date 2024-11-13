import express from "express";
import Organization from "../models/organization.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Import the middleware

const router = express.Router();

// Apply the `authMiddleware` to protect this route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Find the organization using the `organizationId` from the decoded JWT token
    const organization = await Organization.findOne({
      _id: req.organization.organizationId, // Ensure this matches your database field
    }).select("name email");

    // If no organization is found, return a 404 error
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    // Return the organization details in the response
    res.json({
      name: organization.name,
      email: organization.email,
      organizationId: organization._id, // Ensure the ID is returned if required
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
