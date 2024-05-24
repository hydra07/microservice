import { UserRole } from '@/@types/user.d';
import { RefreshToken } from '@/entity/refreshToken.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('text')
  id?: string;

  @Column('text')
  username?: string;

  @Column('text', { nullable: true })
  email?: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  address?: string;

  @Column('text', { nullable: true })
  avatar?: string;

  @Column('text', { nullable: true, unique: true })
  refreshTokenId?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role?: UserRole;

  @OneToOne(() => RefreshToken)
  @JoinColumn({ name: 'refreshTokenId' })
  refreshTokenEntity?: RefreshToken;
}
