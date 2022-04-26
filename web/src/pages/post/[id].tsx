import { useState } from "react";
import { useRouter } from "next/router";
import { Details } from "../../../components/Details";
import TiptapEditor from "../../../components/TipTapEditor";

function Post({ }) {
  const router = useRouter();
  const intId = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [html, setHtml] = useState<string>("");

  return (
    <div>
      <h1>{ `Post: ${intId}` }</h1>
      <TiptapEditor setHtml={setHtml} />
      <Details html={html} />
    </div> 
  )
}

export default Post;