/**
 * Mock data for the Marine Paint application
 */

// Mock products
export const marineProducts = [
  {
    id: "1",
    name: "Anti-fouling AF-300",
    description: "Cat anti-fouling terbaik untuk kapal nelayan tradisional.",
    price: 110000,
    // image: "/images/products/product_1.png",
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-7r98y-lvobtdwybblw56",

    category: "anti-fouling",
  },
  {
    id: "2",
    name: "Epoxy Primer EP-200",
    description: "Primer epoxy dengan daya rekat kuat untuk permukaan logam.",
    price: 150000,
    // image: "/images/products/product_2.png",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGjBbJzoux06gqvfWyytNqCfcrUTfiqkhrVQ&s",
    category: "primer",
  },
  {
    id: "3",
    name: "Topcoat TC-100",
    description: "Cat akhir dengan daya tahan terhadap sinar UV dan air laut.",
    price: 175000,
    image:
      "https://www.promarinetrade.com/cache/promarine/public/shop_product_picture/_1200x800x0/7397_MARINE_GLOSS_1L.jpg",
    category: "topcoat",
  },
  {
    id: "4",
    name: "Marine Varnish MV-50",
    description: "Pernis khusus untuk kayu dengan perlindungan maksimal.",
    price: 125000,
    // image: "/images/products/product_4.png",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXDs6S6JTlwMAyHErL973gPPxxABVVgC_Dg&s",
    category: "varnish",
  },
  {
    id: "5",
    name: "Zinc Chromate ZC-400",
    description: "Cat dasar anti-karat untuk berbagai jenis kapal.",
    price: 145000,
    // image: "/images/products/product_5.png",
    image:
      "https://image1ws.indotrading.com/s3/productimages/webp/co121532/p998078/w300-h300/0d4785b2-c6ba-4b25-a17a-4a8372a69c9d.png",
    category: "primer",
  },
];

// Mock projects
export const marineProjects = [
  {
    id: "1",
    name: "KM BUANA",
    type: "Ship",
    description:
      "Pengecatan ulang kapal nelayan tradisional di Pelabuhan Muara Baru.",
    image: "/images/projects/project_1.png",
    date: "2023-10-15",
  },
  {
    id: "2",
    name: "KM JAYA ABADI",
    type: "Cargo Ship",
    description:
      "Pelapisan anti-karat pada kapal kargo di Pelabuhan Tanjung Priok.",
    image: "/images/projects/project_2.png",
    date: "2023-09-20",
  },
  {
    id: "3",
    name: "KM BARUNA",
    type: "Fishing Boat",
    description:
      "Renovasi dan pengecatan total kapal nelayan di Pelabuhan Muara Angke.",
    image: "/images/projects/project_3.png",
    date: "2023-08-05",
  },
  {
    id: "4",
    name: "KM SAMUDRA",
    type: "Ferry",
    description:
      "Pengecatan dan perbaikan kapal feri penumpang di Pelabuhan Merak.",
    image: "/images/projects/project_4.png",
    date: "2023-07-12",
  },
];

// Mock articles
export const marineArticles = [
  {
    id: "1",
    title: "Tips Perawatan Cat Marine agar lebih Awet dan Tahan Lama",
    excerpt:
      "Pelajari cara merawat cat kapal anda agar tidak mudah terkelupas dan tahan lama meski terkena air laut...",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.",
    image: "/images/articles/article_1.png",
    readTime: "3 mins reading",
    publishedAt: "1 month ago",
    author: "Ahmad Santoso",
  },
  {
    id: "2",
    title: "Tips Memilih Cat Kapal untuk Nelayan Tradisional",
    excerpt:
      "Panduan lengkap memilih cat yang tepat untuk kapal nelayan tradisional dengan budget terbatas...",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.",
    image: "/images/articles/article_2.png",
    readTime: "3 mins reading",
    publishedAt: "1 month ago",
    author: "Budi Setiawan",
  },
  {
    id: "3",
    title: "Cara Aplikasi Anti-fouling yang Benar pada Kapal",
    excerpt:
      "Pelajari teknik aplikasi cat anti-fouling yang benar untuk mencegah pertumbuhan organisme laut...",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.",
    image: "/images/articles/article_3.png",
    readTime: "4 mins reading",
    publishedAt: "2 months ago",
    author: "Citra Dewi",
  },
];

// Mock testimonials
export const marineTestimonials = [
  {
    id: "1",
    quote:
      "Kami sudah menggunakan produk Marine Paint selama 5 tahun terakhir untuk armada kapal kami. Kualitasnya sangat baik dan tahan lama meski sering terkena air laut.",
    author: "Alex Jhoe",
    company: "PT Lorem Ipsum",
    avatar: "/images/testimonials/avatar_1.png",
  },
  {
    id: "2",
    quote:
      "Layanan konsultasi yang diberikan sangat membantu kami dalam memilih jenis cat yang tepat untuk kapal kami. Tim teknisnya sangat profesional.",
    author: "Bambang Sutrisno",
    company: "CV Samudra Jaya",
    avatar: "/images/testimonials/avatar_2.png",
  },
  {
    id: "3",
    quote:
      "Produk anti-fouling dari Marine Paint sangat efektif mencegah pertumbuhan teritip dan rumput laut di lambung kapal kami. Sangat direkomendasikan!",
    author: "Carla Wijaya",
    company: "PT Bahari Nusantara",
    avatar: "/images/testimonials/avatar_3.png",
  },
];

// Mock company partners
export const marinePartners = [
  {
    id: "1",
    name: "PT Pelayaran Nasional",
    logo: "/images/partners/partner_1.png",
  },
  {
    id: "2",
    name: "CV Bahari Sentosa",
    logo: "/images/partners/partner_2.png",
  },
  {
    id: "3",
    name: "PT Pelindo",
    logo: "/images/partners/partner_3.png",
  },
  {
    id: "4",
    name: "PT Samudera Indonesia",
    logo: "/images/partners/partner_4.png",
  },
  {
    id: "5",
    name: "PT Jasa Armada Indonesia",
    logo: "/images/partners/partner_5.png",
  },
  {
    id: "6",
    name: "PT ASDP Indonesia Ferry",
    logo: "/images/partners/partner_6.png",
  },
];
