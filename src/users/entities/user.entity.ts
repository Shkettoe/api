import { Exclude } from 'class-transformer'
import { AbstraitEntity } from 'src/common/entities/entity.entity'
import { Note } from 'src/notes/entities/note.entity'
import { Rate } from 'src/rates/entities/rate.entity'
import { UserNoteSetting } from 'src/user-note-settings/entities/user-note-setting.entity'
import { UserQuestionState } from 'src/user-question-states/entities/user-question-state.entity'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity()
export class User extends AbstraitEntity {
  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  first_name: string

  @Column({ nullable: false })
  last_name: string

  @Column({ nullable: false })
  @Exclude()
  password: string

  @OneToMany(() => Note, note => note.user)
  notes: Note[]

  @OneToMany(() => Rate, rate => rate.user)
  rates: Rate[]

  @OneToMany(() => UserNoteSetting, uns => uns.user)
  settings: UserNoteSetting[]

  @OneToMany(() => UserQuestionState, uqs => uqs.user)
  finished_questions: UserQuestionState[]
}
