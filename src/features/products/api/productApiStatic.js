import { beApiUrl } from "@utils/url";

const baseUrl = beApiUrl;

// export async function getProducts(filterRequest = {}) {
//   const categoryId = filterRequest.categoryId;
//   const page = filterRequest.page;
//   const limit = filterRequest.limit;
//   const brandId = filterRequest.brandId;
  
//   // console.log(localStorage.getItem("jwtToken"));
  

//   const response = await fetch(`${baseUrl}/products?page=${page}&limit=${limit}&brandId=${brandId}&categoryId=${categoryId}`, {
//     method: "GET",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   });
//   const products = await response.json();
  
  
//   return products;
// }

export const productApiStatic = {
    getProducts: async (filterRequest = {}) => {
      const queryParams = Object.keys(filterRequest)
      .filter(key => filterRequest[key])
      .reduce((acc, key) => {
        acc.append(key, filterRequest[key]);
        return acc;
      }, new URLSearchParams())
      .toString();

      const categoryId = filterRequest.categoryId;
      const page = filterRequest.page;
      const limit = filterRequest.limit;
      const brandId = filterRequest.brandId;
    
      // const response = await fetch(`${baseUrl}/products/?page=${page}&limit=${limit}&brandId=${brandId}&categoryId=${categoryId}`, {
      const response = await fetch(`${baseUrl}/products/?${queryParams}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const products = await response.json();
      // console.log("products: ", products);
      
      return products;
    },
    getProductById: async (id) => {
      const response = await fetch(`${baseUrl}/products/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const product = await response.json();
      return product;
    },

    getImages: async (id) => {
      const response = await fetch(`${baseUrl}/products/${id}/media`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const images = await response.json();
      // console.log("IMAGESS: ", images);
      // console.log("IMAGESS ID: ", id);
      return images;
    }
  };
  
  