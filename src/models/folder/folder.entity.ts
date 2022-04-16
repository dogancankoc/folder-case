import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, DeleteDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { ImageEntity } from '../image/image.entity';


@Entity('folder')
@Tree("materialized-path")
export class FolderEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  folderName: string;

  @Column({ default: "" })
  folderPath: string;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Exclude()
  @Column({ nullable: true })
  createdBy: string;

  @Exclude()
  @Column({ nullable: true })
  updatedBy: string;

  @Exclude()
  @Column({ nullable: true })
  deletedBy: string;

  @TreeChildren()
  children: FolderEntity[];

  @TreeParent()
  parent: FolderEntity;

  @OneToMany(() => ImageEntity, image => image.folderId)
  @JoinColumn()
  images: ImageEntity[];

}
