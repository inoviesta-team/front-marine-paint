import { wpJsonUrl } from "@utils/url";

const baseUrl = wpJsonUrl;

export const projectApiStatic = {
  getProjects: async (filterRequest = {}) => {
    const queryParams = Object.keys(filterRequest)
      .filter((key) => filterRequest[key])
      .reduce((acc, key) => {
        acc.append(key, filterRequest[key]);
        return acc;
      }, new URLSearchParams())
      .toString();

      const response = await fetch(`${baseUrl}/v2/project/?${queryParams}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const projects = await response.json();
      // console.log("projects: ", projects);
      
      return projects;
  },
};
