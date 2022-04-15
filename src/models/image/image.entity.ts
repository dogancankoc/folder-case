import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, DeleteDateColumn } from 'typeorm';


@Entity('image')
@Tree("materialized-path")
export class ImageEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  imageName: string;

  @Column()
  imageFolder: string;

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

}
/*
//TODO
image ile folder ilişkisi kurulacak
image description
image uzantısı vs eklenecen
*/