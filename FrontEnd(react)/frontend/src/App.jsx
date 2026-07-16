import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AccountDetails from "./pages/AccountDetails";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import MiniStatement from "./pages/MiniStatement";
import TransactionHistory from "./pages/TransactionHistory";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

          <Route
              path="/dashboard"
              element={
                  <ProtectedRoute>
                      <Dashboard />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/dashboard/account"
              element={
                  <ProtectedRoute>
                      <AccountDetails />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/dashboard/deposit"
              element={
                  <ProtectedRoute>
                      <Deposit />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/dashboard/withdraw"
              element={
                  <ProtectedRoute>
                      <Withdraw />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/dashboard/statement"
              element={
                  <ProtectedRoute>
                      <MiniStatement />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/dashboard/transfer"
              element={
                  <ProtectedRoute>
                      <Transfer />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/mini-statement"
              element={
                  <ProtectedRoute>
                      <MiniStatement />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/transaction-history"
              element={
                  <ProtectedRoute>
                      <TransactionHistory />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/profile"
              element={
                  <ProtectedRoute>
                      <Profile />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/change-password"
              element={
                  <ProtectedRoute>
                      <ChangePassword />
                  </ProtectedRoute>
              }
          />
      </Routes>
  );
}

export default App;