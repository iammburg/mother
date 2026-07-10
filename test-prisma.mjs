import 'dotenv/config'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from './src/prisma-generated/client'

const url = process.env.DATABASE_URL || 'file:./dev.db'
console.log('DATABASE_URL:', url)

async function main() {
  try {
    const adapter = new PrismaLibSql({ url })
    console.log('✓ Adapter created')

    const prisma = new PrismaClient({ adapter })
    console.log('✓ PrismaClient created')

    await prisma.$connect()
    console.log('✓ Connected to database')

    const users = await prisma.user.findMany()
    console.log('✓ Users:', users)
  } catch (err) {
    console.error('✗ Error:', err.message)
    console.error(err.stack?.split('\n').slice(0, 15).join('\n'))
  }
}

main()
