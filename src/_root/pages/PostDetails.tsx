import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { formatTimeAgo } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  if (isPending)
    return (
      <div className="post_details-container">
        <Loader />
      </div>
    );

  const handleDeletePost = async () => {};
  return (
    <div className="post_details-container">
      <div className="post_details-card">
        <img src={post?.imageUrl} alt="post" className="post_details-img" />
        <div className="post_details-info">
          <div className="flex-between w-full">
            <Link
              to={`/profile/${post?.creator.$id}`}
              className="flex items-center gap-3"
            >
              <img
                src={
                  post?.creator?.imageUrl ||
                  `${import.meta.env.BASE_URL}/assets/icons/profile-placeholder.svg`
                }
                className="rounded-full w-8 h-8 lg:h-12 lg:w-12"
              />

              <div className="flex flex-col">
                <p className="base-medium lg:body-bold text-light-1">
                  {post?.creator.name}
                </p>
                <div className="flex-center gap-2 text-light-3">
                  <p className="subtle-semibold lg:small-regular">
                    {formatTimeAgo(post?.$createdAt)}
                  </p>
                  -
                  <p className="subtle-semibold lg:small-regular">
                    {post?.location}
                  </p>
                </div>
              </div>
            </Link>
            <div className="flex-center gap-2">
              <Link
                to={`/update-post/${post?.$id}`}
                className={user?.id === post?.creator.$id ? "" : "hidden"}
              >
                <img src={`${import.meta.env.BASE_URL}/assets/icons/edit.svg`} width={24} height={24} />
              </Link>
              <Button
                onClick={handleDeletePost}
                variant="ghost"
                className={`ghost_details-delete_btn ${
                  user?.id === post?.creator.$id ? "" : " hidden"
                }`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}/assets/icons/delete.svg`}
                  alt="delete"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>
          <hr className="border w-full border-dark-4/80" />
          <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
            <p>{post?.caption}</p>
            <ul className="flex gap-1 mt-2">
              {post?.tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <PostStats post={post} userId={user.id} isPostsPending={isPending}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
