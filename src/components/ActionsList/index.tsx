import { useSortablePosts } from "../../hooks/useSortablePosts"
import { ActionItem } from "./components/ActionItem"

export const ActionsList = () => {
    const { actionsList } = useSortablePosts()

    return (
        <div data-testid="actionslist">
            <div className="rounded overflow-hidden w-[400px] shadow-xl border">
                <div className="flex p-5 bg-white">
                    <span className="text-lg text-slate-800">List of actions commited</span>
                </div>
                <div className="flex flex-col p-5 bg-slate-50">
                    {actionsList.length ? actionsList.map((action) => (
                        <ActionItem
                            key={action.id}
                            actionId={action.id}
                            postId={action.postId}
                            prevPosition={action.prevPosition}
                            currentPosition={action.currentPosition}
                        />
                    )) : (
                        <span className="text-md">No actions commited yet</span>
                    )}
                </div>
            </div>
        </div>
    )
}