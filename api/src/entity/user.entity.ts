import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Table } from 'typeorm';
import { UserRole } from '../util/constraint';
import { RefreshToken } from './refreshToken.entity';

@Entity()
export class User {
  @PrimaryColumn('text')
  id?: string;

  @Column('text' )
  username?: string;

  @Column('text', {nullable: true})
  email?: string;

  @Column('text', {nullable: true})
  bio?: string;

  @Column('text', {nullable: true})
  address?: string;

  @Column('text', {nullable: true})
  avatar?: string;

  @Column("text", { nullable: true, unique: true })
  refreshTokenId?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
  })
  role?: UserRole;

  @OneToOne(() => RefreshToken)
  @JoinColumn({ name: 'refreshTokenId' })
  refreshTokenEntity?: RefreshToken;
}
