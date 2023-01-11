import '@unocss/reset/tailwind.css'
import { ConfigProvider, theme } from 'antd'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import 'virtual:uno.css'
import routes from '~react-pages'

import { useDark } from '~/hooks/useDark'
import '~/locales/i18n'

const router = createBrowserRouter(routes)

const App = () => {
  const [isDark] = useDark()

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
