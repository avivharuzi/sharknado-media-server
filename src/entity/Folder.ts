import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { File } from './File';
import { Library } from './Library';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({
    nullable: true,
  })
  summary: string;

  @Column({
    nullable: true,
  })
  poster: string;

  @Column({
    nullable: true,
  })
  background: string;

  @ManyToOne(type => Library, library => library.folders)
  library: Library;

  @OneToMany(type => File, file => file.folder)
  files: File[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
