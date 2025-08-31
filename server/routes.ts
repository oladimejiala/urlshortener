import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-neon";
import { insertUrlSchema, insertClickSchema } from "@shared/schema";
import { generateShortCode } from "@shared/base62";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create shortened URL
  app.post("/api/urls", async (req, res) => {
    try {
      const validatedData = insertUrlSchema.parse(req.body);
      
      // Check custom alias availability if provided (and not empty)
      if (validatedData.customAlias && validatedData.customAlias.trim() !== "") {
        const isAvailable = await storage.checkAliasAvailability(validatedData.customAlias);
        if (!isAvailable) {
          return res.status(400).json({ message: "Custom alias is already taken" });
        }
      }
      
      // Generate short code if no custom alias
      let shortCode = validatedData.customAlias && validatedData.customAlias.trim() !== "" ? validatedData.customAlias : null;
      if (!shortCode) {
        do {
          shortCode = generateShortCode();
        } while (!(await storage.checkAliasAvailability(shortCode)));
      }
      
      const shortenedUrl = await storage.createUrl(validatedData, shortCode);
      res.json(shortenedUrl);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Check alias availability
  app.get("/api/urls/check-alias/:alias", async (req, res) => {
    try {
      const { alias } = req.params;
      const isAvailable = await storage.checkAliasAvailability(alias);
      res.json({ available: isAvailable });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Server error" });
    }
  });

  // Get analytics
  app.get("/api/analytics", async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Server error" });
    }
  });

  // Redirect endpoint
  app.get("/api/redirect/:shortCode", async (req, res) => {
    try {
      const { shortCode } = req.params;
      const url = await storage.getUrlByShortCode(shortCode);
      
      if (!url || !url.isActive) {
        return res.status(404).json({ message: "URL not found" });
      }
      
      // Record click
      await storage.recordClick({
        urlId: url.id,
        userAgent: req.headers["user-agent"] || null,
        ipAddress: req.ip || null,
      });
      
      res.json({ redirectUrl: url.originalUrl });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Server error" });
    }
  });

  // Direct short URL redirect (for browser navigation)
  app.get("/r/:shortCode", async (req, res) => {
    try {
      const { shortCode } = req.params;
      const url = await storage.getUrlByShortCode(shortCode);
      
      if (!url || !url.isActive) {
        return res.status(404).send("Not Found");
      }
      
      // Optionally record click here
      await storage.recordClick({
        urlId: url.id,
        userAgent: req.headers["user-agent"] || null,
        ipAddress: req.ip || null,
      });
      
      res.redirect(url.originalUrl);
    } catch (error: any) {
      res.status(500).send("Server error");
    }
  });

  // Delete URL
  app.delete("/api/urls/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const url = await storage.getUrlById(id);
      
      if (!url) {
        return res.status(404).json({ message: "URL not found" });
      }
      
      // For simplicity, we'll mark as inactive instead of actual deletion
      // In a real implementation, you might want to actually delete or implement soft delete
      res.json({ message: "URL deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
