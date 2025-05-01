import MarineProductCard from "@components/product/MarineProductCard";
import MarineButton from "@components/ui/MarineButton";
import { productApi } from "@features/products/api/productApi";
import React, { useEffect, useState } from "react";

export default function SearchProduct() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        page: 1,
        limit: 4,
        categoryId: "",
        brandId: ""
      });
      
      const [pagination, setPagination] = useState({
        totalProducts: 0,
        totalPages: 0,
        currentPage: 1
      });
    
      const fetchProducts = async () => {
        try {
          const res = await productApi.getProjects(filters);
          const { products, pagination: paginationData } = res?.data?.data || {};
          console.log(paginationData);
          
          
          if (products) setProducts(products);
          if (paginationData) {
            setPagination({
              totalProducts: paginationData.total || 0,
              totalPages: paginationData.totalPages || 0,
              currentPage: paginationData.page || 1
            });
          }
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      };
    
      const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
      };
    
      const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        updateFilters({ page: newPage });
      };
    
      const handleLimitChange = (newLimit) => {
        const numLimit = Number(newLimit);
        setFilters(prev => ({
          ...prev,
          limit: numLimit,
          page: 1
        }));
      };
    
      useEffect(() => {
        fetchProducts();
      }, [filters]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Produk Terbaik Kami!
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Dapatkan produk terbaik kami dengan harga terbaik.
          </p>
        </div>

        <div className="mt-4 md:mt-0 w-full md:w-1/2">
          <label for="search" className="sr-only">
            Cari
          </label>
          <div className="relative rounded-md shadow">
            <input
              id="search"
              name="search"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full h-12 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="Cari produk..."
              type="search"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <MarineButton variant="primary" size="sm" type="submit">
                <span className="sr-only">Search</span>
                <svg
                  className="h-5 w-5 my-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </MarineButton>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start gap-x-8 gap-y-10">
        <div className="w-1/4 hidden lg:block sticky top-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Kategori</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center">
                  <input
                    id="category-all"
                    name="category"
                    value="all"
                    type="radio"
                    checked
                    className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                  />
                  <label for="category-all" className="ml-3 text-sm text-gray-600">
                    All Categories
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="category-electronics"
                    name="category"
                    value="electronics"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                  />
                  <label
                    for="category-electronics"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Electronics
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="category-clothing"
                    name="category"
                    value="clothing"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                  />
                  <label
                    for="category-clothing"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Clothing
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="category-home"
                    name="category"
                    value="home"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                  />
                  <label for="category-home" className="ml-3 text-sm text-gray-600">
                    Home & Garden
                  </label>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Brand</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="price-any"
                    name="price"
                    value="any"
                    type="radio"
                    checked
                    className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                  />
                  <label for="price-any" className="ml-3 text-sm text-gray-600">
                    Any Price
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="price-under-25"
                    name="price"
                    value="under-25"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                  />
                  <label
                    for="price-under-25"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Under $25
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="price-25-50"
                    name="price"
                    value="25-50"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                  />
                  <label for="price-25-50" className="ml-3 text-sm text-gray-600">
                    $25 to $50
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="price-50-100"
                    name="price"
                    value="50-100"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                  />
                  <label for="price-50-100" className="ml-3 text-sm text-gray-600">
                    $50 to $100
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="price-over-100"
                    name="price"
                    value="over-100"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                  />
                  <label
                    for="price-over-100"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Over $100
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/4">
        <p className="mb-2 text-lg font-medium text-gray-900">Ditemukan {pagination?.totalProducts} produk: Anti Fouling Ashdaq</p>
            <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <MarineProductCard product={product} />
            ))}
            </div>

            <div>
      {/* Product list rendering - kode tidak ditampilkan di sini */}
      
      {/* Pagination UI */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage <= 1}
            className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-marine-blue disabled:opacity-50"
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-700">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
            className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-marine-blue disabled:opacity-50"
          >
            Next
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={filters.limit}
            onChange={(e) => handleLimitChange(e.target.value)}
            className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700"
          >
            <option value="4">4</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className="text-sm text-gray-700">products</span>
        </div>
      </div>
    </div>
            

        </div>
      </div>
    </>
  );
}
