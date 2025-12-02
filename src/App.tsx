import { Navbar } from "./Components/Navbar";
import { Header } from "./Components/Header";
import Dashboard from "./Dashboard_Safety/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
