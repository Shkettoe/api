import { AbstraitEntity } from 'src/common/entities/entity.entity'
import { Note } from 'src/notes/entities/note.entity'
import { Rate } from 'src/rates/entities/rate.entity'
import { UserQuestionState } from 'src/user-question-states/entities/user-question-state.entity'
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class Question extends AbstraitEntity {
  @Column({ nullable: false })
  question: string

  @Column({ nullable: false })
  answer: string

  @ManyToOne(() => Note, note => note.questions, {
    onDelete: 'CASCADE',
  })
  note: Note

  @OneToMany(() => Rate, rate => rate.question, { eager: true })
  rates: Rate[]

  @OneToMany(() => UserQuestionState, uqs => uqs.question)
  finished_by_users: UserQuestionState[]
}
