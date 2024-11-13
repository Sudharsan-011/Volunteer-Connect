import Organization from "../models/organization.js";
import jwt from "jsonwebtoken";

// Generate JWT with organization details
const generateToken = (organization) => {
  return jwt.sign(
    {
      organizationId: organization._id, // Use organization._id instead of organizationId
      name: organization.name, // Include name in JWT payload for future use
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d", // Set token expiry time (1 day)
    }
  );
};

// Register a new organization
export const registerOrganization = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if organization already exists
    const existingOrganization = await Organization.findOne({ email });
    if (existingOrganization) {
      return res.status(400).json({ message: "Organization already exists" });
    }

    // Create new organization
    const organization = new Organization({ name, email, password });

    await organization.save();

    // Generate token with organization details
    const token = generateToken(organization);

    res.status(201).json({
      message: "Organization registered successfully",
      token, // Return the token
    });
  } catch (error) {
    // Log error to the console for debugging
    console.error("Error during organization registration:", error);

    // Send generic error response to frontend
    res.status(500).json({
      message: "Error registering organization",
      error: error.message,
    });
  }
};

// Login an organization
export const loginOrganization = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if organization exists
    const organization = await Organization.findOne({ email });
    if (!organization) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password (you should ideally hash the password in your model for production)
    const isMatch = await organization.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token with organization details
    const token = generateToken(organization);
    res.status(200).json({
      message: "Logged in successfully",
      token, // Return the token
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
