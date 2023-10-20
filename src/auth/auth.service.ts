import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

class Bcryption {
  // takes in input and returns a hash of it with a pinch of salt
  async hash(input: string) {
    const salt = await bcrypt.genSalt(13)
    input = `${salt}|${await bcrypt.hash(input, salt)}`
    return input
  }

  // compares the hash of an inputed string against the hash from the comparator
  async dehash(comparator: string, input: string) {
    const [salt, hash] = comparator.split('|')
    input = await bcrypt.hashSync(input, salt)
    return hash == input
  }
}

interface AuthorizationReturn {
  jwt: string
  user: User
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  bcryption = new Bcryption()

  //logs user in
  async login(email: string, password: string) {
    const user = await this.usersService.findBy({ where: { email } })
    if (!(await this.bcryption.dehash(user.password, password)))
      throw new Error('incorrect password')
    return { jwt: await this.jwtService.sign({ sub: user.id }), user }
  }

  // registers a user
  async register(createUserDto: CreateUserDto): Promise<AuthorizationReturn> {
    createUserDto.password = await this.bcryption.hash(createUserDto.password)
    const user: User = await this.usersService.create(createUserDto)
    return { jwt: await this.jwtService.sign({ sub: user.id }), user }
  }
}
