import { useState } from "react";
import { Details } from "../components/Details";
import TiptapEditor from "../components/TipTapEditor";

function Home() {
  const [html, setHtml] = useState<string>("");
  return (
    <div>
      <h1>Rich Text Editor Demo App</h1>
      <TiptapEditor setHtml={setHtml} />
      <Details html={html} />
    </div> 
  )
}

export default Home;
