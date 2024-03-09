import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const {id} = useParams()
  const { data: post, isPending } = useGetPostById(id || '');

  if(isPending) {
    return <Loader />
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className=" flex-start gap-3 justify-start w-full">
          <img
            src={`${import.meta.env.BASE_URL}/assets/icons/add-post.svg`}
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create post</h2>
        </div>
        <PostForm action='update' post={post}/>
      </div>
    </div>
  );
};

export default EditPost;
