import ApiService from './api-service'

import type { IAccount } from '../types'

export const UserApiService = new ApiService<IAccount>('user')
