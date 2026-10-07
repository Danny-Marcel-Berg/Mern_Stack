import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { FaSearch, FaFilter, FaHardHat, FaBuilding } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    document.title = "Project Portfolio & Search | Apex Construction";

    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [window.location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "all" ||
      e.target.id === "commercial" ||
      e.target.id === "residential" ||
      e.target.id === "renovation" ||
      e.target.id === "industrial"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (e.target.id === "offer") {
      setSidebarData({
        ...sidebarData,
        offer: e.target.checked,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("offer", sidebarData.offer);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 space-y-2">
        <div className="text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          <FaHardHat /> Project Index & Search
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Construction & Architectural Portfolio
        </h1>
        <p className="text-slate-600 text-sm">
          Filter and explore our commercial, residential, and industrial building projects.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm h-fit space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <FaFilter className="text-amber-500" />
              <h2 className="font-bold text-slate-900 text-base">Filter Projects</h2>
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Search Keyword</label>
              <div className="relative">
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="e.g. Tower, Villa, Brick..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500"
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Construction Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Project Category</label>
              <div className="space-y-2 text-xs text-slate-600">
                {[
                  { id: "all", label: "All Categories" },
                  { id: "commercial", label: "Commercial Buildings" },
                  { id: "residential", label: "Custom Residential" },
                  { id: "renovation", label: "Structural Renovations" },
                  { id: "industrial", label: "Industrial Facilities" },
                ].map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
                    <input
                      type="radio"
                      name="projectType"
                      id={cat.id}
                      checked={sidebarData.type === cat.id}
                      onChange={handleChange}
                      className="accent-amber-500"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Featured Only Checkbox */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  id="offer"
                  checked={sidebarData.offer}
                  onChange={handleChange}
                  className="accent-amber-500 rounded"
                />
                <span>Featured / Highlighted Builds Only</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-extrabold py-3 rounded-xl transition-colors text-xs uppercase tracking-wider"
            >
              Apply Filter
            </button>
          </form>
        </div>

        {/* Search Results */}
        <div className="lg:w-3/4">
          {loading && (
            <p className="text-center py-16 text-slate-500 text-lg font-bold">
              Loading Construction Projects...
            </p>
          )}

          {!loading && listings.length === 0 && (
            <div className="bg-white border border-slate-200 p-12 rounded-2xl text-center space-y-3">
              <FaBuilding className="text-4xl text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No Projects Found</h3>
              <p className="text-slate-500 text-xs">
                Try adjusting your search criteria or choosing a different project category.
              </p>
            </div>
          )}

          {!loading && listings.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
