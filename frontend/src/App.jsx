import FormComponent from "./componenets/FormComponents";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeDashboard from "./componenets/WelcomeDashboard";
import UsersPage from "./pages/UsersPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeDashboard />} />
        <Route path="/register" element={<FormComponent />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;

