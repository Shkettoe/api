import { AbstraitEntity } from 'src/common/entities/entity.entity'
import { Note } from 'src/notes/entities/note.entity'
import { User } from 'src/users/entities/user.entity'
import { Entity, ManyToOne } from 'typeorm'

@Entity()
export class UserNoteSetting extends AbstraitEntity {
  @ManyToOne(() => User, user => user.settings)
  user: User

  @ManyToOne(() => Note, note => note.settings)
  note: Note
}
