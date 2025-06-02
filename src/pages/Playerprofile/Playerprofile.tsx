import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Website_Background from "../spline/website";
// Component Imports
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Athlete } from "./Types";
import LoadingSpinner from "./LoadingSpinner";
import ErrorSection from "./ErrorSection";
import HeroSection from "./HeroSection";
import TabsSection from "./TabsSection";

const PlayerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('hello')
    axios
      .get(`http://localhost:5000/athletes/${id}`)
      .then((res) => {
        setAthlete(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch(() => {
        setError("Athlete not found");
        setLoading(false);
      });
      
      console.log(athlete);
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error || !athlete) return <ErrorSection error={error} />;

  return (
    <>
      <div className="fixed inset-0 z-0 ">
       <Website_Background></Website_Background>
      </div>
      <div className=" overflow-hidden">
        <TabsSection athlete={athlete} />
      </div>
    </>
  );
};

export default PlayerProfile;
