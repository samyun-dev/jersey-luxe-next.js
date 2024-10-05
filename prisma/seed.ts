import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      name: 'Home Jersey 2023',
      description: 'Official home jersey for the 2023 season',
      price: 89.99,
      image: '/images/home-jersey-2023.jpg',
      category: 'Home Jerseys',
    },
    {
      name: 'Away Jersey 2023',
      description: 'Official away jersey for the 2023 season',
      price: 89.99,
      image: '/images/away-jersey-2023.jpg',
      category: 'Away Jerseys',
    },
    {
      name: 'Third Kit 2023',
      description: 'Official third kit for the 2023 season',
      price: 94.99,
      image: '/images/third-kit-2023.jpg',
      category: 'Third Kits',
    },
    {
      name: 'Retro Home Jersey 1990',
      description: 'Replica of the iconic 1990 home jersey',
      price: 79.99,
      image: '/images/retro-home-1990.jpg',
      category: 'Home Jerseys',
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })