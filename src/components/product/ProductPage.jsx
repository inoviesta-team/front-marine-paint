import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Filter,
  Grid,
  List,
  Search,
  Star,
  X
} from "lucide-react";
import { useEffect, useState } from `react`;

export default function ProductPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Sample product data
  const allProducts = [
    {
      id: 1,
      name: "KokoGuard Extreme",
      category: "Anti-fouling",
      application: ["Hull", "Underwater"],
      rating: 5,
      price: 289.99,
      stock: "In Stock",
      image: "/api/placeholder/500/500",
      description:
        "Premium anti-fouling coating with extreme durability and advanced protection",
      features: [
        "5-year protection",
        "Self-polishing technology",
        "Low VOC formula",
      ],
    },
    {
      id: 2,
      name: "HydroFlow Pro",
      category: "Performance",
      application: ["Hull"],
      rating: 4.8,
      price: 329.99,
      stock: "In Stock",
      image: "/api/placeholder/500/500",
      description:
        "High-performance hull coating that reduces drag and improves vessel efficiency",
      features: ["8% fuel savings", "Ultra-smooth finish", "Easy application"],
    },
    {
      id: 3,
      name: "EcoSeal Marine",
      category: "Eco-friendly",
      application: ["Hull", "Topside"],
      rating: 4.7,
      price: 259.99,
      stock: "In Stock",
      image: "/api/placeholder/500/500",
      description:
        "Environmentally responsible coating with zero harmful biocides",
      features: [
        "IMO 2025 compliant",
        "Biodegradable components",
        "Reef-safe formula",
      ],
    },
    {
      id: 4,
      name: "CorroShield Plus",
      category: "Corrosion Protection",
      application: ["Hull", "Underwater"],
      rating: 4.9,
      price: 349.99,
      stock: "Low Stock",
      image: "/api/placeholder/500/500",
      description:
        "Ultimate corrosion protection for harsh marine environments",
      features: [
        "Salt-spray resistance",
        "Self-healing technology",
        "10-year warranty",
      ],
    },
    {
      id: 5,
      name: "TopCoat Premium",
      category: "Topside",
      application: ["Topside"],
      rating: 4.6,
      price: 219.99,
      stock: "In Stock",
      image: "/api/placeholder/500/500",
      description:
        "Superior topside finish with excellent UV resistance and color retention",
      features: ["High-gloss finish", "UV stabilizers", "Easy maintenance"],
    },
    {
      id: 6,
      name: "DeckGuard Non-Slip",
      category: "Deck Coatings",
      application: ["Deck"],
      rating: 4.8,
      price: 199.99,
      stock: "In Stock",
      image: "/api/placeholder/500/500",
      description:
        "Durable non-slip deck coating with superior grip in wet conditions",
      features: ["Anti-slip texture", "Wear-resistant", "UV protected"],
    },
    {
      id: 7,
      name: "MarineShield Pro",
      category: "Corrosion Protection",
      application: ["Hull", "Underwater"],
      rating: 4.5,
      price: 279.99,
      stock: "In Stock",
      image: "/api/placeholder/500/500",
      description:
        "Professional-grade protection against saltwater corrosion and harsh marine conditions",
      features: ["Saltwater resistant", "Dual-layer protection", "Fast drying"],
    },
    {
      id: 8,
      name: "AquaGloss Elite",
      category: "Topside",
      application: ["Topside"],
      rating: 4.7,
      price: 239.99,
      stock: "In Stock",
      image: "/api/placeholder/500/500",
      description:
        "Premium high-gloss topside finish with exceptional durability",
      features: ["Mirror finish", "Scratch resistant", "Long-lasting color"],
    },
    {
      id: 9,
      name: "BioBlock Lite",
      category: "Anti-fouling",
      application: ["Hull", "Underwater"],
      rating: 4.3,
      price: 179.99,
      stock: "In Stock",
      image: "/api/placeholder/500/500",
      description:
        "Light-duty anti-fouling protection for vessels in moderate growth conditions",
      features: ["3-year protection", "Economical", "Smooth finish"],
    },
    {
      id: 10,
      name: "ThermoShield Heat Resistant",
      category: "Specialty",
      application: ["Engine", "Interior"],
      rating: 4.9,
      price: 399.99,
      stock: "In Stock",
      image: "/api/placeholder/500/500",
      description:
        "Extreme temperature resistant coating for engine compartments and exhaust systems",
      features: [
        "Heat resistant to 600°C",
        "Thermal insulation",
        "Corrosion protection",
      ],
    },
    {
      id: 11,
      name: "InteriorGuard Marine",
      category: "Interior",
      application: ["Interior"],
      rating: 4.4,
      price: 159.99,
      stock: "In Stock",
      image: "/api/placeholder/500/500",
      description:
        "Moisture-resistant interior coating for marine cabins and living spaces",
      features: ["Mold resistant", "Low odor", "Easy clean"],
    },
    {
      id: 12,
      name: "UltraGrip Traction Coat",
      category: "Deck Coatings",
      application: ["Deck"],
      rating: 4.8,
      price: 229.99,
      stock: "Low Stock",
      image: "/api/placeholder/500/500",
      description:
        "Premium non-skid coating with maximum traction for wet environments",
      features: [
        "Superior grip",
        "Customizable texture",
        "High visibility options",
      ],
    },
  ];

  // Filter categories, applications, etc.
  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];
  const applications = [
    ...new Set(allProducts.flatMap((product) => product.application)),
  ];
  const ratings = [5, 4, 3, 2, 1];

  // Filter toggles
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    applications: true,
    ratings: true,
    price: true,
  });

  // Toggle filter sections
  const toggleFilterSection = (section) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle category filter changes
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Handle application filter changes
  const handleApplicationChange = (application) => {
    setSelectedApplications((prev) => {
      if (prev.includes(application)) {
        return prev.filter((item) => item !== application);
      } else {
        return [...prev, application];
      }
    });
  };

  // Handle rating filter changes
  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) => {
      if (prev.includes(rating)) {
        return prev.filter((item) => item !== rating);
      } else {
        return [...prev, rating];
      }
    });
  };

  // Handle price range changes
  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = newValue;
      return newRange;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedApplications([]);
    setSelectedRatings([]);
    setPriceRange([0, 1000]);
    setSearchQuery("");
  };

  // Filter and sort products
  useEffect(() => {
    let results = [...allProducts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply application filter
    if (selectedApplications.length > 0) {
      results = results.filter((product) =>
        product.application.some((app) => selectedApplications.includes(app))
      );
    }

    // Apply rating filter
    if (selectedRatings.length > 0) {
      results = results.filter((product) =>
        selectedRatings.includes(Math.floor(product.rating))
      );
    }

    // Apply price filter
    results = results.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        // Featured is default order from data
        break;
    }

    setFilteredProducts(results);
  }, [
    searchQuery,
    selectedCategories,
    selectedApplications,
    selectedRatings,
    priceRange,
    sortBy,
  ]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

  // Render function for star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < Math.floor(rating)
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile filter overlay */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setShowFilters(false)}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-80 bg-white p-4 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="p-1">
                    <X size={24} />
                  </button>
                </div>

                {/* Filter content - same as desktop but for mobile */}
                <div className="space-y-6">
                  {/* Categories */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      className="flex justify-between items-center w-full py-2 font-medium"
                      onClick={() => toggleFilterSection("categories")}
                    >
                      <span>Categories</span>
                      {expandedFilters.categories ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {expandedFilters.categories && (
                      <div className="mt-2 space-y-2">
                        {categories.map((category) => (
                          <label
                            key={category}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => handleCategoryChange(category)}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span>{category}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Applications */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      className="flex justify-between items-center w-full py-2 font-medium"
                      onClick={() => toggleFilterSection("applications")}
                    >
                      <span>Application Areas</span>
                      {expandedFilters.applications ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {expandedFilters.applications && (
                      <div className="mt-2 space-y-2">
                        {applications.map((application) => (
                          <label
                            key={application}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedApplications.includes(
                                application
                              )}
                              onChange={() =>
                                handleApplicationChange(application)
                              }
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span>{application}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Ratings */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      className="flex justify-between items-center w-full py-2 font-medium"
                      onClick={() => toggleFilterSection("ratings")}
                    >
                      <span>Ratings</span>
                      {expandedFilters.ratings ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {expandedFilters.ratings && (
                      <div className="mt-2 space-y-2">
                        {ratings.map((rating) => (
                          <label
                            key={rating}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedRatings.includes(rating)}
                              onChange={() => handleRatingChange(rating)}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex items-center">
                              {renderStars(rating)}
                              <span className="ml-1">{rating}+ stars</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Range */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      className="flex justify-between items-center w-full py-2 font-medium"
                      onClick={() => toggleFilterSection("price")}
                    >
                      <span>Price Range</span>
                      {expandedFilters.price ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {expandedFilters.price && (
                      <div className="mt-4">
                        <div className="flex justify-between mb-2">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                        <div className="flex gap-4">
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(e, 0)}
                            className="w-full"
                          />
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(e, 1)}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={clearFilters}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-64 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex justify-between items-center w-full py-2 font-medium"
                  onClick={() => toggleFilterSection("categories")}
                >
                  <span>Categories</span>
                  {expandedFilters.categories ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                {expandedFilters.categories && (
                  <div className="mt-2 space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Applications */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex justify-between items-center w-full py-2 font-medium"
                  onClick={() => toggleFilterSection("applications")}
                >
                  <span>Application Areas</span>
                  {expandedFilters.applications ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                {expandedFilters.applications && (
                  <div className="mt-2 space-y-2">
                    {applications.map((application) => (
                      <label
                        key={application}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedApplications.includes(application)}
                          onChange={() => handleApplicationChange(application)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>{application}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Ratings */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex justify-between items-center w-full py-2 font-medium"
                  onClick={() => toggleFilterSection("ratings")}
                >
                  <span>Ratings</span>
                  {expandedFilters.ratings ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                {expandedFilters.ratings && (
                  <div className="mt-2 space-y-2">
                    {ratings.map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => handleRatingChange(rating)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center">
                          {renderStars(rating)}
                          <span className="ml-1">{rating}+ stars</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex justify-between items-center w-full py-2 font-medium"
                  onClick={() => toggleFilterSection("price")}
                >
                  <span>Price Range</span>
                  {expandedFilters.price ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                <div className="grid grid-cols-2 gap-2">
                <input
                    type="number"
                    placeholder="MIN"
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="MIN"
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Search */}
                <div className="relative flex-grow ">
                  <input
                    type="text"
                    placeholder="Search products..."
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

              {/* PRODUCT CARD */}
              {
                [...Array(8)].map((_, i) => (
                    <div key={`product-${i}`} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl border border-gray-100">
                <div className="relative">
                  <img
                    src="https://i.ytimg.com/vi/UhQ0lPInAq4/maxresdefault.jpg"
                    alt="Best Seller 1"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-blue-600 text-white text-sm font-medium px-3 py-1">
                    #1 Top Rated
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-500">
                      <Star size={16} className="fill-yellow-500" />
                      <Star size={16} className="fill-yellow-500" />
                      <Star size={16} className="fill-yellow-500" />
                      <Star size={16} className="fill-yellow-500" />
                      <Star size={16} className="fill-yellow-500" />
                    </div>
                    <span className="text-gray-600 text-sm ml-2">
                      (128 reviews)
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    KokoGuard Extreme
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Premium anti-fouling protection
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      $289.99
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
                ))
              }
            </div>

            {/* Pagination */}
  <div className="flex justify-center mt-12 mb-8">
    <nav className="flex items-center space-x-1" aria-label="Pagination">
      {/* Previous page button */}
      <button
        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-400 cursor-not-allowed}`}
        aria-label="Previous page"
      >
        <ArrowLeft size={16} className="mr-1" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            1
          </button>
            <span className="px-2 py-2 text-gray-500">...</span>
      
      {/* Page numbers */}
      <button
            className={`px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white`}
          >
            5
          </button>
      
      {/* Last page */}
            <span className="px-2 py-2 text-gray-500">...</span>
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            10
          </button>
      
      {/* Next page button */}
      <button
        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-700 hover:bg-gray-100}`}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRight size={16} className="ml-1" />
      </button>
    </nav>
  </div>
          </main>
        </div>
      </div>
    </div>
  );
}
