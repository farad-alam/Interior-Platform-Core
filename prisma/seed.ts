import { prisma } from '../src/core/db/client'
import bcrypt from 'bcryptjs'

async function main() {
  const email = 'admin@studiocore.com'
  const password = 'password123'
  
  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      role: 'ADMIN',
    },
  })

  console.log(`Created admin user: ${user.email}`)
  console.log(`Password: ${password}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
