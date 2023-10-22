import { ApiProperty } from '@nestjs/swagger'
import { AbstraitEntity } from 'src/common/entities/entity.entity'
import { Question } from 'src/questions/entities/question.entity'
import { Rate } from 'src/rates/entities/rate.entity'
import { UserNoteSetting } from 'src/user-note-settings/entities/user-note-setting.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class Note extends AbstraitEntity {
  @Column({ nullable: false, unique: true })
  @ApiProperty()
  title: string

  @ManyToOne(() => User, user => user.notes, {
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  user: User

  @OneToMany(() => Question, question => question.note, { eager: true })
  @ApiProperty()
  questions: Question[]

  @OneToMany(() => Rate, rate => rate.note)
  @ApiProperty()
  rates: Rate[]

  @OneToMany(() => UserNoteSetting, uns => uns.note)
  @ApiProperty()
  settings: UserNoteSetting[]
}
