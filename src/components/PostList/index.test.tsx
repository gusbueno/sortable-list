import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'

import { SortablePostsProvider } from "../../providers/SortablePostsProvider"
import { PostList } from "."

const getComponent = () => (
    <SortablePostsProvider>
        <PostList />
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

describe("PostList", () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test("renders component", async () => {
        render(getComponent())

        expect(screen.getByTestId("postlist")).toBeTruthy()
        expect(screen.getByText("Sortable Post List")).toBeTruthy()
        expect(screen.getByTestId("postlist_loadingstate")).toBeTruthy()

        await waitFor(() => {
            expect(screen.queryByTestId("postlist_loadingstate")).toBeFalsy()
            expect(screen.getAllByTestId("postlist_postitem")).toHaveLength(5)
        })
    })

    test("first post only has chevrondown button", async () => {
        render(getComponent())

        await waitFor(() => {
            expect(screen.getAllByTestId("postlist_postitem")).toHaveLength(5)

            const firstPost = screen.getAllByTestId("postlist_postitem")[0]
            expect(firstPost).toBeTruthy()
            expect(firstPost).toHaveTextContent("Post 1")
            expect(firstPost.querySelector("[data-testid=postitem_chevronup]")).toBeFalsy()
            expect(firstPost.querySelector("[data-testid=postitem_chevrondown]")).toBeTruthy()
        })
    })

    test("last post only has chevronup button", async () => {
        render(getComponent())

        await waitFor(() => {
            expect(screen.getAllByTestId("postlist_postitem")).toHaveLength(5)

            const lastPost = screen.getAllByTestId("postlist_postitem")[screen.getAllByTestId("postlist_postitem").length - 1]
            expect(lastPost).toBeTruthy()
            expect(lastPost).toHaveTextContent("Post 5")
            expect(lastPost.querySelector("[data-testid=postitem_chevrondown]")).toBeFalsy()
            expect(lastPost.querySelector("[data-testid=postitem_chevronup]")).toBeTruthy()
        })
    })

    test("move Post 1 from index 0 to index 1", async () => {
        render(getComponent())

        await waitFor(async () => {
            expect(screen.getAllByTestId("postlist_postitem")).toHaveLength(5)

            const firstPost = screen.getAllByTestId("postlist_postitem")[0]
            expect(firstPost).toBeTruthy()
            expect(firstPost).toHaveTextContent("Post 1")
            await userEvent.click(screen.getAllByTestId("postitem_chevronup")[0])
            expect(screen.getAllByTestId("postlist_postitem")[1]).toHaveTextContent("Post 1")
            expect(screen.getAllByTestId("postlist_postitem")[0]).toHaveTextContent("Post 2")
        })
    })
})
