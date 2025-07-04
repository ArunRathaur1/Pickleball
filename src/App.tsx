import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "./pages/SginupPage.tsx";
import Tournaments from "./pages/Tournament/Tournaments.tsx";
import TournamentSubmit from "./pages/TournamentSubmit";
import Services from "./pages/Services";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard.jsx";
import NotFound from "./pages/NotFound";
import Athletes from "./pages/Athletes";
import CourtPage from "./pages/CourtPage";
import PlayerProfile from "./pages/Playerprofile/Playerprofile.tsx";
import AdminLogin from "./components/admin/admin-login.js";
import AdminSingup from "./components/admin/admin-signup.js";
import CourtSubmit from "./pages/CourtSubmit.js";
import ContactPage from "./pages/contact/ContactPage.js";
import Blogpage from "./pages/Blogpage.js";
import Clubs from "./pages/Clubs.js";
import Chatbot from "./components/Chatbot";
import Sponser from "./components/sponser/Sponser.js";
import TournamentDetails from "./components/tournaments/tournamentdetails/tournamentDetails.tsx";
import Clubdetails from "./components/userclubs/clubdetails.tsx";
import { BlogDetail } from "./components/blogs/BlogDetail.tsx";
import ClubForm from "./components/admin-club/form.tsx";
import TournamentForm from "./components/tournaments/tournamentform/tournament-form.tsx";
import PlayerDashboard from "./components/PlayerLogin/PlayerDashboard.tsx";
import BrandDashboard from "./components/BrandLogin/Dashboard.tsx";
import AddAthlete from "./components/athletes/AddAthlete.tsx";
import Ranking from "./pages/Ranking/Ranking.tsx";
import PlayerDescription from "./pages/Ranking/PlayerDescription.tsx";


const App = () => {
  return (

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/submit" element={<TournamentSubmit />} />
            <Route path="/courts/submit" element={<CourtSubmit />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/adminblog" element={<Blogpage />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/courts" element={<CourtPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/addclubs" element={<ClubForm />} />
            <Route path="/:id" element={<PlayerProfile />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/tournament/:id" element={<TournamentDetails />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="*" element={<NotFound />} />
            <Route path="adminlogin12345" element={<AdminLogin />} />
            <Route path="adminsignup12345" element={<AdminSingup />} />
            <Route path="/sponsor" element={<Sponser />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/clubdetails/:id" element={<Clubdetails />} />
            <Route path="/addtournament" element={<TournamentForm />} />
            <Route path="/playerdashboard" element={<PlayerDashboard />} />
            <Route path="/branddashboard" element={<BrandDashboard />} />
            <Route path="/update/brand/:id" element={<TournamentForm />} />
            <Route path="/athelete_update/:id" element={<AddAthlete />} />
            <Route path="/player/:duprid" element={<PlayerDescription />} />
          </Routes>
        </BrowserRouter>
  );
};

export default App;
