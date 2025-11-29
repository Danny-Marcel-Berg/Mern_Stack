import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Header from "./components/Header";

function App() {
  return (
    <div className="App w-full">
      <Header />
      <AllRoutes />
    </div>
  );
}

export default App;
