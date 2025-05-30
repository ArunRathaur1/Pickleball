import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Navbar } from "../../layout/navbar";
import { TournamentMap } from "./TournamentMap";
import {
  MapPin,
  Calendar,
  Award,
  Globe,
  User,
  ArrowLeft,
  Clock,
  Users,
  Trophy,
  Mail,
  Phone,
  ExternalLink,
  IndianRupee,
  CalendarDays,
  Building2,
  Target,
  Medal,
  UserCheck,
  Globe2,
} from "lucide-react";

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const fetchTournament = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tournaments/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch tournament (${response.status})`);
        }

        const data = await response.json();
        console.log(data);
        setTournament(data);
      } catch (error) {
        console.error("Error fetching tournament:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Calculate tournament duration in days
  const getDuration = () => {
    if (!tournament) return null;
    const start = new Date(tournament.startDate);
    const end = new Date(tournament.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Status badge style based on tournament status
  const getStatusBadgeStyle = () => {
    if (!tournament) return "";

    switch (tournament.status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTierBadgeStyle = (tier) => {
    switch (tier) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
      default:
        return "bg-gradient-to-r from-purple-400 to-purple-600 text-white";
    }
  };

  const getTierName = (tier) => {
    switch (tier) {
      case 1:
        return "Premier";
      case 2:
        return "Professional";
      case 3:
        return "Amateur";
      default:
        return "Open";
    }
  };

  const getGenderText = (gender) => {
    switch (gender) {
      case "0":
        return "Mixed";
      case "1":
        return "Male";
      case "2":
        return "Female";
      default:
        return "All";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        <span className="text-lg font-semibold mt-4 text-green-700">
          Loading tournament details...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="text-red-600 text-xl font-semibold mb-4">
          Error loading tournament
        </div>
        <p className="text-gray-600">{error}</p>
        <Link
          to="/tournaments"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Tournaments
        </Link>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="text-gray-600 text-xl font-semibold">
          Tournament not found
        </div>
        <Link
          to="/tournaments"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Tournaments
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative w-full h-[60vh] bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${tournament.imageUrl})`,
        }}
      >
        <div className="relative text-center z-10 max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusBadgeStyle()}`}
            >
              {tournament.status.charAt(0).toUpperCase() +
                tournament.status.slice(1)}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
            {tournament.name}
          </h1>
          <div className="flex flex-wrap justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span>
                {tournament.city}, {tournament.state}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>
                {formatShortDate(tournament.startDate)} -{" "}
                {formatShortDate(tournament.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy size={20} />
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getTierBadgeStyle(
                  tournament.tier
                )}`}
              >
                {getTierName(tournament.tier)} Tier
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Prize Money</p>
                  <p className="text-2xl font-bold text-green-600 flex items-center">
                    <IndianRupee size={20} />
                    {tournament.prizeMoney?.toLocaleString("en-IN") || "TBD"}
                  </p>
                </div>
                <Award className="text-green-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Duration</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {getDuration()} Days
                  </p>
                </div>
                <Clock className="text-blue-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Categories</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {tournament.categories?.length || 0}
                  </p>
                </div>
                <Users className="text-purple-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Format</p>
                  <p className="text-xl font-bold text-orange-600">
                    {tournament.format}
                  </p>
                </div>
                <Target className="text-orange-600" size={32} />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Tournament Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tournament Description */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <Globe2 className="text-blue-600" />
                  About Tournament
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {tournament.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="text-gray-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Organizer</p>
                        <p className="font-semibold text-gray-800">
                          {tournament.organizer}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="text-gray-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Venue</p>
                        <p className="font-semibold text-gray-800">
                          {tournament.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe className="text-gray-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-gray-800">
                          {tournament.city}, {tournament.state},{" "}
                          {tournament.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="text-gray-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(tournament.startDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays className="text-gray-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">End Date</p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(tournament.endDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <UserCheck className="text-gray-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">
                          Registration Deadline
                        </p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(tournament.registrationEnd)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories Section */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Medal className="text-yellow-600" />
                  Tournament Categories
                </h2>

                <div className="grid gap-4">
                  {tournament.categories?.map((category, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {category.categoryName}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users size={16} />
                              Max {category.maxPlayer} players
                            </span>
                            <span className="flex items-center gap-1">
                              <User size={16} />
                              {getGenderText(category.gender)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Entry Fee</p>
                          <p className="text-2xl font-bold text-green-600 flex items-center">
                            <IndianRupee size={20} />
                            {category.fee?.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registration Section */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Registration Information
                </h2>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="text-blue-600 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">
                        Registration Deadline
                      </h3>
                      <p className="text-blue-700">
                        {formatDate(tournament.registrationEnd)}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  Registration is currently{" "}
                  <span
                    className={`font-semibold ${
                      tournament.status === "approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {tournament.status === "approved"
                      ? "open"
                      : "not available"}
                  </span>{" "}
                  for this tournament.
                </p>

                {tournament.status === "approved" &&
                  tournament.registrationLink && (
                    <a
                      href={tournament.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors gap-2"
                    >
                      Register Now
                      <ExternalLink size={16} />
                    </a>
                  )}
              </div>
            </div>

            {/* Right Column - Contact & Map */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="text-gray-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Contact Person</p>
                      <p className="font-semibold text-gray-800">
                        {tournament.contactPerson}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <a
                        href={`tel:${tournament.contactNo}`}
                        className="font-semibold text-blue-600 hover:text-blue-800"
                      >
                        {tournament.contactNo}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${tournament.emailId}`}
                        className="font-semibold text-blue-600 hover:text-blue-800"
                      >
                        {tournament.emailId}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Tournament Location
                </h2>
                <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-200">
                  <TournamentMap
                    locationCoords={tournament.locationCoords}
                    tournament={{
                      name: tournament.name,
                      location: tournament.location,
                      country: tournament.country,
                    }}
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-700 font-medium">
                    {tournament.location}
                  </p>
                  <p className="text-gray-500">
                    {tournament.city}, {tournament.state}, {tournament.country}
                  </p>
                </div>
              </div>

              {/* Tournament Stats */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Tournament Details
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Tournament ID</span>
                    <span className="font-mono text-sm text-gray-800">
                      {tournament._id?.slice(-8)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Continent</span>
                    <span className="font-semibold text-gray-800">
                      {tournament.continent}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Created</span>
                    <span className="font-semibold text-gray-800">
                      {new Date(tournament.createdAt).toLocaleDateString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Brand ID</span>
                    <span className="font-mono text-sm text-gray-800">
                      {tournament.brandId?.slice(-8)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center mt-12">
            <Link
              to="/tournaments"
              className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-lg transition-all flex items-center gap-3 text-lg font-semibold"
            >
              <ArrowLeft size={20} />
              Back to Tournaments
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
