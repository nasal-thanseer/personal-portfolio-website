import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";
import { z } from "zod";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Create a test email transporter for development
// In production, you would configure this with real email credentials
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "example@ethereal.email",
    pass: process.env.EMAIL_PASS || "password",
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a real application, you would send an email here
      // For now, we'll just log the data and return a success response
      console.log("Contact form submission:", validatedData);
      
      // Example of sending email (commented out for development)
      /*
      await transporter.sendMail({
        from: `"Portfolio Contact" <${validatedData.email}>`,
        to: "your-email@example.com",
        subject: `Portfolio Contact: ${validatedData.subject}`,
        text: `
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          
          Message:
          ${validatedData.message}
        `,
        html: `
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
        `,
      });
      */
      
      return res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      
      console.error("Error processing contact form:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
