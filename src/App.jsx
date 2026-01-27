import { Routes, Route, Navigate } from "react-router-dom";

/* -------- PUBLIC -------- */
import PublicLayout from "./components/common/Matrimony/MatrimonyLayout";
import Home from "./components/common/CommonHome/Home"; // service selector home
import MatrimonyHome from "./components/common/Matrimony/Home";
// import SpiritualHome from "./components/common/Spiritual/Home";
import LoginPage from "./components/common/Matrimony/Login";
import RegisterPage from "./components/common/Matrimony/Register";
import VerifyOtpPage from "./components/common/Matrimony/VerifyOtp";
import ProfilesPage from "./components/common/Matrimony/ProfilesContent";
import ViewProfile from "./components/common/Matrimony/ViewProfile";
import Messages from "./components/common/Matrimony/Messages";
import CreateProfile from "./components/common/Matrimony/CreateProfile";
import MyProfile from "./components/common/Matrimony/MyProfile";

/* -------- DASHBOARD -------- */
import MatrimonialDashboardLayout from "./components/admin/DashboardLayout";
import DashboardHome from "./components/admin/pages/DashboardHome";
import UsersPage from "./components/admin/pages/UsersPage";
import RequestsPage from "./components/admin/pages/RequestsPage";
import PlansPage from "./components/admin/pages/PlansPage";
import PaymentsPage from "./components/admin/pages/PaymentsPage";
import SettingsPage from "./components/admin/pages/SettingsPage";
import EducationHome from "./components/common/Education/Home";
import JobHome from "./components/common/Job/Home";
import TravelHome from "./components/common/Travel/Home";
import TravelSearch from "./components/common/Travel/TravelSearch";
import TravelDetails from "./components/common/Travel/Details";
import Booking from "./components/common/Travel/Booking";
import MatrimonyLayout from "./components/common/Matrimony/MatrimonyLayout";
import JobLayout from "./components/common/Job/JobLayout";
import TravelLayout from "./components/common/Travel/TravelLayout";
import EducationLayout from "./components/common/Education/EducationLayout";
import JobsSearch from "./components/common/Job/JobsSearch";
import JobDetails from "./components/common/Job/Details";

import bibleRoutes from "./components/common/Bible/bibleRoutes";
import BibleLayout from "./components/common/Bible/BibleLayout";
import BibleBooks from "./components/common/Bible/pages/BibleBooks";
import BibleChapters from "./components/common/Bible/pages/BibleChapters";
import BibleChapter from "./components/common/Bible/pages/BibleChapter";
import BibleHome from "./components/common/Bible/Home";

function App() {
  return (
    <Routes>
      {/* 🌍 ROOT HOME (SERVICE SELECTOR) */}
      <Route path="/" element={<Home />} />

      {/* 🌍 PUBLIC AUTH */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
      </Route>

      {/* 💍 MATRIMONY SERVICE */}
      <Route element={<MatrimonyLayout />}>
        <Route path="/matrimony" element={<MatrimonyHome />} />
        <Route path="/matrimony/profiles" element={<ProfilesPage />} />
        <Route path="/matrimony/create-profile" element={<CreateProfile />} />
        <Route path="/matrimony/my-profile" element={<MyProfile />} />
        <Route
          path="/matrimony/profiles/:profileId/view"
          element={<ViewProfile />}
        />
        <Route path="/matrimony/messages/:userId" element={<Messages />} />
      </Route>

      <Route element={<EducationLayout />}>
        <Route path="/education" element={<EducationHome />} />
      </Route>

      <Route element={<JobLayout />}>
        <Route path="/jobs" element={<JobHome />} />
        <Route path="/jobs/search" element={<JobsSearch />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Route>

      <Route element={<TravelLayout />}>
        <Route path="/travel" element={<TravelHome />} />
        <Route path="/travel/search" element={<TravelSearch />} />
        <Route path="/travel/details/:id" element={<TravelDetails />} />
        <Route path="/travel/booking/:id" element={<Booking />} />
      </Route>

      <Route element={<BibleLayout />}>
        <Route path="/bible" element={<BibleHome />} />
        <Route path="/bible/:book" element={<BibleChapters />} />
        <Route path="/bible/:book/:chapter" element={<BibleChapter />} />
      </Route>

      {/* 🔐 DASHBOARD (COMMON FOR ALL SERVICES) */}
      <Route path="/dashboard" element={<MatrimonialDashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="plans" element={<PlansPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* ❌ FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
