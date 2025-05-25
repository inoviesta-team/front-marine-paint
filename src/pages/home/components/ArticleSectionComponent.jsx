import MarineArticleCard from "@components/article/MarineArticleCard";
import MarineProductCard from "@components/product/MarineProductCard";
import MarineButton from "@components/ui/MarineButton";
import { articleApiStatic } from "@features/article/api/articleApiStatic";
import { productApiStatic } from "@features/products/api/productApiStatic";
import React, { useEffect, useState } from "react";

export default function ArticleSectionComponent() {
  const [articles, setArticles] = useState([]);

  const fetchData = async () => {
    const response = await articleApiStatic.getArtciles();

    if (response) {
      setArticles(await response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {articles.length > 0 && (
        <section class="py-24 relative overflow-hidden">
          <div class="absolute inset-0 bg-gray-50 z-0" />
          <div class="absolute inset-0 bg-[url('/images/ship-pattern.svg')] opacity-5 z-0 mix-blend-multiply" />
          <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-0" />

          <div class="container mx-auto py-8 px-4 md:px-14 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-16">
              {/* <div class="inline-block px-3 py-1 bg-marine-blue/10 rounded-full text-marine-darkBlue text-sm font-sans font-medium mb-3">
          ARTIKEL TERBARU
        </div> */}
              <h2 class="font-sans font-bold text-marine-darkBlue text-4xl mb-4">
                Tips & Informasi Seputar Cat Marine
              </h2>
              <p class="font-sans text-gray-600 text-lg">
                Dapatkan informasi terbaru dan tips berguna untuk memilih dan
                merawat cat kapal Anda
              </p>
            </div>

            <div class="overflow-x-auto">
              <div class="flex gap-6 p-2">
                {articles.map((article) => (
                  <MarineArticleCard isShrink={true} article={article} />
                ))}
              </div>
            </div>

            <div class="flex justify-center mt-12">
              <MarineButton
                as="a"
                href="/articles"
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
