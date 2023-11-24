import { createContext, useCallback, useState } from "react"

type Post = {
    id: number,
    userId: number,
    title: string,
    body: string,
}

export type Action = {
    id: string,
    postId: number,
    prevPosition: number,
    currentPosition: number,
}

type SortablePostsContenxtProps = {
    setInitialListOrder: (list: Post[]) => void;
    updateListOrder: (fromPosition: number, toPosition: number) => void;
    currentListOrder: Array<number>;
    actionsList: Array<Action>;
    addAction: (action: Omit<Action, 'id'>) => void;
    removeAction: (actionId: string) => void;
    handleTimeTravel: (actionId: string) => void;
}

type SortablePostsProviderProps = {
    children: React.ReactNode;
}

export const SortablePostsContext = createContext<SortablePostsContenxtProps>({} as SortablePostsContenxtProps)

export const SortablePostsProvider = ({ children }: SortablePostsProviderProps) => {
    const [currentListOrder, setCurrentListOrder] = useState<Array<number>>([])
    const [actionsList, setActionsList] = useState<Array<Action>>([])

    const setInitialListOrder = useCallback((list: Post[]) => {
        setCurrentListOrder(list.map((item) => item.id))
    }, [])

    const calculateNewOrder = (postId: number, toPosition: number, list: Array<number>): Array<number> => {
        // get the post current position
        const fromPosition = list.indexOf(postId)

        if (fromPosition !== -1 && fromPosition !== toPosition) {
            // create a new list so that we don't mutate the current one
            const newListOrder = [...list]
            // remove the item from the old position
            const item = newListOrder.splice(fromPosition, 1)[0]
            // insert the item in the new position
            newListOrder.splice(toPosition, 0, item)

            return newListOrder
        }

        return list
    }

    const updateListOrder = useCallback((postId: number, toPosition: number) => {
        const newListOrder = calculateNewOrder(postId, toPosition, currentListOrder)
        setCurrentListOrder(newListOrder)
    }, [currentListOrder])

    const addAction = useCallback((action: Omit<Action, 'id'>) => {
        const newAction = {
            id: crypto.randomUUID(),
            ...action
        }

        setActionsList((prevState) => [newAction, ...prevState])
    }, [])

    const removeAction = useCallback((actionId: string) => {
        setActionsList((prevState) => prevState.filter((action) => action.id !== actionId))
    }, [])

    const handleTimeTravel = useCallback((actionId: string) => {
        const actionIndex = actionsList.findIndex((action) => action.id === actionId)

        if (actionIndex !== -1) {
            const actionsToExecute = actionsList.slice(0, actionIndex + 1)

            let newListOrder: Array<number> = [...currentListOrder]
            actionsToExecute.forEach((action) => {
                newListOrder = [...calculateNewOrder(action.postId, action.prevPosition, newListOrder)]
                removeAction(action.id)
            })
            setCurrentListOrder(newListOrder)
        }
    }, [actionsList, currentListOrder, removeAction])

    return (
        <SortablePostsContext.Provider value={{
            setInitialListOrder,
            updateListOrder,
            currentListOrder,
            actionsList,
            addAction,
            removeAction,
            handleTimeTravel,

        }}>
            {children}
        </SortablePostsContext.Provider>
    )
}