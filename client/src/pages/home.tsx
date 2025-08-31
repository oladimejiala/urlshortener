import { useState } from "react";
import { Link as LucideLink } from "lucide-react";
import { Link } from "react-router-dom";
import { UrlShortenerForm } from "@/components/url-shortener-form";
import { ShortenedUrlResult } from "@/components/shortened-url-result";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";
import { type ShortenedUrlResponse } from "@shared/schema";

export default function Home() {
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrlResponse | null>(null);

  const handleUrlShortened = (result: ShortenedUrlResponse) => {
    setShortenedUrl(result);
  };

  return (
    <div className="font-inter bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <LucideLink className="text-blue-500 text-2xl mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">LnkZip</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-blue-500 hover:text-blue-600 font-medium">Home</a>
              <a href="#analytics" className="text-gray-600 hover:text-gray-900 font-medium">Analytics</a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
              <Link to="/api" className="text-gray-600 hover:text-gray-900 font-medium">API</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Ad Banner - Free Tier */}
      <div className="bg-yellow-50 border-b border-yellow-200 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-yellow-800">
            📢 <strong>Advertisement:</strong> Get 50% off premium software tools! 
            <a href="/pricing" className="text-blue-600 hover:text-blue-700 underline ml-2">Upgrade to Premium</a> for an ad-free experience.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Free URL Shortener with Custom Links & QR Codes</h2>
          <p className="text-xl text-gray-600 mb-8"> Shorten your URLs instantly — no sign up required. Create branded links, track clicks, 
    and generate free QR codes with Lnkzip’s powerful custom URL shortener</p>
        </div>

        {/* URL Shortener Form */}
        <UrlShortenerForm onUrlShortened={handleUrlShortened} />

        {/* Shortened URL Result */}
        {shortenedUrl && (
          <ShortenedUrlResult result={shortenedUrl} />
        )}

        {/* Side Ad - Free Tier */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Advertisement</p>
          <div className="bg-blue-500 text-white py-4 px-6 rounded">
            <h4 className="font-bold mb-2">Boost Your Business</h4>
            <p className="text-sm">Professional marketing tools starting at $9/month</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <a href="/pricing" className="text-blue-600 hover:text-blue-700">Remove ads with Premium →</a>
          </p>
        </div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <LucideLink className="text-blue-500 text-xl mr-2" />
                <span className="font-bold text-gray-900">LnkZip</span>
              </div>
              <p className="text-gray-600 text-sm">The simple, fast, and reliable URL shortener.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/" className="hover:text-gray-900">Features</a></li>
                <li><a href="/pricing" className="hover:text-gray-900">Pricing</a></li>
                <li><Link to="/api" className="hover:text-gray-900">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="mailto:amtechbenin+support@gmail.com" className="hover:text-gray-900">Help Center</a></li>
                <li><a href="/contact" className="hover:text-gray-900">Contact</a></li>
                <li><a href="/status" className="hover:text-gray-900">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/privacy" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="/terms" className="hover:text-gray-900">Terms</a></li>
                <li><a href="/security" className="hover:text-gray-900">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center">
            <p className="text-gray-500 text-sm">&copy; 2025 LnkZip - Url Shortener. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
