const fs = require('fs');

let data = fs.readFileSync('lib/data.ts', 'utf8');

// Update category images
const categoryImages = {
  'figurines': 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
  'vases-pots': 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80',
  'wall-decor': 'https://images.unsplash.com/photo-1582738412259-6092b46daee1?w=800&q=80',
  'tabletop-sets': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  'gift-showpieces': 'https://images.unsplash.com/photo-1616627577385-5c0c4dab55a5?w=800&q=80',
  'spiritual-pieces': 'https://images.unsplash.com/photo-1578500351865-d6c7706e4029?w=800&q=80',
  'miniatures': 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80',
  'candle-holders': 'https://images.unsplash.com/photo-1596900779744-2bdc4a90509a?w=800&q=80',
};

// Update room images
const roomImages = {
  'living-room': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
  'bedroom': 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
  'office-desk': 'https://images.unsplash.com/photo-1581783898382-80983a8d8617?w=800&q=80',
  'entryway': 'https://images.unsplash.com/photo-1597226044537-a4acab4b8c56?w=800&q=80',
  'gifting': 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&q=80',
};

for (const [slug, url] of Object.entries(categoryImages)) {
  data = data.replace(new RegExp(`image: '\\/images\\/categories\\/.*?\\.jpg'(?=[\\s\\S]*?slug: '${slug}')|(?<=slug: '${slug}'[\\s\\S]*?)image: '\\/images\\/categories\\/.*?\\.jpg'`, 'g'), `image: '${url}'`);
}

for (const [slug, url] of Object.entries(roomImages)) {
  data = data.replace(new RegExp(`image: '\\/images\\/rooms\\/.*?\\.jpg'(?=[\\s\\S]*?slug: '${slug}')|(?<=slug: '${slug}'[\\s\\S]*?)image: '\\/images\\/rooms\\/.*?\\.jpg'`, 'g'), `image: '${url}'`);
}

// Ensure first product has exact slug 
data = data.replace(`slug: 'golden-deer-couple'`, `slug: 'golden-deer-couple-figurine'`);
data = data.replace(`slug: 'abstract-metal-wall-art'`, `slug: 'abstract-metal-wall-art-sunrise'`);

fs.writeFileSync('lib/data.ts', data);
