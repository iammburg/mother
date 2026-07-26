// src/services/session.server.ts
import { useSession } from '@tanstack/react-start/server'
import type { UserModel as User } from '~/prisma-generated/models/User'

type SessionUser = {
  userEmail: User['email']
}

export function useAppSession() {
  return useSession<SessionUser>({
    password: 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
  })
}
