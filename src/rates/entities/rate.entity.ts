import { AbstraitEntity } from 'src/common/entities/entity.entity'
import { Note } from 'src/notes/entities/note.entity'
import { Question } from 'src/questions/entities/question.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class Rate extends AbstraitEntity {
  @Column({ nullable: false, type: 'integer' })
  rate: number

  @ManyToOne(() => User, user => user.rates, { onDelete: 'SET NULL' })
  user: User

  @ManyToOne(() => Note, note => note.rates, { onDelete: 'SET NULL' })
  note: Note

  @ManyToOne(() => Question, question => question.rates, {
    onDelete: 'CASCADE',
  })
  question: Question
}
