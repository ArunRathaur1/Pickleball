import React, { useEffect, useState } from "react";
import FilterSummary from "./FilterSummary";
import ContinentSelector from "./Continent";
import TournamentFiltersCombined from "./CombinedFilters";
import { set } from "date-fns";

interface FilterManagerProps {
  tournaments: any[];
  setFilteredTournaments: (tournaments: any[]) => void;
  view:any;
  setView:any
}

const FilterManager: React.FC<FilterManagerProps> = ({
  tournaments,
  setFilteredTournaments,
  view,
  setView
}) => {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [continentFilter, setContinentFilter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );

  const [tierFilter, setTierFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [dateRange, setDateRange] = useState({
    min: null,
    max: null,
    current: { start: null, end: null },
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // New state for specific date selection
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // List of unique continents, countries, and tiers for dropdown filters
  const [continents, setContinents] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [tiers, setTiers] = useState<number[]>([]);
  const [tier, setTier] = useState<number | null>(null);

  // Initialize filter data from tournaments
  useEffect(() => {
    if (tournaments.length > 0) {
      // Extract unique values for filter dropdowns
      setContinents([...new Set(tournaments.map((t) => t.Continent))]);
      setCountries([...new Set(tournaments.map((t) => t.country))]);
      setTiers(
        [...new Set(tournaments.map((t) => t.Tier))].sort((a, b) => a - b)
      );

      // Find min and max dates for the date slider
      const sortedByStartDate = [...tournaments].sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
      const sortedByEndDate = [...tournaments].sort(
        (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      );

      const minDate = new Date(sortedByStartDate[0].startDate);
      const maxDate = new Date(
        sortedByEndDate[sortedByEndDate.length - 1].endDate
      );

      setDateRange({
        min: minDate,
        max: maxDate,
        current: { start: minDate, end: maxDate },
      });

      // Initialize the date filter
      setDateFilter({
        startDate: formatDate(minDate),
        endDate: formatDate(maxDate),
      });
    }
  }, [tournaments]);

  // Apply filters when any filter changes
  useEffect(() => {
    console.log("tiers", tier);
    const filtered = tournaments.filter((tournament) => {
      // Name search filter
      const nameMatch = tournament.name
        .toLowerCase()
        .includes(search.toLowerCase());

      // Location filter
      const locationMatch = tournament.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());

      // Country filter
      const countryMatch =
        !countryFilter || tournament.country === countryFilter;

      // Original continent filter from dropdown
      const continentMatch =
        !continentFilter || tournament.Continent === continentFilter;

      // Image-based continent selector filter
      const selectedContinentMatch =
        !selectedContinent ||
        tournament.continent === selectedContinent ||
        tournament.country === selectedContinent;
      console.log("Filtering for continent:", selectedContinent);

      // Tier filter (updated)
      const tierMatch = tier === null || tournament.tier === tier;

      // Date range filter
      let dateRangeMatch = true;
      if (dateFilter.startDate && dateFilter.endDate) {
        const tournamentStart = new Date(tournament.startDate);
        const tournamentEnd = new Date(tournament.endDate);
        const filterStart = new Date(dateFilter.startDate);
        const filterEnd = new Date(dateFilter.endDate);

        dateRangeMatch = !(
          tournamentEnd < filterStart || tournamentStart > filterEnd
        );
      }

      // Specific date filter
      let specificDateMatch = true;
      if (selectedDate) {
        const selectedDateObj = new Date(selectedDate);
        const tournamentStart = new Date(tournament.startDate);
        const tournamentEnd = new Date(tournament.endDate);

        specificDateMatch =
          selectedDateObj >= tournamentStart &&
          selectedDateObj <= tournamentEnd;
      }

      // Month and Year filters
      let monthYearMatch = true;
      if (selectedMonth || selectedYear) {
        const tournamentStart = new Date(tournament.startDate);
        const tournamentEnd = new Date(tournament.endDate);
        const dates: Date[] = [];
        let currentDate = new Date(tournamentStart);
        while (currentDate <= tournamentEnd) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        if (selectedMonth && selectedYear) {
          const monthNum = parseInt(selectedMonth);
          const yearNum = parseInt(selectedYear);
          monthYearMatch = dates.some(
            (date) =>
              date.getMonth() + 1 === monthNum && date.getFullYear() === yearNum
          );
        } else if (selectedMonth) {
          const monthNum = parseInt(selectedMonth);
          monthYearMatch = dates.some(
            (date) => date.getMonth() + 1 === monthNum
          );
        } else if (selectedYear) {
          const yearNum = parseInt(selectedYear);
          monthYearMatch = dates.some((date) => date.getFullYear() === yearNum);
        }
      }

      return (
        nameMatch &&
        locationMatch &&
        countryMatch &&
        continentMatch &&
        selectedContinentMatch &&
        tierMatch &&
        dateRangeMatch &&
        specificDateMatch &&
        monthYearMatch
      );
    });

    setFilteredTournaments(filtered);
  }, [
    search,
    locationFilter,
    countryFilter,
    continentFilter,
    selectedContinent,
    tier, // ✅ Updated here
    dateFilter,
    selectedDate,
    selectedMonth,
    selectedYear,
    tournaments,
    setFilteredTournaments,
  ]);


  // Helper function to format dates to YYYY-MM-DD
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // Helper to display dates in a more user-friendly format
  const displayDate = (dateString: string) => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setLocationFilter("");
    setCountryFilter("");
    setContinentFilter("");
    setTierFilter("");
    setSelectedDate(null);
    setSelectedMonth(null);
    setSelectedYear(null);
    setSelectedContinent(null);
    setTier(null);

    // Reset dates to full range
    if (dateRange.min && dateRange.max) {
      setDateFilter({
        startDate: formatDate(dateRange.min),
        endDate: formatDate(dateRange.max),
      });
      setDateRange({
        ...dateRange,
        current: {
          start: dateRange.min,
          end: dateRange.max,
        },
      });
    } else {
      setDateFilter({ startDate: "", endDate: "" });
    }
  };

  // Check if any filter is active
  const hasActiveFilters = () => {
    return (
      search ||
      locationFilter ||
      countryFilter ||
      continentFilter ||
      tierFilter ||
      selectedDate ||
      selectedMonth ||
      selectedYear ||
      selectedContinent ||
      (dateFilter.startDate &&
        dateFilter.endDate &&
        dateRange.min &&
        dateRange.max &&
        (dateFilter.startDate !== formatDate(dateRange.min) ||
          dateFilter.endDate !== formatDate(dateRange.max)))
    );
  };

  return (
    <>
      <div>
        {/* Month and Year Selector Section */}
        <TournamentFiltersCombined
          tournaments={tournaments}
          search={search}
          setSearch={setSearch}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          countryFilter={countryFilter}
          setCountryFilter={setCountryFilter}
          tierFilter={tierFilter}
          setTierFilter={setTierFilter}
          resetFilters={resetFilters}
          countries={countries}
          tier={tier}
          setTier={setTier}
          view={view}
          setView={setView}
        />

        <div style={{ flex: 1, paddingTop: "10px" }}>
          <ContinentSelector
            selectedContinent={selectedContinent}
            setSelectedContinent={setSelectedContinent}
          />
        </div>
      </div>
      {/* Filter Summary Section */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-6">
        <FilterSummary
          search={search}
          locationFilter={locationFilter}
          countryFilter={countryFilter}
          continentFilter={continentFilter}
          tierFilter={tierFilter}
          dateFilter={dateFilter}
          dateRange={dateRange}
          formatDate={formatDate}
          displayDate={displayDate}
          hasActiveFilters={hasActiveFilters}
          showFilters={showFilters}
          selectedDate={selectedDate}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          selectedContinent={selectedContinent}
        />
      </div>
    </>
  );
};

export default FilterManager;
