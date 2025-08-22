import { type Url, type InsertUrl, type Click, type InsertClick, type AnalyticsData, type ShortenedUrlResponse } from "@shared/schema";
import { db } from "./database";
import { urls, clicks } from "@shared/schema";
import { eq, desc, count, sql } from "drizzle-orm";

export class NeonStorage {
  async createUrl(insertUrl: InsertUrl, shortCode: string): Promise<ShortenedUrlResponse> {
    const [url] = await db.insert(urls).values({
      originalUrl: insertUrl.originalUrl,
      shortCode,
      customAlias: insertUrl.customAlias || null,
      clickCount: 0,
      isActive: true,
      createdAt: new Date(),
    }).returning();

    return {
      id: url.id,
      shortCode: url.shortCode,
      shortUrl: `urlshortener0.com/${url.customAlias || url.shortCode}`,
      originalUrl: url.originalUrl,
      clickCount: url.clickCount,
      createdAt: url.createdAt.toISOString(),
    };
  }

  async getUrlByShortCode(shortCode: string): Promise<Url | undefined> {
    const [url] = await db.select().from(urls).where(eq(urls.shortCode, shortCode));
    return url;
  }

  async getUrlById(id: string): Promise<Url | undefined> {
    const [url] = await db.select().from(urls).where(eq(urls.id, id));
    return url;
  }

  async checkAliasAvailability(alias: string): Promise<boolean> {
    const [result] = await db.select({ count: count() }).from(urls).where(eq(urls.shortCode, alias));
    return result.count === 0;
  }

  async incrementClickCount(urlId: string): Promise<void> {
    await db.update(urls)
      .set({ clickCount: sql`${urls.clickCount} + 1` })
      .where(eq(urls.id, urlId));
  }

  async getAllUrls(): Promise<Url[]> {
    return await db.select().from(urls).orderBy(desc(urls.createdAt));
  }

  async recordClick(insertClick: InsertClick): Promise<Click> {
    const [click] = await db.insert(clicks).values({
      urlId: insertClick.urlId,
      userAgent: insertClick.userAgent || null,
      ipAddress: insertClick.ipAddress || null,
      timestamp: new Date(),
    }).returning();

    await this.incrementClickCount(insertClick.urlId);
    return click;
  }

  async getAnalytics(): Promise<AnalyticsData> {
    const allUrls = await this.getAllUrls();
    const totalUrls = allUrls.length;
    const totalClicks = allUrls.reduce((sum, url) => sum + url.clickCount, 0);
    const avgCtr = totalUrls > 0 ? (totalClicks / totalUrls) : 0;

    const recentUrls = allUrls.slice(0, 10).map(url => ({
      ...url,
      clickCount: url.clickCount,
    }));

    return {
      totalUrls,
      totalClicks,
      avgCtr: Math.round(avgCtr * 100) / 100,
      recentUrls,
    };
  }
}

export const storage = new NeonStorage();
