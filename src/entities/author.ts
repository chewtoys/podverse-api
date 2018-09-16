import { Episode, MediaRef, Podcast } from 'entities'
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable,
  ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'

const shortid = require('shortid')

@Entity('authors')
export class Author {

  @PrimaryColumn('varchar', {
    default: shortid.generate(),
    length: 14
  })
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(type => Episode)
  @JoinTable()
  episodes: Episode[]

  @ManyToMany(type => MediaRef)
  @JoinTable()
  mediaRefs: MediaRef[]

  @ManyToMany(type => Podcast)
  @JoinTable()
  podcasts: Podcast[]

  @Column({ unique: true })
  name: string

  @Column({ unique: true })
  slug: string

  @BeforeInsert()
  @BeforeUpdate()
  beforeAll () {
    this.slug = this.name.replace(/\s+/g, '-').toLowerCase()
    this.name = this.name.trim()
  }

  @BeforeInsert()
  beforeInsert () {
    this.id = shortid.generate()
  }

}
