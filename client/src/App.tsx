import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from "react"
import ProtectRoute from "./component/auth/ProtectRoute"

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Groups"))
const Notfound = lazy(() => import("./pages/NotFound"))

let user = false;

const App = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route element={<ProtectRoute user={!user} redirect="/" />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="*" element={<Notfound user={user} /> }/>
        </Routes>

      </BrowserRouter>
    </main>
  )
}

export default App
