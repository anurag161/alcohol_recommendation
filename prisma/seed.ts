import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const brands = [
  {
    name: 'Johnnie Walker Black Label',
    category: 'Whiskey',
    abv: 40.0,
    rating: 4.5,
    quality: 'Premium',
    region: 'Delhi'
  },
  {
    name: 'Grey Goose Vodka',
    category: 'Vodka',
    abv: 40.0,
    rating: 4.7,
    quality: 'Luxury',
    region: 'Bangalore'
  },
  {
    name: 'Havana Club 7 Años',
    category: 'Rum',
    abv: 40.0,
    rating: 4.3,
    quality: 'Premium',
    region: 'Goa'
  },
  {
    name: 'Glenfiddich 12 Year Old',
    category: 'Whiskey',
    abv: 40.0,
    rating: 4.6,
    quality: 'Luxury',
    region: 'Mumbai'
  },
  {
    name: 'Hendrick\'s Gin',
    category: 'Gin',
    abv: 41.4,
    rating: 4.5,
    quality: 'Premium',
    region: 'Bangalore'
  },
  {
    name: 'Patrón Silver Tequila',
    category: 'Tequila',
    abv: 40.0,
    rating: 4.8,
    quality: 'Luxury',
    region: 'Delhi'
  },
  {
    name: 'Chivas Regal 12 Year Old',
    category: 'Whiskey',
    abv: 40.0,
    rating: 4.4,
    quality: 'Premium',
    region: 'Chennai'
  },
  {
    name: 'Belvedere Vodka',
    category: 'Vodka',
    abv: 40.0,
    rating: 4.6,
    quality: 'Luxury',
    region: 'Kolkata'
  },
  {
    name: 'Jack Daniel\'s Tennessee Whiskey',
    category: 'Whiskey',
    abv: 40.0,
    rating: 4.2,
    quality: 'Standard',
    region: 'Pune'
  },
  {
    name: 'Bombay Sapphire Gin',
    category: 'Gin',
    abv: 47.0,
    rating: 4.4,
    quality: 'Premium',
    region: 'Hyderabad'
  }
]

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.brand.deleteMany({})
  console.log('✨ Cleared existing brands')

  // Seed brands
  for (const brand of brands) {
    await prisma.brand.create({
      data: brand
    })
    console.log(`✅ Created brand: ${brand.name}`)
  }

  console.log('🎉 Database seeding completed!')
  console.log(`📊 Total brands created: ${brands.length}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
