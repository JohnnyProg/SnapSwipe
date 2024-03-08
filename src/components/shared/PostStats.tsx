import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
  isPostsPending: boolean;
};

function timeFrom(timestamp: number): number {
  const time: Date = new Date(timestamp);
  const now: Date = new Date();
  const diff: number = now.getTime() - time.getTime();
  const seconds: number = Math.floor(diff / 1000);
  return seconds;
}

const PostStats = ({ post, userId, isPostsPending }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const {
    mutate: likePost,
    isPending: isSavingLike,
    submittedAt: submittedLike,
  } = useLikePost();
  const {
    mutate: savePost,
    isPending: isSavingPost,
    submittedAt: submittedSave,
  } = useSavePost();
  const {
    mutate: deleteSavedPost,
    isPending: IsDeletingSaved,
    submittedAt: submittedDeleteSave,
  } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    if (checkIsLiked(likes, userId)) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSaved) {
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId: userId });
    }
    setIsSaved(!isSaved);
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        {isSavingLike || (isPostsPending && timeFrom(submittedLike) < 5) ? (
          <Loader />
        ) : (
          <>
            <img
              src={
                checkIsLiked(likes, userId)
                  ? "/assets/icons/liked.svg"
                  : "/assets/icons/like.svg"
              }
              alt="like"
              width={20}
              height={20}
              onClick={handleLikePost}
              className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium">{post.likes.length}</p>
          </>
        )}
      </div>
      <div className="flex gap-2 mr-5">
        {isSavingPost ||
        IsDeletingSaved ||
        (isPostsPending &&
          (timeFrom(submittedDeleteSave) < 5 ||
            timeFrom(submittedSave) < 5)) ? (
          <Loader />
        ) : (
          <>
            <img
              src={
                isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
              }
              alt="like"
              width={20}
              height={20}
              onClick={handleSavePost}
              className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium">{post.save.length}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PostStats;
