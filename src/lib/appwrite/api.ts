import {ID, Query} from 'appwrite'
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if(!newAccount) throw new Error('Account not created')

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        })
        return newUser //or newAccount not sure before there was newAccount
    }catch (error) {
        console.error(error);
        return error
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    email: string,
    name: string,
    imageUrl: URL,
    username?: string
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
            )
        return newUser
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user: {
    email: string,
    password: string
}) {
    try {
        const session = await account.createEmailSession(user.email, user.password)
        return session
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser() {
 try {
    const currentAccount = await account.get()
    if(!currentAccount) throw new Error('No user found')
    console.log("current account = ", currentAccount)   //TODO DELETE THIS LONE
    const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)])
    if(!currentUser) throw new Error('No user found')
    console.log("current user = ", currentUser.documents[0]) //TODO DELETE THIS LONE
    return currentUser.documents[0]
 }catch (error) {
    console.log(error)
 }
}