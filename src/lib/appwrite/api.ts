import {ID, Query} from 'appwrite'
import { INewPost, INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from './config';

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
    console.log("user", user)
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

    const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)])
        
    if(!currentUser) throw new Error('No user found')
    return currentUser.documents[0]
 }catch (error) {
    console.log(error)
 }
}

export async function signOutAccount() {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        console.log(error);
    }
}

export async function createPost(post: INewPost) {
    try {
        const uploadedFile = await uploadFile(post.file[0])
        if(!uploadedFile) throw new Error('File not uploaded')
        const fileUrl = await getFilePreview(uploadedFile.$id)

        if(!fileUrl){
            deleteFile(uploadedFile.$id)
            throw new Error('File not found')
        } 
        console.log("File url", fileUrl)
        //convert tags in an array
        const tags = post.tags?.replace(/ /g,'').split(',') || []
        
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )
        if(!newPost){
            await deleteFile(uploadedFile.$id)
            throw new Error('Post not created')
        } 
        return newPost
    } catch (error) {
        console.log(error);
    }
}

export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )
        return uploadedFile
    } catch (error) {
        console.log(error);
    }
}

export async function getFilePreview(fileId: string) {
    try{
        const fileUrl = await storage.getFilePreview(       //meyby await isnt required
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            'top',
            100
        )
        return fileUrl
    } catch (error) {
        console.log(error);
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(
            appwriteConfig.storageId,
            fileId
        )
    } catch (error) {
        console.log(error);
    }
}

export async function getRecentPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(20)]
        )
        if(!posts) throw new Error('No posts found')
        return posts
    }catch (error) {
        console.log(error);
    }
}

export async function likePost(postId: string, likesArray: string[]) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {likes: likesArray}

        )
        if(!updatedPost) throw new Error('Post not updated')
        return updatedPost
    } catch (error) {
        console.log(error);
    }
}

export async function savePost(postId: string, userId: string) {
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {user: userId, post: postId}

        )
        if(!updatedPost) throw new Error('Post not updated')
        return updatedPost
    } catch (error) {
        console.log(error);
    }
}

export async function deleteSavedPost(savedRecordId: string) {
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId
            )
        if(!statusCode) throw new Error('Post not unsaved')
        return {status: 'ok'}
    } catch (error) {
        console.log(error);
    }
}