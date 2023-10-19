import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
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

@Injectable()
export class AuthService {
  constructor(
    // private readonly bcryption: Bcryption,
    private readonly usersService: UsersService,
  ) {
    // this.bcryption = new Bcryption()
  }

  //logs user in
  async login(email: string, passwrod: string) {}

  // registers a user
  async register(createUserDto: CreateUserDto) {
    let user: User
  }
}
