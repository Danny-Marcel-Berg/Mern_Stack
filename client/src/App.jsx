import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App w-full min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <Header />
        <main className="w-full">
          <AllRoutes />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
