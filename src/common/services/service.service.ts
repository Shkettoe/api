import { Injectable } from '@nestjs/common'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { AbstraitEntity } from '../entities/entity.entity'

@Injectable()
export abstract class AbstraitService<Entity extends AbstraitEntity> {
  constructor(protected readonly repository: Repository<Entity>) {}

  async findAll(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    const res = await this.repository.find(options)
    return res
  }

  async findOne(id: number, relations?: string[]): Promise<Entity> {
    const res = await this.repository
      .findOneOrFail({
        where: { id },
        relations,
      } as FindOneOptions<Entity>)
      .catch(message => {
        throw new Error(message)
      })
    return res
  }

  async findBy(options?: FindOneOptions<Entity>): Promise<Entity> {
    const res = await this.repository.findOne(options)
    return res
  }
}
