import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CrmLayout } from "@/components/CrmLayout";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import Leads from "./pages/Leads";
import Agenda from "./pages/Agenda";
import Financeiro from "./pages/Financeiro";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppAdmin = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/landing" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <CrmLayout>
                  <Dashboard />
                </CrmLayout>
              }
            />
            <Route
              path="/kanban"
              element={
                <CrmLayout>
                  <Kanban />
                </CrmLayout>
              }
            />
            <Route
              path="/leads"
              element={
                <CrmLayout>
                  <Leads />
                </CrmLayout>
              }
            />
            <Route
              path="/agenda"
              element={
                <CrmLayout>
                  <Agenda />
                </CrmLayout>
              }
            />
            <Route
              path="/financeiro"
              element={
                <CrmLayout>
                  <Financeiro />
                </CrmLayout>
              }
            />
            <Route
              path="/users"
              element={
                <CrmLayout>
                  <Users />
                </CrmLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default AppAdmin;
