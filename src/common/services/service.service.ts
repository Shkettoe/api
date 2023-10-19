import { Injectable } from '@nestjs/common'
import { FindOneOptions, Repository } from 'typeorm'
import { AbstraitEntity } from '../entities/entity.entity'

@Injectable()
export abstract class AbstraitService<Entity extends AbstraitEntity> {
  constructor(protected readonly repository: Repository<Entity>) {}

  async findAll(): Promise<Entity[]> {
    const res = await this.repository.find()
    return res
  }

  async findOne(id: number): Promise<Entity> {
    const res = await this.repository.findOne({
      where: { id },
    } as FindOneOptions<Entity>)
    return res
  }
}
