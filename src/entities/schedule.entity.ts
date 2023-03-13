import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm'
import { RealEstate } from './realEstate.entity'
import { User } from './users.entity'

@Entity('schedules_users_properties')
class Schedule {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'date' })
    date: Date

    @Column({ type: 'time' })
    hour: string

    @ManyToOne(() => RealEstate)
    realEstate: RealEstate

    @ManyToOne(() => User)
    user: User
}

export { Schedule }