import { Resolver, Arg, Mutation, Authorized } from "type-graphql";
import { User } from "../../models/User";
import { UpdateUserInputType } from "./updateUser/updateUserInputType";
import { firestore } from "../../db/firebase";
import { UserResolver } from "./UserResolver"
import { RequestContainer, UserDataLoader } from "./userResolver/userLoader";
import { mapUserSnapshot } from "./userResolver/userSnapshotMap";
import { processAndUploadImage, ProcessAndUploadImageResponse } from "./updateUser/processImage";

@Resolver(User)
export class UpdateUserResolver {
    @Authorized()
    @Mutation(() => User, {
        description: "This Mutation gives one the ability to update values of a `User`. Currently only supports updating the name and the fcm_token",
    })
    async updateUser(@Arg("data") data: UpdateUserInputType, @RequestContainer() userDataLoader: UserDataLoader) {
        const userId = data.id
        const userRef = firestore.collection('users').doc(userId)
        try {
            // This is a anti-pattern
            // Would not recommend for larger systems
            // Is done bacause fieldNames are different in server and database
            let { id, fcmToken, image, ...updateData } = data

            let processImageResponse: ProcessAndUploadImageResponse | undefined;
            if (image) {
                processImageResponse = await processAndUploadImage(id, image)
            }
            console.log(updateData)
            await userRef.update({
                ...(fcmToken && { fcm_token: fcmToken }),
                ...(processImageResponse && { image: processImageResponse.url, image_blurhash: processImageResponse.blurhash }),
                ...updateData
            })
            let userSnapshot = await userDataLoader.load(userId)
            if (!userSnapshot) {
                throw Error("User Snapshot from loader is Null in updateResolver")
            }
            let user = mapUserSnapshot(userSnapshot)
            return user
        } catch (e) {
            throw e
        }
    }
}