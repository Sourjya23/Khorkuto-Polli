import { Product, Category, Room, Banner } from './types';

// ==================== CATEGORIES ====================
export const categories: Category[] = [
  {
    name: 'Figurines',
    slug: 'figurines',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
    description: 'Elegant figurines that bring character and charm to any corner of your home.',
    productCount: 24,
  },
  {
    name: 'Vases & Pots',
    slug: 'vases-pots',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
    description: 'Beautifully crafted vases and pots for flowers and standalone decor.',
    productCount: 18,
  },
  {
    name: 'Wall Decor',
    slug: 'wall-decor',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
    description: 'Transform your walls with artistic pieces that make a statement.',
    productCount: 15,
  },
  {
    name: 'Tabletop Sets',
    slug: 'tabletop-sets',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
    description: 'Curated sets to style your coffee table, dining table, and side tables.',
    productCount: 12,
  },
  {
    name: 'Gift Showpieces',
    slug: 'gift-showpieces',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
    description: 'Perfect presents for housewarming, weddings, and special occasions.',
    productCount: 20,
  },
  {
    name: 'Spiritual Pieces',
    slug: 'spiritual-pieces',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
    description: 'Serene Buddha figures, mandala art, and mindful home accents.',
    productCount: 10,
  },
  {
    name: 'Miniatures',
    slug: 'miniatures',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
    description: 'Tiny treasures that add playful detail to shelves and desks.',
    productCount: 16,
  },
  {
    name: 'Candle Holders',
    slug: 'candle-holders',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
    description: 'Create ambiance with our handpicked candle holders and lanterns.',
    productCount: 8,
  },
];

// ==================== ROOMS ====================
export const rooms: Room[] = [
  {
    name: 'Living Room',
    slug: 'living-room',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    description: 'Statement pieces for the heart of your home.',
  },
  {
    name: 'Bedroom',
    slug: 'bedroom',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    description: 'Soft, serene decor for your personal retreat.',
  },
  {
    name: 'Office Desk',
    slug: 'office-desk',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    description: 'Inspiring pieces to elevate your workspace.',
  },
  {
    name: 'Entryway',
    slug: 'entryway',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    description: 'Make a lasting first impression.',
  },
  {
    name: 'Gifting',
    slug: 'gifting',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    description: 'Thoughtfully curated gift selections.',
  },
];

// ==================== PRODUCTS ====================
export const products: Product[] = [
  {
    _id: '1',
    title: 'Golden Deer Couple Figurine',
    slug: 'golden-deer-couple-figurine',
    description: 'A stunning pair of golden deer figurines crafted with intricate detailing. These elegant pieces symbolize grace and togetherness, perfect for your living room console or bedroom shelf.',
    story: 'Inspired by the graceful deer of the Sundarbans, this piece celebrates the natural beauty of Bangladesh.',
    materialNotes: 'Premium resin with gold leaf finish. Hand-painted details.',
    images: [
      { url: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=600&h=600&fit=crop', angleLabel: 'front' },
      { url: 'https://picsum.photos/seed/showpiece_1/600/600', angleLabel: 'side' },
      { url: 'https://picsum.photos/seed/showpiece_2/600/600', angleLabel: 'in-room' },
    ],
    price: 2450,
    compareAtPrice: 3200,
    discountPercent: 23,
    variants: [
      { label: '15 × 10 cm', dimensions: { h: 15, w: 10, d: 8, unit: 'cm' }, sku: 'GDF-15', stock: 12, },
      { label: '20 × 15 cm', dimensions: { h: 20, w: 15, d: 12, unit: 'cm' }, sku: 'GDF-20', stock: 8, priceOverride: 3450, },
    ],
    category: 'Figurines',
    categorySlug: 'figurines',
    roomTags: ['living-room', 'bedroom'],
    ratingAvg: 4.8,
    ratingCount: 24,
    stock: 20,
    isFeatured: true,
    isActive: true,
    isNewArrival: true,
    createdAt: '2024-09-15T00:00:00Z',
    updatedAt: '2024-09-20T00:00:00Z',
  },
  {
    _id: '2',
    title: 'Minimalist Ceramic Vase Set',
    slug: 'minimalist-ceramic-vase-set',
    description: 'A trio of matte ceramic vases in earthy tones. Each piece stands beautifully alone or as part of the complete set.',
    materialNotes: 'Handmade ceramic with matte glaze finish. Each piece is unique.',
    images: [
      { url: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop', angleLabel: 'front' },
      { url: 'https://picsum.photos/seed/showpiece_3/600/600', angleLabel: 'side' },
      { url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 1850,
    compareAtPrice: 2400,
    discountPercent: 23,
    variants: [
      { label: '12 × 8 cm (Set of 3)', dimensions: { h: 12, w: 8, unit: 'cm' }, sku: 'MCV-12', stock: 15, },
      { label: '18 × 12 cm (Set of 3)', dimensions: { h: 18, w: 12, unit: 'cm' }, sku: 'MCV-18', stock: 6, priceOverride: 2850, },
    ],
    category: 'Vases & Pots',
    categorySlug: 'vases-pots',
    roomTags: ['living-room', 'bedroom', 'entryway'],
    ratingAvg: 4.9,
    ratingCount: 18,
    stock: 21,
    isFeatured: true,
    isActive: true,
    createdAt: '2024-09-10T00:00:00Z',
    updatedAt: '2024-09-18T00:00:00Z',
  },
  {
    _id: '3',
    title: 'Abstract Metal Wall Art — Sunrise',
    slug: 'abstract-metal-wall-art-sunrise',
    description: 'A breathtaking abstract metal wall piece with radiant golden and copper tones, evoking a Dhaka sunrise over the Buriganga.',
    materialNotes: 'Hand-forged iron with powder-coated finish. Rust-resistant.',
    images: [
      { url: 'https://picsum.photos/seed/showpiece_4/600/600', angleLabel: 'front' },
      { url: 'https://picsum.photos/seed/showpiece_5/600/600', angleLabel: 'angle' },
      { url: 'https://images.unsplash.com/photo-1596900779744-2bdc4a90509a?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 4500,
    compareAtPrice: 5800,
    discountPercent: 22,
    variants: [
      { label: '40 × 40 cm', dimensions: { h: 40, w: 40, d: 3, unit: 'cm' }, sku: 'AMW-40', stock: 5, },
      { label: '60 × 60 cm', dimensions: { h: 60, w: 60, d: 5, unit: 'cm' }, sku: 'AMW-60', stock: 3, priceOverride: 7200, },
    ],
    category: 'Wall Decor',
    categorySlug: 'wall-decor',
    roomTags: ['living-room', 'office-desk'],
    ratingAvg: 4.7,
    ratingCount: 12,
    stock: 8,
    isFeatured: true,
    isActive: true,
    isNewArrival: true,
    createdAt: '2024-09-12T00:00:00Z',
    updatedAt: '2024-09-19T00:00:00Z',
  },
  {
    _id: '4',
    title: 'Marble & Brass Tabletop Tray Set',
    slug: 'marble-brass-tabletop-tray-set',
    description: 'Luxurious marble tray with brass accents and matching coasters. The perfect centrepiece for a styled coffee table.',
    materialNotes: 'Natural white marble with brushed brass handles. Minor veining variations are natural and unique.',
    images: [
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop', angleLabel: 'front' },
      { url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&h=600&fit=crop', angleLabel: 'top' },
      { url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 3200,
    compareAtPrice: 4000,
    discountPercent: 20,
    variants: [
      { label: '25 × 15 × 5 cm', dimensions: { h: 5, w: 25, d: 15, unit: 'cm' }, sku: 'MBT-25', stock: 10, },
    ],
    category: 'Tabletop Sets',
    categorySlug: 'tabletop-sets',
    roomTags: ['living-room', 'bedroom'],
    ratingAvg: 4.9,
    ratingCount: 31,
    stock: 10,
    isFeatured: true,
    isActive: true,
    createdAt: '2024-09-08T00:00:00Z',
    updatedAt: '2024-09-17T00:00:00Z',
  },
  {
    _id: '5',
    title: 'Crystal Lotus Candle Holder',
    slug: 'crystal-lotus-candle-holder',
    description: 'An exquisite crystal lotus bloom that catches and scatters light beautifully. Use with tea-light candles for a magical evening ambiance.',
    materialNotes: 'K9 crystal glass, machine-cut facets for maximum light refraction.',
    images: [
      { url: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&h=600&fit=crop', angleLabel: 'front' },
      { url: 'https://picsum.photos/seed/showpiece_6/600/600', angleLabel: 'side' },
      { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 1250,
    compareAtPrice: 1600,
    discountPercent: 22,
    variants: [
      { label: '8 × 8 × 5 cm', dimensions: { h: 5, w: 8, d: 8, unit: 'cm' }, sku: 'CLC-8', stock: 20, },
      { label: '12 × 12 × 7 cm', dimensions: { h: 7, w: 12, d: 12, unit: 'cm' }, sku: 'CLC-12', stock: 14, priceOverride: 1850, },
    ],
    category: 'Candle Holders',
    categorySlug: 'candle-holders',
    roomTags: ['living-room', 'bedroom', 'entryway'],
    ratingAvg: 4.6,
    ratingCount: 9,
    stock: 34,
    isFeatured: false,
    isActive: true,
    isNewArrival: true,
    createdAt: '2024-09-18T00:00:00Z',
    updatedAt: '2024-09-22T00:00:00Z',
  },
  {
    _id: '6',
    title: 'Zen Buddha Meditation Figure',
    slug: 'zen-buddha-meditation-figure',
    description: 'A serene meditating Buddha figure in weathered stone finish. Brings peace and mindfulness to any space.',
    materialNotes: 'Polyresin with hand-applied stone-wash patina.',
    images: [
      { url: 'https://picsum.photos/seed/showpiece_7/600/600', angleLabel: 'front' },
      { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop', angleLabel: 'side' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 1950,
    variants: [
      { label: '15 × 10 × 10 cm', dimensions: { h: 15, w: 10, d: 10, unit: 'cm' }, sku: 'ZBM-15', stock: 18, },
      { label: '25 × 18 × 15 cm', dimensions: { h: 25, w: 18, d: 15, unit: 'cm' }, sku: 'ZBM-25', stock: 7, priceOverride: 3200, },
    ],
    category: 'Spiritual Pieces',
    categorySlug: 'spiritual-pieces',
    roomTags: ['living-room', 'bedroom', 'office-desk'],
    ratingAvg: 4.8,
    ratingCount: 15,
    stock: 25,
    isFeatured: true,
    isActive: true,
    createdAt: '2024-09-05T00:00:00Z',
    updatedAt: '2024-09-14T00:00:00Z',
  },
  {
    _id: '7',
    title: 'Vintage Globe & Compass Desk Set',
    slug: 'vintage-globe-compass-desk-set',
    description: 'A beautifully detailed miniature globe paired with an antique-style compass. Perfect for the bookshelf or study desk of a curious mind.',
    materialNotes: 'Die-cast zinc alloy with antique brass plating.',
    images: [
      { url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=600&fit=crop', angleLabel: 'front' },
      { url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=600&fit=crop', angleLabel: 'side' },
      { url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 1800,
    compareAtPrice: 2200,
    discountPercent: 18,
    variants: [
      { label: '10 × 10 × 15 cm', dimensions: { h: 15, w: 10, d: 10, unit: 'cm' }, sku: 'VGC-10', stock: 22, },
    ],
    category: 'Miniatures',
    categorySlug: 'miniatures',
    roomTags: ['office-desk', 'living-room'],
    ratingAvg: 4.5,
    ratingCount: 11,
    stock: 22,
    isFeatured: false,
    isActive: true,
    createdAt: '2024-09-02T00:00:00Z',
    updatedAt: '2024-09-10T00:00:00Z',
  },
  {
    _id: '8',
    title: 'Handmade Terracotta Planter Trio',
    slug: 'handmade-terracotta-planter-trio',
    description: 'Three uniquely shaped terracotta planters with a rustic, earthy aesthetic. Ideal for succulents or dried flowers.',
    materialNotes: 'Hand-thrown terracotta clay, kiln-fired at 1000°C. Natural colour variations.',
    images: [
      { url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop', angleLabel: 'front' },
      { url: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop', angleLabel: 'top' },
      { url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 980,
    compareAtPrice: 1200,
    discountPercent: 18,
    variants: [
      { label: '10 × 10 × 12 cm (Set of 3)', dimensions: { h: 12, w: 10, d: 10, unit: 'cm' }, sku: 'HTP-10', stock: 30, },
    ],
    category: 'Vases & Pots',
    categorySlug: 'vases-pots',
    roomTags: ['living-room', 'bedroom', 'entryway', 'office-desk'],
    ratingAvg: 4.4,
    ratingCount: 7,
    stock: 30,
    isFeatured: false,
    isActive: true,
    createdAt: '2024-08-28T00:00:00Z',
    updatedAt: '2024-09-05T00:00:00Z',
  },
  {
    _id: '9',
    title: 'Geometric Gold Wire Sculpture',
    slug: 'geometric-gold-wire-sculpture',
    description: 'A modern geometric wire sculpture in brushed gold. An artful focal point that bridges minimalism and luxury.',
    materialNotes: 'Steel wire with electroplated gold finish.',
    images: [
      { url: 'https://picsum.photos/seed/showpiece_8/600/600', angleLabel: 'front' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop', angleLabel: 'angle' },
      { url: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 2800,
    compareAtPrice: 3500,
    discountPercent: 20,
    variants: [
      { label: '20 × 20 × 25 cm', dimensions: { h: 25, w: 20, d: 20, unit: 'cm' }, sku: 'GGW-20', stock: 9, },
    ],
    category: 'Figurines',
    categorySlug: 'figurines',
    roomTags: ['living-room', 'office-desk'],
    ratingAvg: 4.7,
    ratingCount: 14,
    stock: 9,
    isFeatured: true,
    isActive: true,
    isNewArrival: true,
    createdAt: '2024-09-20T00:00:00Z',
    updatedAt: '2024-09-22T00:00:00Z',
  },
  {
    _id: '10',
    title: 'Rustic Wooden Photo Frame Set',
    slug: 'rustic-wooden-photo-frame-set',
    description: 'A set of five wooden photo frames in varying sizes with a distressed oak finish. Create a gallery wall effortlessly.',
    materialNotes: 'Reclaimed mango wood with hand-applied distressing.',
    images: [
      { url: 'https://picsum.photos/seed/showpiece_9/600/600', angleLabel: 'front' },
      { url: 'https://picsum.photos/seed/showpiece_3/600/600', angleLabel: 'side' },
      { url: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 1500,
    compareAtPrice: 1900,
    discountPercent: 21,
    variants: [
      { label: 'Mixed sizes (Set of 5)', dimensions: { h: 25, w: 20, d: 2, unit: 'cm' }, sku: 'RWP-SET', stock: 16, },
    ],
    category: 'Wall Decor',
    categorySlug: 'wall-decor',
    roomTags: ['living-room', 'bedroom', 'entryway'],
    ratingAvg: 4.3,
    ratingCount: 8,
    stock: 16,
    isFeatured: false,
    isActive: true,
    createdAt: '2024-08-25T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z',
  },
  {
    _id: '11',
    title: 'Premium Crystal Swan Pair',
    slug: 'premium-crystal-swan-pair',
    description: 'A pair of crystal swans symbolizing love and commitment. An exquisite gift for weddings and anniversaries.',
    materialNotes: 'Hand-cut K9 crystal glass with frosted detailing.',
    images: [
      { url: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&h=600&fit=crop', angleLabel: 'front' },
      { url: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=600&h=600&fit=crop', angleLabel: 'side' },
      { url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 3800,
    compareAtPrice: 4500,
    discountPercent: 16,
    variants: [
      { label: '12 × 8 × 10 cm', dimensions: { h: 10, w: 12, d: 8, unit: 'cm' }, sku: 'PCS-12', stock: 11, },
    ],
    category: 'Gift Showpieces',
    categorySlug: 'gift-showpieces',
    roomTags: ['living-room', 'bedroom', 'gifting'],
    ratingAvg: 4.9,
    ratingCount: 27,
    stock: 11,
    isFeatured: true,
    isActive: true,
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-09-15T00:00:00Z',
  },
  {
    _id: '12',
    title: 'Miniature Vintage Typewriter',
    slug: 'miniature-vintage-typewriter',
    description: 'A charming miniature typewriter replica with working keys. A nostalgic desk accent for writers and dreamers.',
    materialNotes: 'Die-cast metal with painted details. Keys press down realistically.',
    images: [
      { url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=600&fit=crop', angleLabel: 'front' },
      { url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=600&fit=crop', angleLabel: 'angle' },
      { url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&h=600&fit=crop', angleLabel: 'in-room' },
    ],
    price: 1450,
    variants: [
      { label: '8 × 6 × 5 cm', dimensions: { h: 5, w: 8, d: 6, unit: 'cm' }, sku: 'MVT-8', stock: 19, },
    ],
    category: 'Miniatures',
    categorySlug: 'miniatures',
    roomTags: ['office-desk', 'living-room', 'gifting'],
    ratingAvg: 4.6,
    ratingCount: 13,
    stock: 19,
    isFeatured: false,
    isActive: true,
    isNewArrival: true,
    createdAt: '2024-09-19T00:00:00Z',
    updatedAt: '2024-09-22T00:00:00Z',
  },
];

// ==================== BANNERS ====================
export const banners: Banner[] = [
  {
    _id: 'b1',
    title: 'New Arrivals Collection',
    subtitle: 'Discover our latest curated showpieces',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1400&h=600&fit=crop',
    linkTarget: '/shop-all?filter=new-arrivals',
    isActive: true,
    sortOrder: 1,
    type: 'hero',
  },
  {
    _id: 'b2',
    title: 'Eid Collection — 30% Off',
    subtitle: 'Transform every corner for the festive season',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&h=600&fit=crop',
    linkTarget: '/shop-all',
    isActive: true,
    sortOrder: 2,
    type: 'hero',
  },
  {
    _id: 'b3',
    title: 'Gift Something Memorable',
    subtitle: 'Showpieces that say what words cannot',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1400&h=600&fit=crop',
    linkTarget: '/categories/gift-showpieces',
    isActive: true,
    sortOrder: 3,
    type: 'hero',
  },
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find(r => r.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug && p.isActive);
}

export function getProductsByRoom(roomSlug: string): Product[] {
  return products.filter(p => p.roomTags.includes(roomSlug) && p.isActive);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured && p.isActive);
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.isNewArrival && p.isActive);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.isActive && (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.materialNotes?.toLowerCase().includes(q)
    )
  );
}
