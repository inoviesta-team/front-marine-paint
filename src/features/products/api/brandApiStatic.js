import axiosInstance from "@api/axiosInstance";
import { beApiUrl } from "@utils/url";

const baseUrl = beApiUrl

export const brandApiStatic = {
  getAllBrands: async (filterRequest = {}) => {
    const queryParams = Object.keys(filterRequest)
      .filter(key => filterRequest[key])
      .reduce((acc, key) => {
        acc.append(key, filterRequest[key]);
        return acc;
      }, new URLSearchParams())
      .toString();

    const response = await fetch(`${baseUrl}/brands?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();
    return responseJson;
  },
};
