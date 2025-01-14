import { CommonAttribute } from 'src/common';
import { IEvent } from 'src/i-event/entity/i-event.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'notifications' })
export class INotification extends CommonAttribute {
  @Generated('uuid')
  @Column('uuid', { name: 'id', primary: true })
  id: string;

  @ManyToOne((type) => IEvent, (event) => event.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: IEvent;

  @Column('varchar', { name: 'title', nullable: true })
  title?: string;

  @Column('varchar', { name: 'description', nullable: true })
  description?: string;
}
