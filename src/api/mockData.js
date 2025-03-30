/**
 * Mock data for development
 */

// Mock products
export const mockProducts = [
  {
    id: "1",
    name: "Premium Headphones",
    description:
      "Wireless headphones with noise cancellation and premium sound quality.",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "2",
    name: "Smart Watch",
    description:
      "Track your fitness, receive notifications, and more with this elegant smart watch.",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with 24-hour battery life and waterproof design.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    name: "Laptop Stand",
    description:
      "Ergonomic laptop stand that improves posture and keeps your device cool.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwc3RhbmR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "5",
    name: "Wireless Keyboard",
    description: "Mechanical wireless keyboard with customizable RGB lighting.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "6",
    name: "Smartphone Holder",
    description: "Adjustable smartphone holder for desk or car use.",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmUlMjBob2xkZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "7",
    name: "Wireless Charger",
    description:
      "Fast wireless charger compatible with all Qi-enabled devices.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1603674554159-b62f6febbce5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "8",
    name: "HD Webcam",
    description: "1080p HD webcam with microphone for clear video calls.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1623949556303-b0d17d198863?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViY2FtfGVufDB8fDB8fHww",
  },
];

// Mock users
export const mockUsers = [
  {
    id: "1",
    name: "Test User",
    email: "user@example.com",
    role: "CUSTOMER",
  },
];

// Mock auth responses
export const mockAuthResponses = {
  login: {
    token: "mock-token-xyz",
    user: mockUsers[0],
  },
  register: {
    token: "mock-token-xyz",
    user: mockUsers[0],
  },
};
