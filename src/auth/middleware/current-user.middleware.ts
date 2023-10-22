import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { NextFunction, Request, Response } from 'express'
import { UsersService } from 'src/users/users.service'

declare global {
  namespace Express {
    interface Request {
      current_user?: User
    }
  }
}

/*
  en.
  this middleware enables api to at any time grab the currently logged
  in user from request anywhere in application

  thanks to this approach, I don't have to inject the jwt and users
  services in every single component that would like to access session data
===========================================================================
  sl.
  ta vmesna programska oprema omogoča APIju da v kateremkoli trenutku pridobi
  podatke o trenutno prijavljenemu uporabniku kjerkoli v aplikaciji

  tako ni potrebno, da bi v vbrizgaval jwt in users servisa v vsaki komponenti
  aplikacije, ki bi rada dostopala do podatkov o seji
*/

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { access_token } = req.cookies
    try {
      const { sub } = await this.jwtService.verify(access_token)
      req.current_user = await this.usersService.findOne(sub)
    } catch (err) {}
    next()
  }
}
