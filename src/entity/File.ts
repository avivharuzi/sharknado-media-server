import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Folder } from './Folder';
import { Metadata } from './Metadata';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Folder, folder => folder.files)
  folder: Folder;

  @OneToOne(type => Metadata)
  @JoinColumn()
  metadata: Metadata;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
