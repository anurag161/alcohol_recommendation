export interface LiquorBrand {
  id: string;
  name: string;
  category: 'Whiskey' | 'Vodka' | 'Rum' | 'Wine' | 'Gin' | 'Tequila' | 'Brandy' | 'Beer';
  subcategory?: string;
  tasteProfile: ('Smoky' | 'Crisp' | 'Fruity' | 'Peaty' | 'Smooth' | 'Bold' | 'Sweet' | 'Dry')[];
  alcoholStrength: number; // percentage
  description: string;
  tastingNote: string;
  pricing: {
    [state: string]: number; // state code -> price in INR
  };
  imageUrl?: string;
  recommendedOccasions: ('Party' | 'Quiet Evening' | 'Gift' | 'Celebration')[];
}

export const liquorDatabase: LiquorBrand[] = [
  {
    id: '1',
    name: 'Johnnie Walker Black Label',
    category: 'Whiskey',
    subcategory: 'Scotch',
    tasteProfile: ['Smoky', 'Smooth'],
    alcoholStrength: 40,
    description: 'A premium blended Scotch whisky with rich, smoky notes and a smooth finish.',
    tastingNote: 'Rich smoke, honey, and dark chocolate with a lingering warmth.',
    pricing: {
      'Delhi': 4200,
      'Bangalore': 4300,
      'Goa': 4100,
      'Maharashtra': 4250,
      'Kerala': 4150,
      'Tamil Nadu': 4180,
      'Karnataka': 4280,
      'Uttar Pradesh': 4120,
      'West Bengal': 4190,
      'Rajasthan': 4100
    },
    recommendedOccasions: ['Quiet Evening', 'Celebration', 'Gift']
  },
  {
    id: '2',
    name: 'Grey Goose Vodka',
    category: 'Vodka',
    tasteProfile: ['Crisp', 'Smooth'],
    alcoholStrength: 40,
    description: 'Ultra-premium French vodka known for its purity and smooth texture.',
    tastingNote: 'Clean, crisp with subtle grain notes and a silky smooth finish.',
    pricing: {
      'Delhi': 5800,
      'Bangalore': 5900,
      'Goa': 5700,
      'Maharashtra': 5850,
      'Kerala': 5750,
      'Tamil Nadu': 5780,
      'Karnataka': 5880,
      'Uttar Pradesh': 5720,
      'West Bengal': 5790,
      'Rajasthan': 5700
    },
    recommendedOccasions: ['Party', 'Celebration']
  },
  {
    id: '3',
    name: 'Havana Club 7 Años',
    category: 'Rum',
    tasteProfile: ['Smooth', 'Sweet'],
    alcoholStrength: 40,
    description: 'Premium Cuban rum aged for 7 years with rich vanilla and caramel notes.',
    tastingNote: 'Smooth vanilla, caramel, and tropical fruits with a warm, lingering finish.',
    pricing: {
      'Delhi': 3200,
      'Bangalore': 3300,
      'Goa': 3100,
      'Maharashtra': 3250,
      'Kerala': 3150,
      'Tamil Nadu': 3180,
      'Karnataka': 3280,
      'Uttar Pradesh': 3120,
      'West Bengal': 3190,
      'Rajasthan': 3100
    },
    recommendedOccasions: ['Party', 'Quiet Evening', 'Celebration']
  },
  {
    id: '4',
    name: 'Glenfiddich 12 Year Old',
    category: 'Whiskey',
    subcategory: 'Single Malt Scotch',
    tasteProfile: ['Smoky', 'Fruity', 'Smooth'],
    alcoholStrength: 40,
    description: 'Single malt Scotch whisky matured for 12 years in oak casks.',
    tastingNote: 'Fresh pear, subtle smoke, and honey with a long, smooth finish.',
    pricing: {
      'Delhi': 6500,
      'Bangalore': 6600,
      'Goa': 6400,
      'Maharashtra': 6550,
      'Kerala': 6450,
      'Tamil Nadu': 6480,
      'Karnataka': 6580,
      'Uttar Pradesh': 6420,
      'West Bengal': 6490,
      'Rajasthan': 6400
    },
    recommendedOccasions: ['Quiet Evening', 'Gift', 'Celebration']
  },
  {
    id: '5',
    name: 'Hendrick\'s Gin',
    category: 'Gin',
    tasteProfile: ['Crisp', 'Fruity'],
    alcoholStrength: 41.4,
    description: 'Premium gin infused with cucumber and rose petals for a unique flavor profile.',
    tastingNote: 'Fresh cucumber, rose petals, and juniper with a crisp, elegant finish.',
    pricing: {
      'Delhi': 4800,
      'Bangalore': 4900,
      'Goa': 4700,
      'Maharashtra': 4850,
      'Kerala': 4750,
      'Tamil Nadu': 4780,
      'Karnataka': 4880,
      'Uttar Pradesh': 4720,
      'West Bengal': 4790,
      'Rajasthan': 4700
    },
    recommendedOccasions: ['Party', 'Quiet Evening']
  },
  {
    id: '6',
    name: 'Patrón Silver Tequila',
    category: 'Tequila',
    tasteProfile: ['Smooth', 'Crisp'],
    alcoholStrength: 40,
    description: 'Ultra-premium 100% agave tequila with a clean, smooth profile.',
    tastingNote: 'Fresh agave, citrus, and mineral notes with a smooth, clean finish.',
    pricing: {
      'Delhi': 7200,
      'Bangalore': 7300,
      'Goa': 7100,
      'Maharashtra': 7250,
      'Kerala': 7150,
      'Tamil Nadu': 7180,
      'Karnataka': 7280,
      'Uttar Pradesh': 7120,
      'West Bengal': 7190,
      'Rajasthan': 7100
    },
    recommendedOccasions: ['Party', 'Celebration']
  },
  {
    id: '7',
    name: 'Chivas Regal 12 Year Old',
    category: 'Whiskey',
    subcategory: 'Blended Scotch',
    tasteProfile: ['Smooth', 'Fruity'],
    alcoholStrength: 40,
    description: 'Premium blended Scotch whisky with a smooth, fruity character.',
    tastingNote: 'Rich fruits, honey, and oak with a smooth, balanced finish.',
    pricing: {
      'Delhi': 3800,
      'Bangalore': 3900,
      'Goa': 3700,
      'Maharashtra': 3850,
      'Kerala': 3750,
      'Tamil Nadu': 3780,
      'Karnataka': 3880,
      'Uttar Pradesh': 3720,
      'West Bengal': 3790,
      'Rajasthan': 3700
    },
    recommendedOccasions: ['Party', 'Quiet Evening', 'Celebration', 'Gift']
  },
  {
    id: '8',
    name: 'Belvedere Vodka',
    category: 'Vodka',
    tasteProfile: ['Crisp', 'Smooth'],
    alcoholStrength: 40,
    description: 'Polish premium vodka made from Dankowskie rye grain.',
    tastingNote: 'Clean, pure rye character with subtle spice and a velvety smooth finish.',
    pricing: {
      'Delhi': 6200,
      'Bangalore': 6300,
      'Goa': 6100,
      'Maharashtra': 6250,
      'Kerala': 6150,
      'Tamil Nadu': 6180,
      'Karnataka': 6280,
      'Uttar Pradesh': 6120,
      'West Bengal': 6190,
      'Rajasthan': 6100
    },
    recommendedOccasions: ['Party', 'Celebration']
  },
  {
    id: '9',
    name: 'Jack Daniel\'s Tennessee Whiskey',
    category: 'Whiskey',
    subcategory: 'Tennessee',
    tasteProfile: ['Smooth', 'Bold'],
    alcoholStrength: 40,
    description: 'Iconic American whiskey with a unique charcoal mellowing process.',
    tastingNote: 'Rich caramel, vanilla, and oak with a smooth, warming finish.',
    pricing: {
      'Delhi': 3500,
      'Bangalore': 3600,
      'Goa': 3400,
      'Maharashtra': 3550,
      'Kerala': 3450,
      'Tamil Nadu': 3480,
      'Karnataka': 3580,
      'Uttar Pradesh': 3420,
      'West Bengal': 3490,
      'Rajasthan': 3400
    },
    recommendedOccasions: ['Party', 'Quiet Evening', 'Celebration']
  },
  {
    id: '10',
    name: 'Bombay Sapphire Gin',
    category: 'Gin',
    tasteProfile: ['Crisp', 'Fruity'],
    alcoholStrength: 47,
    description: 'London dry gin with 10 botanicals for a complex flavor profile.',
    tastingNote: 'Juniper, coriander, and citrus with subtle floral notes and a crisp finish.',
    pricing: {
      'Delhi': 2800,
      'Bangalore': 2900,
      'Goa': 2700,
      'Maharashtra': 2850,
      'Kerala': 2750,
      'Tamil Nadu': 2780,
      'Karnataka': 2880,
      'Uttar Pradesh': 2720,
      'West Bengal': 2790,
      'Rajasthan': 2700
    },
    recommendedOccasions: ['Party', 'Quiet Evening']
  }
];

export const states = [
  'Delhi',
  'Bangalore',
  'Goa',
  'Maharashtra',
  'Kerala',
  'Tamil Nadu',
  'Karnataka',
  'Uttar Pradesh',
  'West Bengal',
  'Rajasthan'
];

export const tasteProfiles = [
  'Smoky',
  'Crisp',
  'Fruity',
  'Peaty',
  'Smooth',
  'Bold',
  'Sweet',
  'Dry'
];

export const occasions = [
  'Party',
  'Quiet Evening',
  'Gift',
  'Celebration'
];
