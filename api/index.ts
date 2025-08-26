import express from "express";
import { registerRoutes } from "../server/routes";
import { setupVite, serveStatic, log } from "../server/vite";
import { storage } from "../server/storage-neon";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  // Direct short URL redirect for /:shortCode
  app.get("/:shortCode", async (req, res) => {
    const { shortCode } = req.params;
    if (["api", "pricing", "contact", "help", "status", "privacy", "terms", "security"].includes(shortCode)) {
      return res.status(404).send("Not Found");
    }
    const url = await storage.getUrlByShortCode(shortCode);
    if (!url || !url.isActive) {
      return res.status(404).send("Not Found");
    }
    await storage.recordClick({
      urlId: url.id,
      userAgent: req.headers["user-agent"] || null,
      ipAddress: req.ip || null,
    });
    res.redirect(url.originalUrl);
  });

  // Direct short URL redirect (for browser navigation)
  app.get("/r/:shortCode", async (req, res) => {
    try {
      const { shortCode } = req.params;
      const url = await storage.getUrlByShortCode(shortCode);
      if (!url || !url.isActive) {
        return res.status(404).send("Not Found");
      }
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

  await registerRoutes(app);

  // Vercel will handle serving static files and routing
})();

export default app;
