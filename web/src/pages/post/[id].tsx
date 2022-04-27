import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Details } from "../../../components/Details";
import TiptapEditor from "../../../components/TipTapEditor";
import { JSONContent } from "@tiptap/react";
import { useEditPostMutation, usePostQuery } from "../../generated/graphql";

function Post({ }) {
  const router = useRouter();
  const intId = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    variables: {
      id: intId
    }
  });
  const [, editPost] = useEditPostMutation();
  const [html, setHtml] = useState<string>("");
  const [json, setJson] = useState<JSONContent>({});

  // useEffect(() => {
  //   if (data?.post.content) {
  //     setJson(JSON.parse(data?.post.content));
  //   }
  // }, [data?.post.content])

  if (fetching) {
    return (
      <div>loading...</div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (data?.post) {
    return (
      <div>
        <h1>{ `Post: ${intId}` }</h1>
        <TiptapEditor setHtml={setHtml} setJson={setJson} savedContent={JSON.parse(data?.post.content)}/>
        <Details html={html} />
        <button onClick={async() => {
          await editPost({ id: intId, content: JSON.stringify(json) })
          router.push(`/post/${intId}`)
        }}>Edit Post</button>
      </div> 
    )
  }
}

export default Post;