import { IsEmail, Min, Max, Validate, validate, IsLowercase } from 'class-validator'
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany,
  PrimaryColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm'
import { Playlist } from 'entities'
import { IsValidPassword } from 'utility/validation'
const shortid = require('shortid')

@Entity('users')
export class User {

  @PrimaryColumn('varchar', {
    default: shortid.generate(),
    length: 14
  })
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Validate(IsValidPassword)
  @Column()
  password: string

  @OneToMany(type => Playlist, playlist => playlist.owner)
  playlists: Playlist[]

  @IsEmail({}, {
    message: 'An email address is required.'
  })
  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  name: string

  @Column('varchar', { array: true })
  subscribedPodcastIds: string[]

  @BeforeInsert()
  beforeInsert () {
    this.id = shortid.generate()
    this.subscribedPodcastIds = this.subscribedPodcastIds || []
  }

}
