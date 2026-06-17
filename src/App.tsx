import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Lights from "@/pages/Lights";
import Blinds from "@/pages/Blinds";

import Climate from "@/pages/Climate";
import Scenes from "@/pages/Scenes";
import Alarm from "@/pages/Alarm";
import Energy from "@/pages/Energy";
import Cameras from "@/pages/Cameras";
import Intercom from "@/pages/Intercom";
import Schedules from "@/pages/Schedules";
import Automations from "@/pages/Automations";
import AutomationEdit from "@/pages/AutomationEdit";
import Settings from "@/pages/Settings";
import Rooms from "@/pages/Rooms";
import RoomDetail from "@/pages/RoomDetail";
import NotFound from "@/pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner theme="dark" position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/lights" element={<Lights />} />
            <Route path="/blinds" element={<Blinds />} />
            <Route path="/heating" element={<Navigate to="/climate" replace />} />
            <Route path="/climate" element={<Climate />} />
            <Route path="/scenes" element={<Scenes />} />
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/energy" element={<Energy />} />
            <Route path="/cameras" element={<Cameras />} />
            <Route path="/intercom" element={<Intercom />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/automations/new" element={<AutomationEdit />} />
            <Route path="/automations/:id" element={<AutomationEdit />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
