import { CommonAttribute } from 'src/common';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'reports' })
export class IReport extends CommonAttribute {
  @Generated('uuid')
  @Column('uuid', { name: 'id', primary: true })
  id: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Partial<User>;

  @Column('varchar', { name: 'address', nullable: true })
  address: string;

  @Column('varchar', { name: 'state', nullable: true })
  state?: string;

  @Column('varchar', { name: 'district', nullable: true })
  district: string;

  @Column('varchar', { name: 'municipality', nullable: true })
  municipality?: string;

  @Column('int', { name: 'ward', nullable: true })
  ward?: number;

  @Column('varchar', { name: 'impact', nullable: false })
  impact: string;

  @Column('varchar', { name: 'image', nullable: true })
  image?: string;

  @Column('varchar', { name: 'disaster', nullable: true })
  disaster: string;
}
