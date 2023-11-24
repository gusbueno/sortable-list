import { useCallback } from "react"

import { useSortablePosts } from "../../hooks/useSortablePosts"
import type { Action } from "../../providers/SortablePostsProvider"

export const ActionsList = () => {
    const { actionsList, handleTimeTravel } = useSortablePosts()

    const handleOnClickTimeTravel = useCallback((action: Action) => () => {
        handleTimeTravel(action.id)
    }, [handleTimeTravel])

    return (
        <div>
            <div className="rounded overflow-hidden w-[400px] shadow-xl border">
                <div className="flex p-5 bg-white">
                    <span className="text-lg text-slate-800">List of actions commited</span>
                </div>
                <div className="flex flex-col p-5 bg-slate-100">
                    {actionsList.length ? [...actionsList].reverse().map((action) => (
                        <div key={action.id} className="flex justify-between items-center p-2 bg-white first:rounded-t last:rounded-b shadow-xl border-b last:border-b-0">
                            <span className="text-sm">
                                Moved post {action.postId} from index {action.prevPosition} to index {action.currentPosition}
                            </span>
                            <button
                                onClick={handleOnClickTimeTravel(action)}
                                className="px-3 py-2 rounded bg-green-300 text-black text-sm hover:cursor-pointer hover:bg-green-400"
                            >
                                Time travel
                            </button>
                        </div>
                    )
                    ) : (
                        <span className="text-md">No actions commited yet</span>
                    )}
                </div>
            </div>
        </div>
    )
}