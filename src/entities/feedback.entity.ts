/** @format */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity({ name: "feedback" })
export class FeedbackEntity extends CoreEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 1000 })
    text: string;

    @Column()
    score: number;
}
