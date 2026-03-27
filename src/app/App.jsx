import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CitizenLogin from "./components/CitizenLogin";
import CitizenRegister from "./components/CitizenRegister";
import CitizenDashboard from "./components/CitizenDashboard";
import RaiseGrievance from "./components/RaiseGrievance";
import ComplaintSuccess from "./components/ComplaintSuccess";
import TrackComplaint from "./components/TrackComplaint";
import FeedbackPage from "./components/FeedbackPage";
import OfficerLogin from "./components/OfficerLogin";
import OfficerDashboard from "./components/OfficerDashboard";
import GrievanceDetails from "./components/GrievanceDetails";
import ResolutionSubmission from "./components/ResolutionSubmission";
import AppellateDashboard from "./components/AppellateDashboard";
import FinalAppealReview from "./components/FinalAppealReview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Citizen Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/citizen/login" element={<CitizenLogin />} />
        <Route path="/citizen/register" element={<CitizenRegister />} />
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
        <Route path="/citizen/raise-grievance" element={<RaiseGrievance />} />
        <Route
          path="/citizen/complaint-success/:id"
          element={<ComplaintSuccess />}
        />
        <Route path="/citizen/track-complaint" element={<TrackComplaint />} />
        <Route path="/citizen/feedback/:id" element={<FeedbackPage />} />

        {/* Officer Pages */}
        <Route path="/officer/login" element={<OfficerLogin />} />
        <Route path="/officer/dashboard" element={<OfficerDashboard />} />
        <Route path="/officer/grievance/:id" element={<GrievanceDetails />} />
        <Route
          path="/officer/resolution/:id"
          element={<ResolutionSubmission />}
        />

        {/* Appellate Authority Pages */}
        <Route path="/appellate/dashboard" element={<AppellateDashboard />} />
        <Route path="/appellate/review/:id" element={<FinalAppealReview />} />
      </Routes>
    </BrowserRouter>
  );
}
