import { CommonAttribute } from 'src/common';
import { IEvent } from 'src/i-event/entity/i-event.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne } from 'typeorm';
import { DonationItemModel } from '../model/donation-item.model';

@Entity({ name: 'donations' })
export class Donation extends CommonAttribute {
  @Generated('uuid')
  @Column('uuid', { name: 'id', primary: true })
  id: string;

  @ManyToOne((type) => IEvent, (event) => event.id)
  @JoinColumn({ name: 'event_id' })
  event: IEvent;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar', { name: 'type', nullable: true })
  type?: string;

  @Column('int', { name: 'amount', default: 0 })
  amount: number;

  @Column('jsonb', { name: 'items', nullable: true })
  items: DonationItemModel[];
}
