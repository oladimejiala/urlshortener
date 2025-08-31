import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage-neon";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Direct short URL redirect for /:shortCode
  app.get("/:shortCode", async (req, res) => {
    const { shortCode } = req.params;
    // Ignore requests for static files or known frontend routes
    if (["api", "pricing", "contact", "help", "status", "privacy", "terms", "security"].includes(shortCode)) {
      console.log(`[REDIRECT] Ignored reserved route: ${shortCode}`);
      return res.status(404).send("Not Found");
    }
    console.log(`[REDIRECT] Looking up shortCode: ${shortCode}`);
    const url = await storage.getUrlByShortCode(shortCode);
    console.log(`[REDIRECT] Lookup result for ${shortCode}:`, url);
    if (!url || !url.isActive) {
      console.log(`[REDIRECT] Not found or inactive: ${shortCode}`);
      return res.status(404).send("Not Found");
    }
    await storage.recordClick({
      urlId: url.id,
      userAgent: req.headers["user-agent"] || null,
      ipAddress: req.ip || null,
    });
    console.log(`[REDIRECT] Redirecting to: ${url.originalUrl}`);
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

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
