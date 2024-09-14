import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './CommonPages/App';
import Login from './CommonPages/Login';
import HomePage from './CommonPages/HomePage';
import UserDashboard from './User/UserDashboard';
import SubscribedServices from './User/SubscribedServices';
import DeactivateInternetService from './User/DeactivateInternetService';
import DeactivateTvService from './User/DeactivateTvService';
import Services from './User/Services';
import ModifyInternetSubscription from './User/ModifyInternetSubscription';
import ModifyTvSubscription from './User/ModifyTvSubscription';
import TvFeedback from './User/TvFeedback';
import InternetFeedback from './User/InternetFeedback';
import PendingRequestStatus from './User/PendingRequestStatus';

export default function Index() {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const userStatus = localStorage.getItem('isUser') === 'true';
    setIsUser(userStatus);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="home" element={<HomePage />} /> 
        <Route path="login" element={<Login setIsUser={setIsUser} />} />
        <Route path="/user" element={<UserDashboard />}>
          {/* Make Services the default route for UserDashboard */}
          <Route index element={<Services />} />
          <Route path="subscribed-services" element={<SubscribedServices />} />
          <Route path="deactivate-internet-service" element={<DeactivateInternetService />} />
          <Route path="deactivate-tv-service" element={<DeactivateTvService />} />
          <Route path="modify-internet-subscription" element={<ModifyInternetSubscription />} />
          <Route path="modify-tv-subscription" element={<ModifyTvSubscription />} />
          <Route path="pending-requests-status" element={<PendingRequestStatus />}/>
          <Route path="internet-service-feedback" element={<InternetFeedback />}/>
          <Route path="tv-service-feedback" element={<TvFeedback />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);
