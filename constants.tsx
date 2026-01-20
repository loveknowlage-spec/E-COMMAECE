
import { Product, Category } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Zenith Noise Cancelling Headphones',
    description: 'Experience pure sound with our flagship noise-cancelling wireless headphones. 40 hours of battery life and studio-quality audio.',
    highlights: [
      'Industry-leading noise cancellation',
      'High-resolution Audio compatible',
      '40-hour battery life with quick charging',
      'Multipoint connection for two devices',
      'Speak-to-chat technology',
      'Crystal clear call quality with 5 mics'
    ],
    price: 299.99,
    oldPrice: 349.99,
    category: Category.AUDIO,
    image: 'https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviews: 124,
    reviewList: [
      {
        id: 'r1',
        userName: 'Alex Johnson',
        rating: 5,
        comment: 'Best headphones I have ever owned. The noise cancellation is magical.',
        date: '2024-03-15',
        verified: true
      },
      {
        id: 'r2',
        userName: 'Sarah M.',
        rating: 4,
        comment: 'Sound quality is amazing. A bit heavy for long sessions but still great.',
        date: '2024-03-10',
        verified: true
      }
    ],
    stock: 45,
    featured: true,
    specs: [
      { label: 'BATTERY', value: '40 hrs' },
      { label: 'DRIVER', value: '40mm' },
      { label: 'BLUETOOTH', value: '5.2' }
    ],
    features: [
      {
        title: "Adaptive Sound Control",
        description: "Automatically adjusts ambient sound settings based on your location and behavior for the ideal listening experience.",
        image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Dual Sensor Noise Tech",
        description: "Dual microphones on each earcup capture ambient noise and pass the data to the HD Noise Cancelling Processor QN1.",
        image: "https://images.unsplash.com/photo-1583394838336-31e690733f11?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Foldable Refined Design",
        description: "Crafted from lightweight materials with a sophisticated matte finish, designed to be your constant travel companion.",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: '2',
    name: 'New Gen X-Bud Pro',
    description: 'Compact true wireless earbuds with immersive spatial audio and 30-hour battery life.',
    highlights: [
      'Spatial audio with dynamic head tracking',
      'Sweat and water resistant (IPX4)',
      'Up to 6 hours of listening time',
      'MagSafe Charging Case',
      'Automatic switching between devices',
      'Always-on Siri'
    ],
    price: 149.00,
    category: Category.AUDIO,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588423019284-47a4f8992e52?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviews: 89,
    reviewList: [
      {
        id: 'r3',
        userName: 'Mike T.',
        rating: 5,
        comment: 'Very comfortable and the spatial audio is a game changer.',
        date: '2024-03-01',
        verified: true
      }
    ],
    stock: 120,
    featured: true,
    specs: [
      { label: 'BATTERY', value: '30 hrs' },
      { label: 'WATERPROOF', value: 'IPX7' }
    ],
    features: [
      {
        title: "Precision Mesh",
        description: "An inset microphone in each earbud is covered by a special acoustic mesh that reduces wind noise during calls.",
        image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Ergonomic Sculpting",
        description: "Thousands of ear shapes were scanned to create a shape that stays secure and comfortable all day.",
        image: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: '3',
    name: 'Light Grey Surface Headphone',
    description: 'Minimalist over-ear headphones with touch controls and crystal clear voice pickup.',
    highlights: [
      'Intuitive touch controls',
      'Crisp high-fidelity audio',
      'Adjustable noise cancellation',
      'Lightweight ergonomic design',
      'Quick charging capability',
      'Voice assistant integrated'
    ],
    price: 220.50,
    oldPrice: 250.00,
    category: Category.AUDIO,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 210,
    reviewList: [],
    stock: 15,
    featured: true,
    features: [
      {
        title: "Seamless Integration",
        description: "Designed to disappear into your workflow. Light as air and as clear as crystal.",
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: '4',
    name: 'Ultima Vision Pro VR',
    description: 'The next dimension of spatial computing. High-resolution displays with intuitive gesture tracking.',
    highlights: [
      'Dual micro-OLED 4K displays',
      'Revolutionary eye tracking technology',
      'Spatial Audio System built-in',
      'External battery with 2 hours use',
      'M2 and R1 custom Apple silicon',
      'Light Seal for personalized fit'
    ],
    price: 3499.00,
    category: Category.ELECTRONICS,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626387346567-58d2b83b3855?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviews: 12,
    reviewList: [],
    stock: 5,
    features: [
      {
        title: "Optical Sensors",
        description: "An array of advanced cameras and sensors work together to let you see the world clearly and navigate with your eyes.",
        image: "https://images.unsplash.com/photo-1592477906563-5c51b3d8bb5b?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Fluid Immersion",
        description: "High-resolution micro-OLED displays deliver more pixels than a 4K TV for each eye, for jaw-dropping clarity.",
        image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: '5',
    name: 'Nitec Smart Band Z',
    description: 'Keep track of your health with 24/7 heart rate monitoring and sleep analysis.',
    highlights: [
      'AMOLED Color touch screen',
      '14-day battery life',
      '30+ fitness modes',
      'SpO2 blood oxygen tracking',
      'Swim-proof up to 50m',
      'Stress and sleep tracking'
    ],
    price: 49.99,
    category: Category.WEARABLES,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
    rating: 4.2,
    reviews: 560,
    reviewList: [],
    stock: 200,
    features: [
      {
        title: "Optical Bio-Sensor",
        description: "Equipped with a high-precision biosensing lens for 24-hour health monitoring.",
        image: "https://images.unsplash.com/photo-1557167668-6eb029f7e60d?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: '6',
    name: 'Leather Tech Sleeve',
    description: 'Genuine leather sleeve for your premium devices, featuring a soft microfiber lining.',
    highlights: [
      'Premium full-grain leather',
      'Microfiber anti-scratch lining',
      'Slim-fit design',
      'Hand-stitched detailing',
      'Secure magnetic closure',
      'Elegant professional aesthetic'
    ],
    price: 79.00,
    category: Category.ACCESSORIES,
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfc13bc?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 45,
    reviewList: [],
    stock: 50,
    features: [
      {
        title: "Master Craftsmanship",
        description: "Each sleeve is hand-finished to ensure every stitch is perfect and the leather is flawless.",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

export const COLORS = {
  primary: '#A3E635', // Lime Green
  secondary: '#18181B', // Zinc Dark
  accent: '#3B82F6', // Blue
  bg: '#F5F6F1', // Warm off-white
};
