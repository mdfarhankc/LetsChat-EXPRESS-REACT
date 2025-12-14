import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {

    const {authUser, isLoading} = useAuthContext();
    console.log("Auth user", authUser)

    if (isLoading) return null;

  return (
    <main className="p-4 h-screen flex justify-center items-center">
        <Routes>
            <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
            <Route path="/register" element={!authUser ? <Register />: <Navigate to={'/'} />} />
            <Route path="/login" element={!authUser ? <Login />: <Navigate to={'/'} />} />
        </Routes>
        <Toaster />
    </main>
  );
}

export default App;