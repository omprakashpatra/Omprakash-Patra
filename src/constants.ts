import { Fertilizer, Machinery, MarketPrice } from './types';

export const FERTILIZERS: Fertilizer[] = [
  {
    id: 'f1',
    name: 'Urea',
    type: 'Nitrogenous',
    timing: 'Basal and Top Dressing',
    description: 'Highly soluble and provides immediate nitrogen to crops.',
    benefits: ['Promotes green leafy growth', 'Essential for protein synthesis'],
    crops: ['Wheat', 'Rice', 'Maize', 'Sugarcane'],
    image: 'https://picsum.photos/seed/urea/400/300'
  },
  {
    id: 'f2',
    name: 'DAP (Diammonium Phosphate)',
    type: 'Phosphatic',
    timing: 'At the time of sowing',
    description: 'Excellent source of Phosphorus and Nitrogen for root development.',
    benefits: ['Strong root growth', 'Enables flowering and fruiting'],
    crops: ['Soybean', 'Cotton', 'Mustard', 'Pulses'],
    image: 'https://picsum.photos/seed/dap/400/300'
  },
  {
    id: 'f3',
    name: 'MOP (Muriate of Potash)',
    type: 'Potassic',
    timing: 'Basal or split application',
    description: 'Source of Potassium for overall plant health and disease resistance.',
    benefits: ['Increases crop quality', 'Drought resistance', 'Strengthens stalks'],
    crops: ['Potato', 'Sugarcane', 'Fruit Crops'],
    image: 'https://picsum.photos/seed/mop/400/300'
  }
];

export const MACHINERY: Machinery[] = [
  {
    id: 'm1',
    name: 'Mahindra Arjun Novo',
    type: 'Tractor',
    description: 'High-performance tractor for heavy-duty farming operations.',
    priceRange: '₹7.5L - ₹9.0L',
    image: 'https://picsum.photos/seed/tractor/600/400'
  },
  {
    id: 'm2',
    name: 'Fiona Combine Harvester',
    type: 'Harvester',
    description: 'Efficiently harvests, threshes, and cleans grain crops.',
    priceRange: '₹15L - ₹25L',
    image: 'https://picsum.photos/seed/harvester/600/400'
  },
  {
    id: 'm3',
    name: 'Power Tiller',
    type: 'Tiller',
    description: 'Versatile walk-behind machine for tilling small to medium plots.',
    priceRange: '₹1.5L - ₹2.5L',
    image: 'https://picsum.photos/seed/tiller/600/400'
  }
];

export const INITIAL_MARKET_PRICES: MarketPrice[] = [
  {
    id: 'p1',
    crop: 'Wheat (Gehun)',
    price: 2450,
    unit: 'Quintal (100kg)',
    location: 'Indore Mandi',
    updatedAt: new Date()
  },
  {
    id: 'p2',
    crop: 'Rice (Basmati)',
    price: 3800,
    unit: 'Quintal (100kg)',
    location: 'Karnal Mandi',
    updatedAt: new Date()
  },
  {
    id: 'p3',
    crop: 'Onion (Pyaz)',
    price: 1800,
    unit: 'Quintal (100kg)',
    location: 'Lasalgaon Mandi',
    updatedAt: new Date()
  },
  {
    id: 'p4',
    crop: 'Potato (Aloo)',
    price: 1200,
    unit: 'Quintal (100kg)',
    location: 'Agra Mandi',
    updatedAt: new Date()
  }
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' }
];
