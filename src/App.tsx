import { SortablePostsProvider } from "./providers/SortablePostsProvider"
import { ActionsList } from "./components/ActionsList"
import { PostList } from "./components/PostList"

function App() {
  return (
    <div className='flex h-screen justify-center items-center'>
      <div className="flex p-5 bg-white gap-5">
        <SortablePostsProvider>
          <PostList />
          <ActionsList />
        </SortablePostsProvider>
      </div>

    </div>
  )
}

export default App
