import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  Tree, TreeChildren, 
  TreeParent, 
  DeleteDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { FolderEntity } from '../folder/folder.entity';


@Entity('image')
@Tree("materialized-path")
export class ImageEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  folderId: string;

  @Column({ nullable: true })
  imageName: string;

  @Column()
  imagePath: string;

  @Column()
  imageProperties: string;

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
  children: ImageEntity[];

  @TreeParent()
  parent: ImageEntity;

  @ManyToOne(() => FolderEntity, folder => folder.id)
  @JoinColumn()
  folder: FolderEntity

}
