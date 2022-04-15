import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, DeleteDateColumn } from 'typeorm';


@Entity('folder')
@Tree("materialized-path")
export class FolderEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  folderName: string;

  @Column({ default: "" })
  folderPath: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ nullable: true })
  deletedBy: string;

  @TreeChildren()
  children: FolderEntity[];

  @TreeParent()
  parent: FolderEntity;

}
