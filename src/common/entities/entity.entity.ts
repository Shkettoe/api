import { ApiProperty } from '@nestjs/swagger'
import {
  CreateDateColumn,
  ObjectLiteral,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export abstract class AbstraitEntity implements ObjectLiteral {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date
}
