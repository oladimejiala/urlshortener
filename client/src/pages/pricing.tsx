import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Zap, Shield, BarChart3, Link } from "lucide-react";

export default function Pricing() {
  return (
    <div className="font-inter bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link className="text-blue-500 text-2xl mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Url Shortener</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</a>
              <a href="#analytics" className="text-gray-600 hover:text-gray-900 font-medium">Analytics</a>
              <a href="/pricing" className="text-blue-500 hover:text-blue-600 font-medium">Pricing</a>
              <a href="/api" className="text-gray-600 hover:text-gray-900 font-medium">API</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 mb-8">Choose the plan that works best for you</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Free Plan */}
          <Card className="border-2 border-gray-200 rounded-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Free</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
              <p className="text-gray-600">Forever free</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Unlimited URL shortening</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Custom aliases</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">QR code generation</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Basic analytics</span>
              </div>
              <div className="flex items-center">
                <X className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-gray-500">Includes ads</span>
              </div>
              <div className="flex items-center">
                <X className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-gray-500">Standard support</span>
              </div>
              <Button className="w-full mt-6 bg-gray-500 hover:bg-gray-600 text-white" data-testid="button-free-plan">
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-blue-500 rounded-2xl shadow-lg relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
            </div>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Premium</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mb-2">$9</div>
              <p className="text-gray-600">per month</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Everything in Free</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700">Ad-free experience</span>
              </div>
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700">Advanced analytics & insights</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700">Custom domains</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">API access</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Priority support</span>
              </div>
              <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white" data-testid="button-premium-plan">
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I use TiinyURL for free forever?</h4>
              <p className="text-gray-600 text-sm">Yes! Our free plan includes unlimited URL shortening with basic features. You'll see ads to help support the service.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What happens to my links if I cancel Premium?</h4>
              <p className="text-gray-600 text-sm">Your links will continue to work! You'll just lose access to premium features like custom domains and advanced analytics.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer annual discounts?</h4>
              <p className="text-gray-600 text-sm">Yes! Contact our support team for information about annual pricing and enterprise plans.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a limit on the number of URLs?</h4>
              <p className="text-gray-600 text-sm">No limits on either plan! Create as many short URLs as you need for your projects.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Link className="text-blue-500 text-xl mr-2" />
                <span className="font-bold text-gray-900">TiinyURL</span>
              </div>
              <p className="text-gray-600 text-sm">The simple, fast, and reliable URL shortener.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/" className="hover:text-gray-900">Features</a></li>
                <li><a href="/pricing" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="/api" className="hover:text-gray-900">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/help" className="hover:text-gray-900">Help Center</a></li>
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
            <p className="text-gray-500 text-sm">&copy; 2025 TiinyURL. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}