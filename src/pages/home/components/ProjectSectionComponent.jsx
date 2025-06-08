import { marineApi } from "@api/marineApi";
import { projectApiStatic } from "@features/project/api/projectApiStatic";
import MarineProjectCard from "@components/project/MarineProjectCard";
import MarineButton from "@components/ui/MarineButton";
import { useEffect, useState } from "react";

export default function ProjectSectionComponent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Try to fetch from WordPress API first
      const response = await projectApiStatic.getProjects();
      
      if (response && response.length > 0) {
        // Limit to 6 projects for home page
        setProjects(response.slice(0, 6));
      } else {
        // Fallback to mock data if WordPress API fails
        const fallbackResponse = await marineApi.getProjects({ limit: 4 });
        if (fallbackResponse) {
          setProjects(fallbackResponse);
        }
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setError(error);
      // Fallback to mock data
      try {
        const fallbackResponse = await marineApi.getProjects({ limit: 4 });
        if (fallbackResponse) {
          setProjects(fallbackResponse);
        }
      } catch (fallbackError) {
        console.error('Failed to fetch fallback projects:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Don't render anything if loading or no projects
  if (loading || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-marine-accent opacity-5" />
      <div className="container mx-auto py-8 px-4 md:px-14 relative z-10">
        <h2 className="font-sans font-bold text-marine-blue text-3xl text-center mb-12">
          Projek Kami
        </h2>

        <div className="overflow-x-auto">
          <div className="flex gap-6 p-2">
            {projects.map((project) => (
              <MarineProjectCard key={project.id} isShrink={true} project={project} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <MarineButton
            as="a"
            href="/projects"
            variant="tertiary"
            size="md"
            className="font-sans rounded-xl py-2 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Lihat Semua
          </MarineButton>
        </div>
      </div>
    </section>
  );
}
