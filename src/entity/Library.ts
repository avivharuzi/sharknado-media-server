import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Folder } from './Folder';
import { LibraryType } from '../modules/Library/Shared/LibraryType';

@Entity()
export class Library {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  type: LibraryType;

  @Column('simple-array')
  paths: string[];

  @OneToMany(type => Folder, folder => folder.library)
  folders: Folder[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
