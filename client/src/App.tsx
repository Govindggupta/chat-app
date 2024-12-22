import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, data } from "react-router-dom";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { ThemeProvider } from "./context/UseContext";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 dark:border-indigo-400 border-solid"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/auth/home", { withCredentials: true });
        return res.data;
      } catch (error) {
        return null;
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/profile/:username" element={authUser ? <Home /> : <Navigate to="/login" />} />
              <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
              <Route path="/chat/:id" element={authUser ? <Chat /> : <Navigate to="/login" />} />
              <Route path="/groups" element={authUser ? <Groups /> : <Navigate to="/login" />} />
              <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
              <Route path="*" element={<NotFound user={authUser} />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </main>
    </ThemeProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

export default App;