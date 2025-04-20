import { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronRight, ArrowRight, ChevronDown, Globe, Mail, Phone, MapPin, Shield, Droplet, Wind, Briefcase, Award, Users, Star, ShoppingCart, Filter } from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sample products data
  const products = [
    {
      id: 1,
      name: "KokoGuard Extreme",
      category: "antifouling",
      rating: 4.9,
      price: "$289.99",
      image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/7/acb7a966-d5ca-4bea-91cb-96b5e9c8886b.jpg",
      description: "Premium anti-fouling coating with extreme durability and advanced protection",
      features: ["5-year protection", "Self-polishing technology", "Low VOC formula"]
    },
    {
      id: 2,
      name: "HydroFlow Pro",
      category: "performance",
      rating: 4.8,
      price: "$329.99",
      image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/7/acb7a966-d5ca-4bea-91cb-96b5e9c8886b.jpg",
      description: "High-performance hull coating that reduces drag and improves vessel efficiency",
      features: ["8% fuel savings", "Ultra-smooth finish", "Easy application"]
    },
    {
      id: 3,
      name: "EcoSeal Marine",
      category: "ecofriendly",
      rating: 4.7,
      price: "$259.99",
      image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/7/acb7a966-d5ca-4bea-91cb-96b5e9c8886b.jpg",
      description: "Environmentally responsible coating with zero harmful biocides",
      features: ["IMO 2025 compliant", "Biodegradable components", "Reef-safe formula"]
    },
    {
      id: 4,
      name: "CorroShield Plus",
      category: "corrosion",
      rating: 4.9,
      price: "$349.99",
      image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/7/acb7a966-d5ca-4bea-91cb-96b5e9c8886b.jpg",
      description: "Ultimate corrosion protection for harsh marine environments",
      features: ["Salt-spray resistance", "Self-healing technology", "10-year warranty"]
    },
    {
      id: 5,
      name: "TopCoat Premium",
      category: "topside",
      rating: 4.6,
      price: "$219.99",
      image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/7/acb7a966-d5ca-4bea-91cb-96b5e9c8886b.jpg",
      description: "Superior topside finish with excellent UV resistance and color retention",
      features: ["High-gloss finish", "UV stabilizers", "Easy maintenance"]
    },
    {
      id: 6,
      name: "DeckGuard Non-Slip",
      category: "deck",
      rating: 4.8,
      price: "$199.99",
      image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/7/acb7a966-d5ca-4bea-91cb-96b5e9c8886b.jpg",
      description: "Durable non-slip deck coating with superior grip in wet conditions",
      features: ["Anti-slip texture", "Wear-resistant", "UV protected"]
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'antifouling', name: 'Anti-fouling' },
    { id: 'performance', name: 'Performance' },
    { id: 'ecofriendly', name: 'Eco-friendly' },
    { id: 'corrosion', name: 'Corrosion Protection' },
    { id: 'topside', name: 'Topside' },
    { id: 'deck', name: 'Deck Coatings' }
  ];
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-blue-900 py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg">
                <span className="text-white font-bold text-xl">KL</span>
              </div>
              <span className={`font-bold text-xl ${scrolled ? 'text-blue-900' : 'text-white'}`}>
                KOKO LIE
              </span>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#products" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}>
                Products
              </a>
              <a href="#bestsellers" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}>
                Best Sellers
              </a>
              <a href="#solutions" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}>
                Solutions
              </a>
              <a href="#technology" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}>
                Technology
              </a>
              <a href="#about" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}>
                About
              </a>
              <a href="#contact" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-600 font-medium transition-colors`}>
                Contact
              </a>
            </nav>
            
            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className={`p-2 rounded-full ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-blue-800'}`}>
                <Search size={20} />
              </button>
              <button className={`p-2 rounded-full ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-blue-800'}`}>
                <ShoppingCart size={20} />
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-colors">
                Get Quote
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? 
                <X size={24} className={scrolled ? 'text-gray-900' : 'text-white'} /> : 
                <Menu size={24} className={scrolled ? 'text-gray-900' : 'text-white'} />
              }
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg absolute w-full`}>
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#products" className="text-gray-800 hover:text-blue-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Products
              </a>
              <a href="#bestsellers" className="text-gray-800 hover:text-blue-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Best Sellers
              </a>
              <a href="#solutions" className="text-gray-800 hover:text-blue-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Solutions
              </a>
              <a href="#technology" className="text-gray-800 hover:text-blue-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Technology
              </a>
              <a href="#about" className="text-gray-800 hover:text-blue-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>
                About
              </a>
              <a href="#contact" className="text-gray-800 hover:text-blue-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex">
                  <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                    <Search size={20} />
                  </button>
                  <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                    <ShoppingCart size={20} />
                  </button>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
                  Get Quote
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Featured Products Hero Section */}
      <section className="pt-24 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Premium Marine Coatings for Ultimate Protection
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Discover our advanced coating solutions that extend vessel life and improve performance in the harshest marine environments.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-all">
                  <span>Shop Now</span>
                  <ArrowRight size={20} />
                </button>
                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-all border border-white/20">
                  <span>Product Catalog</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://img.freepik.com/free-photo/transport-logistics-concept_23-2151541884.jpg?ga=GA1.1.1944726580.1744974407&semt=ais_hybrid&w=740" 
                alt="Featured Product" 
                className="rounded-xl shadow-lg w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Marine Paint
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Categories */}
      <section id="products" className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Product Range
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of marine coatings designed for every application and vessel type.
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex overflow-x-auto scrollbar-hide mb-8 pb-4">
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border border-gray-100">
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white shadow-md rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-gray-900">{product.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors">
                        <ShoppingCart size={20} />
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>
      
      {/* Best Sellers Section */}
      <section id="bestsellers" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Best Selling Products
            </h2>
            <a href="#" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
              <span>View all</span>
              <ChevronRight size={20} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Best Seller 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl border border-gray-100">
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
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-500">
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                  </div>
                  <span className="text-gray-600 text-sm ml-2">(128 reviews)</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">KokoGuard Extreme</h3>
                <p className="text-sm text-gray-600 mb-4">Premium anti-fouling protection</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">$289.99</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            
            {/* Best Seller 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl border border-gray-100">
              <div className="relative">
                <img 
                  src="https://i.ytimg.com/vi/UhQ0lPInAq4/maxresdefault.jpg"
                  alt="Best Seller 2"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 left-0 bg-blue-600 text-white text-sm font-medium px-3 py-1">
                  #2 Best Value
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-500">
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                  </div>
                  <span className="text-gray-600 text-sm ml-2">(92 reviews)</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">HydroFlow Pro</h3>
                <p className="text-sm text-gray-600 mb-4">Advanced hull performance coating</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">$329.99</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            
            {/* Best Seller 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl border border-gray-100">
              <div className="relative">
                <img 
                  src="https://i.ytimg.com/vi/UhQ0lPInAq4/maxresdefault.jpg"
                  alt="Best Seller 3"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 left-0 bg-blue-600 text-white text-sm font-medium px-3 py-1">
                  #3 Eco Choice
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-500">
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                    <Star size={16} className="fill-yellow-500" />
                  </div>
                  <span className="text-gray-600 text-sm ml-2">(76 reviews)</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">EcoSeal Marine</h3>
                <p className="text-sm text-gray-600 mb-4">Environmentally responsible coating</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">$259.99</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Finder */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Find the Perfect Product for Your Vessel
                </h2>
                <p className="text-blue-100 mb-8">
                  Our product finder helps you select the ideal coating system based on your specific vessel type and requirements.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="relative">
                    <select className="w-full bg-white/10 border border-white/20 text-white rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent">
                      <option value="">Select Vessel Type</option>
                      <option value="commercial">Commercial Vessels</option>
                      <option value="pleasure">Pleasure Craft</option>
                      <option value="offshore">Offshore Structures</option>
                      <option value="naval">Naval Vessels</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" size={20} />
                  </div>
                  
                  <div className="relative">
                    <select className="w-full bg-white/10 border border-white/20 text-white rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent">
                      <option value="">Select Application Area</option>
                      <option value="hull">Hull</option>
                      <option value="topside">Topside</option>
                      <option value="underwater">Underwater Areas</option>
                      <option value="deck">Deck</option>
                      <option value="interior">Interior</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" size={20} />
                  </div>
                </div>
                
                <button className="bg-white text-blue-900 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg shadow-sm transition-colors self-start">
                  Find Products
                </button>
              </div>
              
              <div className="relative hidden lg:block">
                <img 
                  src="https://img.freepik.com/premium-photo/photo-ship_931878-277327.jpg?ga=GA1.1.1944726580.1744974407&semt=ais_hybrid&w=740" 
                  alt="Product Finder" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technologies Section (Shortened) */}
      <section id="technology" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Innovative Technologies
            </h2>
            <p className="text-lg text-gray-600">
              Proprietary formulations that deliver unmatched performance in challenging marine environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tech 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Shield className="text-blue-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">KokoGuard™</h3>
              <p className="text-gray-600 mb-4">
                Multi-layer protection system creating an impenetrable barrier against harsh marine elements.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                <span>Learn more</span>
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            {/* Tech 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Wind className="text-blue-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">HydroFlow™</h3>
              <p className="text-gray-600 mb-4">
                Advanced hull coating that reduces drag and improves vessel speed and fuel efficiency.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                <span>Learn more</span>
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            {/* Tech 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Briefcase className="text-blue-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">EcoSeal™</h3>
              <p className="text-gray-600 mb-4">
                Environmentally responsible coating system with zero harmful biocides and minimal VOCs.
              </p>
              <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                <span>Learn more</span>
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Protect Your Vessel?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get in touch with our experts to find the perfect coating solution for your specific needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-blue-900 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg shadow-lg transition-colors">
                Contact Us
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-colors">
                Shop Products
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}