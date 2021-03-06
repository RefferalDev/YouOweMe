import { InputType, Field, Int } from "type-graphql";
import { OweState, Owe } from "../../../models/Owe";

@InputType()
export class UpdateOweInputType {
    @Field()
    id: string

    @Field(() => Int,{
        nullable: true
    })
    title?: string

    @Field({
        nullable: true
    })
    amount?: number

    @Field(() => OweState, {
        nullable: true
    })
    state?: OweState
}