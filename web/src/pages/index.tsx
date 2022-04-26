import Link from "next/link";
import { usePostsQuery } from "../generated/graphql";

function Home() {
  
  const [{ data, fetching }] = usePostsQuery();
  const postLinks = data?.posts.map((post) => {
    return (
      <li>
        <Link href={`/post/${post.id}`}>
          <a>Home</a>
        </Link>
      </li>
    )
  })
  return (
    <div>
      <h1>Rich Text Editor Demo App</h1>
      <ul>
        { postLinks }
      </ul>
    </div> 
  )
}

export default Home;
