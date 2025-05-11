import MarineProductCard from "@components/product/MarineProductCard";
import MarineButton from "@components/ui/MarineButton";
import { brandApi } from "@features/products/api/brandApi";
import { categoryApi } from "@features/products/api/categoryApi";
import { productApi } from "@features/products/api/productApi";
import MarineProductCardSearch from "@features/products/components/MarineProductCardSearch";
import { ArrowDown, ArrowRight, ArrowUp, Filter, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SearchProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 4,
    categoryId: "",
    brandId: "",
  });

  const [pagination, setPagination] = useState({
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const [inputFilter, setInputFilter] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  });

  const [sortOrder, setSortOrder] = useState("asc");
  const sortBy = [
    {
      key: "Nama",
      value: "name",
    },
    {
      key: "Harga",
      value: "price",
    },
    {
      key: "Rating",
      value: "avgRating",
    },
  ];

  const [showFilter, setShowFilter] = useState(false);
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getDataFilter = async () => {
    try {
      const resCategories = await categoryApi.getCategories();
      const resBrands = await brandApi.getBrands();

      setCategories(resCategories?.data?.data?.categories || []);
      setBrands(resBrands?.data?.data?.brands || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleInputFilterChange = (e) => {
    const { name } = e.target;
    name;

    if (name === "minPrice" || name === "maxPrice") {
      const numericValue = e.target.value.replace(/\D/g, "");
      const formattedValue = numericValue
        ? `${parseInt(numericValue).toLocaleString()}`
        : "";
      e.target.value = formattedValue;
    }

    setInputFilter((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const fetchProducts = async () => {
    try {
      const res = await productApi.getProducts(filters);
      const { products, pagination: paginationData } = res?.data?.data || {};

      if (products) setProducts(products);
      if (paginationData) {
        setPagination({
          totalProducts: paginationData.total || 0,
          totalPages: paginationData.totalPages || 0,
          currentPage: paginationData.page || 1,
        });
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    updateFilters({ page: newPage });
  };

  const handleLimitChange = (newLimit) => {
    const numLimit = Number(newLimit);
    setFilters((prev) => ({
      ...prev,
      limit: numLimit,
      page: 1,
    }));
  };

  useEffect(() => {
    getDataFilter();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Produk Terbaik Kami!
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Dapatkan produk terbaik kami dengan harga terbaik.
          </p>
        </div>

        <div className="flex justify-between items-stretch gap-2 lg:gap-0 lg:block mt-4 md:mt-0 w-full lg:w-1/2">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              Cari
            </label>
            <div className="relative rounded-md shadow">
              <input
                onChange={handleInputFilterChange}
                id="search"
                name="search"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full h-12 pl-4 sm:pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Cari produk..."
                type="search"
              />
              <div className="hidden lg:flex absolute inset-y-0 right-0 items-center pr-3">
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
          <button
            className="block lg:hidden bg-marine-blue text-white py-1 px-4 text-sm rounded-md"
            onClick={handleShowFilter}
          >
            <Filter />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start gap-x-8 gap-y-10">
        <div
          className={`${
            showFilter ? "block" : "hidden lg:block"
          } p-5 lg:px-0 bg-white lg:bg-gray-50 fixed inset-0 z-50 w-full lg:w-1/4 lg:sticky`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-gray-900">Filter Produk</h3>
            <button className="block lg:hidden" onClick={handleShowFilter}>
              <X />
            </button>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Kategori</h3>
              <ul className="mt-4 space-y-3">
                {categories.map((category) => (
                  <li className="flex items-center" key={category.id}>
                    <input
                      id={`category-${category.id}`}
                      name="category"
                      value={category.id}
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {category.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Brand</h3>
              <ul className="mt-4 space-y-3">
                {brands.map((brand) => (
                  <li className="flex items-center" key={brand.id}>
                    <input
                      id={`brand-${brand.id}`}
                      name="brand"
                      value={brand.id}
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`brand-${brand.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {brand.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Urutan</h3>
              <ul className="mt-4 space-y-3">
                {sortBy.map((sort, index) => (
                  <li className="flex items-center" key={`sort-${index}`}>
                    <input
                      name="sortBy"
                      onChange={handleInputFilterChange}
                      id={`sort-${sort.value}`}
                      value={sort.value}
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-marine-blue accent-marine-blue focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`sort-${sort.value}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {sort.key}
                    </label>
                    {inputFilter.sortBy === sort.value && (
                      <button
                        onClick={handleSortOrder}
                        type="button"
                        className="ml-2"
                      >
                        {sortOrder === "asc" ? (
                          <ArrowDown size={16} />
                        ) : (
                          <ArrowUp size={16} />
                        )}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Harga</h3>
              <div className="flex justify-between items-center gap-2">
                <input
                  onChange={handleInputFilterChange}
                  type="text"
                  name="minPrice"
                  className="w-full p-2 border rounded text-sm"
                  placeholder="MIN"
                />
                {/* <ArrowRight color="#505050" /> */}
                -
                <input
                  onChange={handleInputFilterChange}
                  type="text"
                  name="maxPrice"
                  className="w-full p-2 border rounded text-sm"
                  placeholder="MAX"
                />
              </div>
            </div>
            <MarineButton variant="tertiary" className="w-full">
              Cari Produk
            </MarineButton>
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          <p className="mb-2 text-lg font-medium text-gray-900">
            Ditemukan {pagination?.totalProducts} produk: Anti Fouling Ashdaq
          </p>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <MarineProductCardSearch
                key={`product-${product.id}`}
                product={product}
              />
            ))}
          </div>

          <div className="w-full">
            {/* Product list rendering - kode tidak ditampilkan di sini */}

            {/* Pagination UI */}
            <div className="w-full flex flex-wrap items-center justify-center lg:justify-between gap-4 py-4">
              <div className="flex justify-center items-center space-x-2 w-full lg:w-auto">
                <MarineButton
                className="w-full"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                >
                  Previous
                </MarineButton>

                {/* <span className="text-sm text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span> */}

                <MarineButton
                className="w-full"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                >
                  Next
                </MarineButton>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Tampilkan</span>
                <select
                  value={filters.limit}
                  onChange={(e) => handleLimitChange(e.target.value)}
                  className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700"
                >
                  <option value="4">4</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
                <span className="text-sm text-gray-700">produk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
