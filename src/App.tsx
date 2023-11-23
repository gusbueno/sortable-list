import { SortablePostsProvider } from "./providers/SortablePostsProvider"
import { ActionsList } from "./components/ActionsList"
import { PostList } from "./components/PostList"

function App() {
  return (
    <div className='flex h-screen justify-center items-center'>
      <SortablePostsProvider>
        <div className="flex p-5 gap-20">
          <PostList />
          <ActionsList />
        </div>
      </SortablePostsProvider>
    </div>
  )
}

export default App
