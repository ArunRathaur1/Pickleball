import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LoggedNavbar } from "@/components/layout/loggednavbar";
import { Footer } from "@/components/layout/footer";
import TournamentRequestsPage from "../components/admin/Tournament";
import AnalyticsPage from "../components/admin/Analytics";
import UsersPage from "../components/admin/userpage";
import AddAthlete from "../components/athletes/AddAthlete";
import BlogList from "@/components/blogs/BlogList";
import InstagramNavbar from "@/components/admin/instagram";
import AdminClub from "@/components/admin/admin-club";
import ClubRequestsPage from "@/components/admin/ClubRequestPage";
import Admin_Athelete from "@/components/admin-athelete/Admin_Athelete";
import SyncwithDupr from "@/components/admin/SyncData/SyncwithDupr";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    console.log("adminData:", adminData);

    let isValidAdmin = false;
    try {
      const parsed = JSON.parse(adminData);
      const admin = parsed.admin;
      isValidAdmin = admin && admin._id && admin.email;
    } catch (e) {
      isValidAdmin = false;
    }

    if (!adminData || !isValidAdmin) {
      navigate("/"); // Redirect to login
    }
  }, [navigate]);
  

  return (
    <div className="min-h-screen flex flex-col">
      <LoggedNavbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage tournaments and website content
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge className="bg-pickle text-white">Admin Access</Badge>
            </div>
          </div>

          <Tabs defaultValue="tournaments">
            <TabsList className="mb-8">
              <TabsTrigger value="tournaments">Tournament Requests</TabsTrigger>
              <TabsTrigger value="athlete">Add Athlete</TabsTrigger>
              <TabsTrigger value="clubs">Clubs</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value='instagram'>Instagram</TabsTrigger>
              {/* <TabsTrigger value="clubapproval">Club Approval</TabsTrigger> */}
              <TabsTrigger value="sync-data">Sync Data</TabsTrigger>
            </TabsList>

            <TabsContent value="tournaments">
              <TournamentRequestsPage />
            </TabsContent>

            <TabsContent value="athlete">
              <Admin_Athelete />
            </TabsContent>

            <TabsContent value="blogs">
              <BlogList />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsPage />
            </TabsContent>

            <TabsContent value="users">
              <UsersPage />
            </TabsContent>
            <TabsContent value="clubs">
              <AdminClub />
            </TabsContent>
            <TabsContent value="instagram">
              <InstagramNavbar></InstagramNavbar>
            </TabsContent>

            <TabsContent value="clubapproval">
              <ClubRequestsPage></ClubRequestsPage>
            </TabsContent>
            <TabsContent value="sync-data">
              <SyncwithDupr />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
