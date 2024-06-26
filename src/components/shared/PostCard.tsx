import { useUserContext } from "@/context/AuthContext";
import { formatTimeAgo } from "@/lib/utils";
import { Models } from "appwrite";
import { type } from "os";
import React from "react";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
  key: string;
  isPostsPending?: boolean;
};

const PostCard = ({ post, key, isPostsPending }: PostCardProps) => {

  const {user} = useUserContext()

  if(!post.creator) {
    return
  }

  return (
    <div className="post-card" key={key} >
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                `${import.meta.env.BASE_URL}/assets/icons/profile-placeholder.svg`
              }
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">{formatTimeAgo(post.$createdAt)}</p>
              -
              <p className="subtle-semibold lg:small-regular">{post.location}</p>
            </div>
          </div>
        </div>
        <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.creator.$id && 'hidden'}`}>
          <img src={`${import.meta.env.BASE_URL}/assets/icons/edit.svg`} alt="edit" width={20} height={20} />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">#{tag}</li>
            ))
            }
          </ul>
        </div>
        <img src={post.imageUrl || `${import.meta.env.BASE_URL}/assets/icons/profile-placeholder.svg`} alt={post.caption} className="post-card_img" />
      </Link>
      <PostStats post={post} userId={user.id} isPostsPending={isPostsPending}/>
    </div>
  );
};

export default PostCard;
