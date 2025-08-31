import "dotenv/config";
import { db } from "./database";

async function testConnection() {
  try {
    // Try a simple query
    const result = await db.execute("SELECT 1 AS test");
    console.log("Database connection successful:", result);
    process.exit(0);
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

testConnection();
