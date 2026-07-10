import crypto from 'node:crypto'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '../prisma-generated/client'

// Lazy singleton — avoids engine initialization at module-import time,
// which can fail in certain SSR / dev-server environments.
let _prismaClient: PrismaClient | null = null

export function getPrismaClient(): PrismaClient {
  if (!_prismaClient) {
    const adapter = new PrismaLibSql({
      url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
    })
    _prismaClient = new PrismaClient({ adapter })
  }
  return _prismaClient
}

export function hashPassword(password: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, 'salt', 100000, 64, 'sha256', (err, derivedKey) => {
      if (err) {
        reject(err)
      } else {
        resolve(derivedKey.toString('hex'))
      }
    })
  })
}
