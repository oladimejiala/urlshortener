import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Redirect from "@/pages/redirect";
import NotFound from "@/pages/not-found";
import Pricing from "@/pages/pricing";
import ApiPage from "@/pages/api";
import React, { Suspense } from "react";
import UserMenu from "@/components/user-menu";
const AuthPage = React.lazy(() => import("@/pages/auth"));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/r/:shortCode" element={<Redirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <UserMenu />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
