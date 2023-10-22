import { ApiProperty } from '@nestjs/swagger'
import { AbstraitEntity } from 'src/common/entities/entity.entity'
import { Note } from 'src/notes/entities/note.entity'
import { Rate } from 'src/rates/entities/rate.entity'
import { UserQuestionState } from 'src/user-question-states/entities/user-question-state.entity'
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class Question extends AbstraitEntity {
  @Column({ nullable: false })
  @ApiProperty()
  question: string

  @Column({ nullable: false })
  @ApiProperty()
  answer: string

  @ManyToOne(() => Note, note => note.questions, {
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  note: Note

  @OneToMany(() => Rate, rate => rate.question, { eager: true })
  @ApiProperty()
  rates: Rate[]

  @OneToMany(() => UserQuestionState, uqs => uqs.question)
  @ApiProperty()
  finished_by_users: UserQuestionState[]
}
