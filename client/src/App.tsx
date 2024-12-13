import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectRoute from "./components/auth/ProtectRoute"
import { ThemeProvider } from "./context/UseContext"
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Groups"))
const NotFound = lazy(() => import("./pages/NotFound"))

let user = true

const App = () => {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<ProtectRoute user={user} />}>
                <Route path="/" element={<Home />} />
                <Route path="/chat/:id" element={<Chat />} />
                <Route path="/groups" element={<Groups />} />
              </Route>

              <Route element={<ProtectRoute user={!user} redirect="/" />}>
                <Route path="/login" element={<Login />} />
              </Route>

              <Route path="*" element={<NotFound user={user} />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </main>
    </ThemeProvider>
  )
}

export default App
