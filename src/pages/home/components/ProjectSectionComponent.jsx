import { marineApi } from "@api/marineApi";
import MarineProjectCard from "@components/project/MarineProjectCard";
import MarineButton from "@components/ui/MarineButton";
import { useEffect, useState } from "react";

export default function ProjectSectionComponent() {
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    const response = await marineApi.getProjects({ limit: 4 });

    if (response) {
      setProjects(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {projects.length > 0 && (
        <section class="py-16 bg-white relative overflow-hidden">
          <div class="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-marine-accent opacity-5" />
          <div class="container mx-auto py-8 px-4 md:px-14 relative z-10">
            <h2 class="font-sans font-bold text-marine-blue text-3xl text-center mb-12">
              Projek Kami
            </h2>

            <div class="overflow-x-auto">
              <div class="flex gap-6 p-2">
                {projects.map((project) => (
                  <MarineProjectCard isShrink={true} project={project} />
                ))}
              </div>
            </div>

            <div class="flex justify-center mt-12">
              <MarineButton
                variant="tertiary"
                size="md"
                className="font-sans rounded-xl py-2 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Lihat Semua
              </MarineButton>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
