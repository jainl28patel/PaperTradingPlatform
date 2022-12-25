import Navbar from "./components/navbar/Navbar"
import BasicRoutes from "./routes/BasicRoutes";
import { AuthProvider } from "./contexts/AuthContext"
import "./helpers/chart"

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <BasicRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
