import { type Url, type InsertUrl, type Click, type InsertClick, type AnalyticsData, type ShortenedUrlResponse } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // URL operations
  createUrl(url: InsertUrl, shortCode: string): Promise<ShortenedUrlResponse>;
  getUrlByShortCode(shortCode: string): Promise<Url | undefined>;
  getUrlById(id: string): Promise<Url | undefined>;
  checkAliasAvailability(alias: string): Promise<boolean>;
  incrementClickCount(urlId: string): Promise<void>;
  getAllUrls(): Promise<Url[]>;
  
  // Click tracking
  recordClick(click: InsertClick): Promise<Click>;
  
  // Analytics
  getAnalytics(): Promise<AnalyticsData>;
}

export class MemStorage implements IStorage {
  private urls: Map<string, Url>;
  private urlsByShortCode: Map<string, string>; // shortCode -> urlId
  private clicks: Map<string, Click>;

  constructor() {
    this.urls = new Map();
    this.urlsByShortCode = new Map();
    this.clicks = new Map();
  }

  async createUrl(insertUrl: InsertUrl, shortCode: string): Promise<ShortenedUrlResponse> {
    const id = randomUUID();
    const url: Url = {
      ...insertUrl,
      id,
      shortCode,
      customAlias: insertUrl.customAlias || null,
      clickCount: 0,
      isActive: true,
      createdAt: new Date(),
    };
    
    this.urls.set(id, url);
    this.urlsByShortCode.set(url.shortCode, id);
    
    if (url.customAlias) {
      this.urlsByShortCode.set(url.customAlias, id);
    }
    
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
    const urlId = this.urlsByShortCode.get(shortCode);
    if (!urlId) return undefined;
    return this.urls.get(urlId);
  }

  async getUrlById(id: string): Promise<Url | undefined> {
    return this.urls.get(id);
  }

  async checkAliasAvailability(alias: string): Promise<boolean> {
    return !this.urlsByShortCode.has(alias);
  }

  async incrementClickCount(urlId: string): Promise<void> {
    const url = this.urls.get(urlId);
    if (url) {
      const updatedUrl = { ...url, clickCount: url.clickCount + 1 };
      this.urls.set(urlId, updatedUrl);
    }
  }

  async getAllUrls(): Promise<Url[]> {
    return Array.from(this.urls.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async recordClick(insertClick: InsertClick): Promise<Click> {
    const id = randomUUID();
    const click: Click = {
      ...insertClick,
      id,
      userAgent: insertClick.userAgent || null,
      ipAddress: insertClick.ipAddress || null,
      timestamp: new Date(),
    };
    
    this.clicks.set(id, click);
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

export const storage = new MemStorage();
