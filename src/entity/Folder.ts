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
  id: number;

  @Column()
  path: string;

  @ManyToOne(type => Library, library => library.folders)
  library: Library;

  @OneToMany(type => File, file => file.folder)
  files: File[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
