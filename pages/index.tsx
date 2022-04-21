import { useState } from "react";
import { Details } from "../components/Details";
import TiptapEditor from "../components/TipTapEditor";

function Home() {
  const [description, setDescription] = useState<string>("");
  return (
    <div>
      <h1>Rich Text Editor Demo App</h1>
      <TiptapEditor setDescription={setDescription} />
      <Details description={description} />
    </div> 
  )
}

export default Home;
