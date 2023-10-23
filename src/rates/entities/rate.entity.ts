import { ApiProperty } from '@nestjs/swagger'
import { AbstraitEntity } from 'src/common/entities/entity.entity'
import { Note } from 'src/notes/entities/note.entity'
import { Question } from 'src/questions/entities/question.entity'
import { User } from 'src/users/entities/user.entity'
import { Check, Column, Entity, ManyToOne } from 'typeorm'

@Entity()
@Check(`"rate" > 0 AND "rate" <= 5`)
export class Rate extends AbstraitEntity {
  @ApiProperty()
  @Column({ nullable: false, type: 'integer' })
  rate: number

  @ApiProperty()
  @ManyToOne(() => User, user => user.rates, { onDelete: 'SET NULL' })
  user: User

  @ApiProperty()
  @ManyToOne(() => Note, note => note.rates, { onDelete: 'SET NULL' })
  note: Note

  @ApiProperty()
  @ManyToOne(() => Question, question => question.rates, {
    onDelete: 'CASCADE',
  })
  question: Question
}
