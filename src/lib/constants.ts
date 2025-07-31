export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  sellerId: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  features: string[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
};

export type Seller = {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  rating: number;
  totalSales: number;
};

export const sellers: Seller[] = [
  {
    id: 'seller-1',
    name: 'Creative Studio',
    avatarUrl: 'https://placehold.co/100x100',
    bio: 'Designing beautiful and functional digital assets since 2015.',
    rating: 4.9,
    totalSales: 1240,
  },
  {
    id: 'seller-2',
    name: 'Dev Gurus',
    avatarUrl: 'https://placehold.co/100x100',
    bio: 'We build robust and scalable code solutions for modern web applications.',
    rating: 4.8,
    totalSales: 3210,
  },
  {
    id: 'seller-3',
    name: 'UX Masters',
    avatarUrl: 'https://placehold.co/100x100',
    bio: 'Passionate about creating intuitive and delightful user experiences.',
    rating: 5.0,
    totalSales: 850,
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Minimalist UI Kit',
    category: 'UI Kits',
    price: 49.99,
    sellerId: 'seller-1',
    shortDescription: 'A clean and modern UI kit for your next project.',
    description: 'Our Minimalist UI Kit is designed for developers and designers who value elegance and simplicity. It includes over 100+ components, responsive layouts, and a clean, modern aesthetic that can be adapted to any project. Perfect for web apps, mobile apps, and websites.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['100+ Components', 'Dark & Light Mode', 'Fully Responsive', 'Figma & Sketch files'],
    reviews: [{ user: 'Alex', rating: 5, comment: 'Amazing kit!' }],
  },
  {
    id: 'prod-2',
    name: 'React Component Library',
    category: 'Code Snippets',
    price: 79.99,
    sellerId: 'seller-2',
    shortDescription: 'Reusable and customizable React components.',
    description: 'Save hundreds of hours of development time with our extensive React Component Library. Built with TypeScript and Tailwind CSS, these components are fully accessible, tested, and easy to customize. From buttons to complex data tables, we have you covered.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['50+ Components', 'TypeScript Support', 'Tailwind CSS', 'Accessible (ARIA)'],
    reviews: [{ user: 'Maria', rating: 5, comment: 'A real time-saver.' }],
  },
  {
    id: 'prod-3',
    name: 'Mobile App Icon Set',
    category: 'Icons',
    price: 19.99,
    sellerId: 'seller-1',
    shortDescription: 'A beautiful set of 200+ icons for your mobile app.',
    description: 'A comprehensive collection of 200+ professionally designed icons for iOS and Android apps. Available in multiple formats (SVG, PNG) and styles (line, solid, colored), these icons will make your app stand out.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['200+ Icons', 'SVG & PNG formats', 'Multiple Styles', 'Pixel Perfect'],
    reviews: [{ user: 'David', rating: 4, comment: 'Great value.' }],
  },
  {
    id: 'prod-4',
    name: 'E-commerce Theme',
    category: 'Themes',
    price: 99.0,
    sellerId: 'seller-3',
    shortDescription: 'A feature-rich theme for your online store.',
    description: 'A complete e-commerce solution with a beautiful design and powerful features. This theme is optimized for performance and conversions, ensuring a smooth shopping experience for your customers. Compatible with popular e-commerce platforms.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['Optimized for SEO', 'Responsive Design', 'Easy Customization', 'Customer Support'],
    reviews: [{ user: 'Sarah', rating: 5, comment: 'Helped me launch my store quickly.' }],
  },
  {
    id: 'prod-5',
    name: 'Data Visualization Kit',
    category: 'UI Kits',
    price: 65.0,
    sellerId: 'seller-3',
    shortDescription: 'Create stunning charts and graphs with ease.',
    description: 'This kit provides all the components you need to build beautiful and interactive data visualizations. Compatible with React, Vue, and Angular, it’s the perfect tool for dashboards and reports.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['20+ Chart Types', 'Interactive & Animated', 'Easy to Integrate', 'Great Documentation'],
    reviews: [{ user: 'Tom', rating: 5, comment: 'The best data viz kit I have used.' }],
  },
  {
    id: 'prod-6',
    name: 'Node.js Authentication Boilerplate',
    category: 'Code Snippets',
    price: 35.0,
    sellerId: 'seller-2',
    shortDescription: 'Secure user authentication ready to deploy.',
    description: 'Jumpstart your project with this secure and production-ready Node.js authentication boilerplate. It includes JWT-based authentication, password hashing, social logins, and more.',
    imageUrl: 'https://placehold.co/600x400',
    features: ['JWT Authentication', 'Social Logins (OAuth)', 'Secure Password Handling', 'Email Verification'],
    reviews: [{ user: 'Chen', rating: 5, comment: 'Saved me weeks of work.' }],
  },
];

export const categories = [
  'All',
  ...Array.from(new Set(products.map((p) => p.category))),
];
