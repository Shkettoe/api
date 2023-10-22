import { AbstraitEntity } from 'src/common/entities/entity.entity'
import { Question } from 'src/questions/entities/question.entity'
import { Rate } from 'src/rates/entities/rate.entity'
import { UserNoteSetting } from 'src/user-note-settings/entities/user-note-setting.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class Note extends AbstraitEntity {
  @Column({ nullable: false, unique: true })
  title: string

  @ManyToOne(() => User, user => user.notes, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  user: User

  @OneToMany(() => Question, question => question.note, { eager: true })
  questions: Question[]

  @OneToMany(() => Rate, rate => rate.note)
  rates: Rate[]

  @OneToMany(() => UserNoteSetting, uns => uns.note)
  settings: UserNoteSetting[]
}
