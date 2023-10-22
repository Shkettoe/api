import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty()
  email: string

  @Column({ nullable: false })
  @ApiProperty()
  first_name: string

  @Column({ nullable: false })
  @ApiProperty()
  last_name: string

  @Column({ nullable: false })
  @ApiProperty()
  @Exclude()
  password: string

  /**
   * @note use eager to auto load relation
   */
  @OneToMany(() => Note, note => note.user, { eager: true })
  @ApiProperty()
  notes: Note[]

  @OneToMany(() => Rate, rate => rate.user)
  @ApiProperty()
  rates: Rate[]

  @OneToMany(() => UserNoteSetting, uns => uns.user)
  @ApiProperty()
  settings: UserNoteSetting[]

  @OneToMany(() => UserQuestionState, uqs => uqs.user)
  @ApiProperty()
  finished_questions: UserQuestionState[]
}
