import "@/locales/i18n"
import "@/main.css"
import "@total-typescript/ts-reset"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider, theme } from "antd"
import enUS from "antd/locale/en_US"
import zhCN from "antd/locale/zh_CN"
import { useTranslation } from "react-i18next"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

import SidebarNav from "@/components/SidebarNav"
import { useDark } from "@/hooks"
import Home from "@/pages"
import TodoList from "@/pages/example/todos"
import TodoCard from "@/pages/example/todos/[id]"

const i18nToLocale = {
  en: enUS,
  zh: zhCN,
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/example/todos/",
    element: (
      <div className="h-full flex">
        <SidebarNav />
        <div className="w-full h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    ),
    children: [
      {
        path: "",
        element: <TodoList />,
      },
      {
        path: ":id",
        element: <TodoCard />,
      },
    ],
  },
])

const queryClient = new QueryClient()

const App = () => {
  const { isDark } = useDark()
  const [, i18n] = useTranslation()

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
        locale={
          i18nToLocale[i18n.language as keyof typeof i18nToLocale] ?? enUS
        }
      >
        <RouterProvider router={router}></RouterProvider>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
