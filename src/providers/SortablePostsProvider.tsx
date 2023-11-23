import { createContext, useCallback, useState } from "react"

type Post = {
    id: number,
    userId: number,
    title: string,
    body: string,
}

type Action = {
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

    const updateListOrder = useCallback((fromPosition: number, toPosition: number) => {
        // create a new list so that we don't mutate the current one
        const newListOrder = [...currentListOrder]
        // remove the item from the old position
        const item = newListOrder.splice(fromPosition, 1)[0]
        // insert the item in the new position
        newListOrder.splice(toPosition, 0, item)

        setCurrentListOrder(newListOrder)
    }, [currentListOrder])

    const addAction = useCallback((action: Omit<Action, 'id'>) => {
        const newAction = {
            id: crypto.randomUUID(),
            ...action
        }

        setActionsList((prevState) => [...prevState, newAction])
    }, [])

    const removeAction = useCallback((actionId: string) => {
        setActionsList((prevState) => prevState.filter((action) => action.id !== actionId))
    }, [])

    return (
        <SortablePostsContext.Provider value={{
            setInitialListOrder,
            updateListOrder,
            currentListOrder,
            actionsList,
            addAction,
            removeAction,

        }}>
            {children}
        </SortablePostsContext.Provider>
    )
}