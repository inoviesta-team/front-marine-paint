import { marineApi } from "@api/marineApi";
import MarineProjectCard from "@components/project/MarineProjectCard";
import MarineTestimonialCard from "@components/testimonial/MarineTestimonialCard";
import MarineButton from "@components/ui/MarineButton";
import { brandApiStatic } from "@features/products/api/brandApiStatic";
import { useEffect, useState } from "react";

export default function TestimonialSectionComponent() {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const fetchData = async () => {
    const [
      responseBrands,
      responseTestimonials,
    ] = await Promise.all([
      brandApiStatic.getAllBrands({ limit: 100 }),
      marineApi.getTestimonials(),
    ]);

    setBrands(await responseBrands?.data?.brands || [])
    setTestimonials(await responseTestimonials)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section class="py-24 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-br from-marine-darkBlue/5 to-marine-blue/10 z-0"
    >
    </div>
    <div
      class="absolute inset-0 bg-[url('/images/wave-pattern.svg')] opacity-5 z-0 mix-blend-overlay"
    >
    </div>

    <div
      class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent z-0"
    >
    </div>
    <div
      class="absolute top-20 right-10 w-40 h-40 rounded-full bg-marine-lightBlue/10 z-0"
    >
    </div>

    <div class="container mx-auto py-8 px-4 md:px-14 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-16">
        {/* <div class="inline-block px-3 py-1 bg-marine-blue/10 rounded-full text-marine-darkBlue text-sm font-sans font-medium mb-3">
          TESTIMONI PELANGGAN
        </div>  */}
        <h2 class="font-sans font-bold text-marine-darkBlue text-4xl mb-4">
          Apa Kata Mereka Tentang Kami
        </h2>
        <p class="font-sans text-gray-600 text-lg">
          Kami bangga dengan kepercayaan pelanggan terhadap produk dan layanan
          kami
        </p>
      </div>

      <div class="overflow-x-auto">
        <div class="flex gap-4 sm:gap-6 p-2">
          {
            testimonials.map((testimonial) => (
              <MarineTestimonialCard testimonial={testimonial} />
            ))
          }
        </div>
      </div>

      {
        brands.length > 0 && (
          <div class="mt-16 pt-8 border-t border-gray-200">
            <div class="text-center mb-8">
              <h3 class="font-sans font-medium text-marine-darkBlue text-xl">
                Dipercaya Oleh:
              </h3>
            </div>
            <div class="flex flex-wrap justify-center gap-8 items-center">
              {brands.map((brand) => (
                <div class="rounded-lg bg-white shadow w-auto h-24 flex items-center justify-center">
                  {/* <h1>{brand?.logoPath}</h1> */}
                  <img
                    src={brand?.logoPath}
                    alt={brand?.name}
                    class="max-h-full max-w-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  </section>
  );
}
