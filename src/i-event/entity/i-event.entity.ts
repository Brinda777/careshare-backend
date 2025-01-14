import { CommonAttribute } from 'src/common';
import { Column, Entity, Generated } from 'typeorm';

@Entity({ name: 'events' })
export class IEvent extends CommonAttribute {
  @Generated('uuid')
  @Column('uuid', { name: 'id', primary: true })
  id: string;

  @Column('varchar', { name: 'title', nullable: true })
  title?: string;

  @Column('varchar', { name: 'description', nullable: true })
  description?: string;

  @Column('varchar', { name: 'location', nullable: true })
  location: string;

  @Column('varchar', { name: 'impact', nullable: false })
  impact: string;

  @Column('varchar', { name: 'image', nullable: true })
  image?: string;

  @Column('int', { name: 'attendees', default: 0 })
  attendees?: number;

  @Column('varchar', { name: 'disaster', nullable: true })
  disaster?: string;

  @Column('int', { name: 'funds', default: 0 })
  funds?: number;
}
