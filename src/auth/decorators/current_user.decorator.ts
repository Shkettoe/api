import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Request } from 'express'

/**
 * en.
 * this decorator simplifies the process of getting current user further
 * by allowing me to simply put it into the parameters of an api route
 * instead of using an entire Request object
 * =================================================================
 * ta dekorator dodatno poenostavlja proces pridobivanja trenutneka
 * uporabnika tako da mi omogoči da njega uporabljam v api callu
 * namesto celega Request objekta
 */

export const CurrentUser = createParamDecorator(
  (d: never, context: ExecutionContext) => {
    const { current_user } = context.switchToHttp().getRequest<Request>()
    return current_user || new ForbiddenException('user is not logged in')
  },
)
