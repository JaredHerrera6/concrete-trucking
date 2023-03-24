import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Managers from "./routes/Managers";
import Home from "./routes/Home";
import Customers from "./routes/Customers";
import Drivers from "./routes/Drivers";
import Navbar from "./components/Navbar";
import About from "./routes/About";
import Footer from "./components/Footer";
import { OrderContextProvider } from "./context/OrderContext";
import OrderDetailPage from "./routes/OrderDetailPage";
import DriverDetailPage from "./routes/DriverDetailPage";
import CustomerDetailPage from "./routes/CustomerDetailPage";
function App() {
  return (
    <OrderContextProvider>
      <div className="container-fluid bg-secondary">
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1 bg-secondary">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users/managers" element={<Managers />} />
                <Route path="/users/customers" element={<Customers />} />
                <Route path="/users/drivers" element={<Drivers />} />
                <Route path="/about" element={<About />} />
                <Route path="/orders/:id" element={<OrderDetailPage />} />
                <Route path="/users/:id" element={<DriverDetailPage />} />
                <Route
                  path="/users/:customers/:id"
                  element={<CustomerDetailPage />}
                />
              </Routes>
            </main>
            <Footer className="mt-auto" />
          </div>
        </Router>
      </div>
    </OrderContextProvider>
  );
}
export default App;
