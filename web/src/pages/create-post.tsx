import React, { useEffect } from 'react'
import { useState } from "react";
import { useRouter } from "next/router";
import { Details } from "../../components/Details";
import TiptapEditor from "../../components/TipTapEditor";
import { JSONContent } from '@tiptap/react';
import { useCreatePostMutation } from '../generated/graphql';

const CreatePost= ({}) => {
  const [html, setHtml] = useState<string>("");
  const [json, setJson] = useState<JSONContent>({});
  const [, createPost] = useCreatePostMutation();
  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(json));
  }, [json])

  return (
    <div>
      <h1>Create Post</h1>
      <TiptapEditor setHtml={setHtml} setJson={setJson}/>
      <Details html={html} />
      <button onClick={async() => {
        await createPost({ content: JSON.stringify(json) })
      }
      }>Save to DB</button>
      <p>{JSON.stringify(json)}</p>
    </div> 
  )
}

export default CreatePost;

