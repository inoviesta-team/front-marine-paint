import { wpJsonUrl } from "@utils/url";

const baseUrl = wpJsonUrl;

export const articleApiStatic = {
  getArtciles: async (filterRequest = {}) => {
    const queryParams = Object.keys(filterRequest)
      .filter((key) => filterRequest[key])
      .reduce((acc, key) => {
        acc.append(key, filterRequest[key]);
        return acc;
      }, new URLSearchParams())
      .toString();

      const response = await fetch(`${baseUrl}/v2/posts/?${queryParams}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const articles = await response.json();
      // console.log("articles: ", articles);
      
      return articles;
  },
};
