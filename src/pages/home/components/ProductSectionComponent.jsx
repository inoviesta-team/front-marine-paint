import MarineProductCard from "@components/product/MarineProductCard";
import MarineButton from "@components/ui/MarineButton";
import { productApiStatic } from "@features/products/api/productApiStatic";
import React, { useEffect, useState } from "react";

export default function ProductSectionComponent() {
  const [products, setProducts] = useState([])

  const fetchData = async () => {
    const response = await productApiStatic.getProducts({ limit: 10 });

    if (response?.data?.products) {
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {products.length > 0 && (
        <section class="py-24 bg-white relative overflow-hidden">
          <div class="absolute top-10 right-4 w-48 h-48 rounded-full bg-gradient-to-br from-marine-lightBlue/10 to-marine-blue/5" />
          <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-marine-blue/10 to-marine-lightBlue/5" />

          <div class="container mx-auto px-4 md:px-14 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-16">
              {/* <div class="inline-block px-3 py-1 bg-marine-blue/10 rounded-full text-marine-darkBlue text-sm font-sans font-medium mb-3">
          PRODUK UNGGULAN
        </div>  */}
              <h2 class="font-sans font-bold text-marine-darkBlue text-4xl mb-4">
                Cat Marine Terbaik untuk Kapal Anda
              </h2>
              <p class="font-sans text-gray-600 text-lg">
                Pilihan produk cat marine berkualitas tinggi dengan daya tahan
                maksimal terhadap air laut dan cuaca ekstrem
              </p>
            </div>

            <div class="overflow-x-auto">
              <div class="flex gap-6 p-2">
                {products.map((product) => (
                  <MarineProductCard client:only="react" product={product} />
                ))}
              </div>
            </div>

            <div class="flex justify-center mt-12">
              <MarineButton
                as="a"
                href="/products"
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
