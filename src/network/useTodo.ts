import useSWR from "swr"

import { axios } from "@/network/axios"

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const todoFetcher = (url: string) =>
  axios.get(url).then((res) => res.data)

export function useTodoList(userId?: number) {
  const { data, error, isLoading } = useSWR<Todo[]>(
    userId ? `/todos/?userId=${userId}` : "/todos",
    todoFetcher
  )

  return {
    todos: data,
    isLoading,
    error,
  }
}

export function useTodo(todoId: number) {
  const { data, error, isLoading } = useSWR<Todo>(
    `/todos/${todoId}`,
    todoFetcher
  )

  return {
    todo: data,
    isLoading,
    error,
  }
}
