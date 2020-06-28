import { ObjectType, Field, ID } from "type-graphql";
import { Owe } from "./Owe";
import { Netting } from "./Netting";

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field({
        nullable: true
    })
    image: string;

    @Field()
    mobileNo: string;

    @Field(() => [Owe])
    oweMe?: Array<Owe>

    @Field()
    oweMeAmount?: number

    @Field(() => [Owe])
    iOwe?: Array<Owe>

    @Field()
    iOweAmount?: number

    @Field({
        description: "The Fcm Token to be used to send a notifiation to the `User` will be null if not present.",
        nullable: true
    })
    fcmToken: string

    @Field()
    created: Date
}

//TODO Maybe Consider Changing this name.
@ObjectType()
export class MeUser extends User {
    @Field(() => [Netting])
    nettings?: Array<Netting>
}