// Minimal test to see if PrismaClient can be instantiated
import { PrismaLibSql } from '@prisma/adapter-libsql'

// We'll try to create the adapter and see if that works
const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./dev.db',
})
console.log('adapter created successfully')
console.log('adapter provider:', adapter.provider)
