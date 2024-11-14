import Event from "../models/event.js"; // Import the Event model
// import sendEmailNotification from "../utils/sendEmailNotification.js"; // Import the send email utility

// Controller to create an event
export const createEvent = async (req, res) => {
  const { title, description, location, date, whatsappGroupLink } = req.body;
  const { organizationId } = req.organization; // Extract organizationId from JWT token middleware

  try {
    // Create a new Event document with organizationId and provided details
    const event = new Event({
      title,
      description,
      location,
      date,
      whatsappGroupLink, // Optional field; can be omitted if not provided
      organizationId, // Link event to the organization
    });

    // Save the new event to the database
    await event.save();

    // Send an email notification upon event creation
    // const recipient = "volunteer@example.com"; // Replace with actual dynamic email recipient
    // const subject = `New Event Created: ${event.title}`;
    // const message = `
    //   A new event titled "${event.title}" has been created by your organization.
    //   Event details:
    //   - Description: ${event.description}
    //   - Location: ${event.location}
    //   - Date: ${new Date(event.date).toLocaleDateString()}
    //   - WhatsApp Group Link: ${event.whatsappGroupLink || "Not provided"}
    // `;

    // await sendEmailNotification(recipient, subject, message); // Send the email

    // Send a success response with the created event
    res.status(201).json({
      message: "Event created successfully, and notification sent",
      event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

// Controller to get events for a specific organization
export const getOrganizationEvents = async (req, res) => {
  const { organizationId } = req.organization; // Extract organizationId from JWT token middleware

  try {
    // Query the database for events associated with the organizationId
    const events = await Event.find({ organizationId });

    // If no events are found, return a 404 response
    if (!events.length) {
      return res
        .status(404)
        .json({ message: "No events found for this organization" });
    }

    // Return the found events
    res.status(200).json(events);
  } catch (error) {
    console.error("Error retrieving events:", error);
    res
      .status(500)
      .json({ message: "Error retrieving events", error: error.message });
  }
};
// Controller to get all events
export const getAllEvents = async (req, res) => {
  try {
    // Query the database for all events
    const events = await Event.find();

    // If no events are found, return a 404 response
    if (!events.length) {
      return res.status(404).json({ message: "No events found" });
    }

    // Return all found events
    res.status(200).json(events);
  } catch (error) {
    console.error("Error retrieving all events:", error);
    res
      .status(500)
      .json({ message: "Error retrieving events", error: error.message });
  }
};
