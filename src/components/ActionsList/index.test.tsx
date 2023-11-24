import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'

import { SortablePostsProvider } from "../../providers/SortablePostsProvider"
import { ActionsList } from "."
import { PostList } from "../PostList"

const getComponent = () => (
    <SortablePostsProvider>
        <PostList />
        <ActionsList />
    </SortablePostsProvider>
)

const server = setupServer(
    http.get('*/posts', () => {
        return HttpResponse.json([
            {
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            },
            {
                "userId": 1,
                "id": 2,
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
            },
            {
                "userId": 1,
                "id": 3,
                "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
                "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
            },
            {
                "userId": 1,
                "id": 4,
                "title": "eum et est occaecati",
                "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
            },
            {
                "userId": 1,
                "id": 5,
                "title": "nesciunt quas odio",
                "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
            },
            {
                "userId": 1,
                "id": 6,
                "title": "dolorem eum magni eos aperiam quia",
                "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
            },
        ])
    }),
)

describe("ActionsList", () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test("renders component", async () => {
        render(getComponent())

        expect(screen.getByTestId("actionslist")).toBeTruthy()
        expect(screen.getByText("List of actions commited")).toBeTruthy()
        expect(screen.getByText("No actions commited yet")).toBeTruthy()
    })

    test("renders action item after moving post", async () => {
        render(getComponent())

        await waitFor(async () => {
            expect(screen.getAllByTestId("postlist_postitem")).toHaveLength(5)

            expect(screen.getByText("Post 1")).toBeTruthy()
            expect(screen.queryByText("Moved post 1 from index 0 to index 1")).toBeFalsy()

            await userEvent.click(screen.getAllByTestId("postitem_chevrondown")[0])

            expect(screen.getByText("Moved post 1 from index 0 to index 1")).toBeTruthy()
        })
    })

    test("reverse action after clicking on time travel button", async () => {
        render(getComponent())

        await waitFor(async () => {
            expect(screen.getAllByTestId("postlist_postitem")).toHaveLength(5)

            expect(screen.getByText("Post 1")).toBeTruthy()
            expect(screen.queryByText("Moved post 1 from index 0 to index 1")).toBeFalsy()

            await userEvent.click(screen.getAllByTestId("postitem_chevrondown")[0])
            expect(screen.getByText("Moved post 1 from index 0 to index 1")).toBeTruthy()

            await userEvent.click(screen.getByText("Time travel"))
            expect(screen.queryByText("Moved post 1 from index 0 to index 1")).toBeFalsy()
        })
    })
})