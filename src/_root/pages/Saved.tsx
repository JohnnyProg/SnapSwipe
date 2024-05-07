import GridPostList from "@/components/shared/GridPostList";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import React, { useMemo } from "react";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const posts = useMemo(() => {
    return currentUser?.save.map((record: Models.Document) => record.post);
  }, [currentUser]);
  console.log(posts, "posts")
  return (
    <div className="saved-container">
      <div className="w-full flex flex-row justify-start gap-2">
        <img
          src={`${import.meta.env.BASE_URL}/assets/icons/bookmark.svg`}
          width={24}
          height={24}
        />
        <h2 className="h3-bold md:h2-bold w-full"> Saved Posts</h2>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {posts && posts?.length === 0 && (
          <p className="body-medium text-light-2">
            You haven't saved any posts yet
            </p>
            )}
        {posts && (
          <GridPostList posts={posts} showUser={false}  showStats={false}/>
        )}
      </div>
    </div>
  );
};

export default Saved;
