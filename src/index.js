import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import {
  RouterProvider,
  Navigate,
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Home from './pages/Home';
import MedicalForm from './pages/MedicalForm';
import { ChakraProvider } from '@chakra-ui/react'
import Nav from './component/Nav';
import SummaryPage from './pages/Summary';
import LoginPage from './pages/LoginPage';
import { selectUser } from './features/dataSlice';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({
  user,
  redirectPath = '/login',
  children,
}) => {

  const auth_info = useSelector(selectUser);

  if (!auth_info.loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

const router = (
  <Router basename='/TruffleHealth-Demo'>
    <Routes>
      <Route path="/" element={<div> <ProtectedRoute><Nav/><Home/></ProtectedRoute></div>}></Route>
      <Route path="/form" element={<div><ProtectedRoute><Nav /><MedicalForm /></ProtectedRoute></div>} />
      <Route path="/summary" element={<div><ProtectedRoute><SummaryPage /></ProtectedRoute></div>} />
      <Route path="/login" element={<div><LoginPage /></div>} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  </Router>
);


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
      {router}
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
