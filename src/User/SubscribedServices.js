import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeactivateTvService from './DeactivateTvService';
import DeactivateInternetService from './DeactivateInternetService';
import './Styling_Components/SubscribeServices.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const SubscribedServices = () => {
    const [internetServices, setInternetServices] = useState([]);
    const [tvServices, setTvServices] = useState([]);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);
    const [showModifyOptions, setShowModifyOptions] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const response = await axios.get('http://localhost:8082/checkLoggedInUser', { withCredentials: true });
                setUserId(response.data.userId);
            } catch (err) {
                setError('Unable to fetch user details.');
                console.error(err);
            }
        };
        fetchLoggedInUser();
    }, []);

    useEffect(() => {
        const fetchSubscribedServices = async () => {
            if (!userId) return;

            try {
                const response = await axios.get('http://localhost:8082/user/api/subscribed-services', {
                    params: { userId },
                    withCredentials: true
                });
                console.log(response.data)
                const { internetServicesAvailed, tvServicesAvailed } = response.data;
                setInternetServices(internetServicesAvailed || []);
                setTvServices(tvServicesAvailed || []);
                setError('');
            } catch (err) {
                setError('Unable to fetch subscribed services.');
                console.error(err);
            }
        };
        fetchSubscribedServices();
    }, [userId]);

    const handleToggleModifyOptions = () => {
        setShowModifyOptions(prev => !prev);
    };

    const handleModifyTv = (serviceId) => navigate(`/user/modify-tv-subscription`, { state: { userId, serviceId } });
    const handleModifyInternet = (serviceId) => navigate(`/user/modify-internet-subscription`, {state: { userId, serviceId }});

    return (
        <div className="services-container">
            <h2>My Services</h2>
            {error && <p className="error-message">{error}</p>}
            {internetServices.length === 0 && tvServices.length === 0 ? (
                <p className="no-services">No services found.</p>
            ) : (
                <div className="services-grid">
                    {internetServices.length > 0 && (
                        <div className="service-section">
                            <h3>Internet Services</h3>
                            {internetServices.map(service => (
                                <div className="service-box" key={service.serviceId}>
                                    <h4>{service.internetService.serviceName}</h4>
                                    <p><strong>Service ID:</strong> {service.serviceId}</p>
                                    <p><strong>Type:</strong> {service.internetService.serviceType}</p>
                                    <p><strong>Description:</strong> {service.internetService.description}</p>
                                    <div className="speed-info">
                                        <p><span className="icon">⬇️</span> <strong>Download Speed:</strong> {service.internetService.serviceDownloadSpeed} Mbps</p>
                                        <p><span className="icon">⬆️</span> <strong>Upload Speed:</strong> {service.internetService.serviceUploadSpeed} Mbps</p>
                                    </div>
                                    <p><strong>Benefits:</strong> {service.internetService.benefits}</p>
                                    <p><strong>Monthly Cost:</strong> ${service.internetService.monthlyCost}</p>
                                    <p><strong>Start Date:</strong> {new Date(service.startDate).toLocaleDateString()}</p>
                                    <p><strong>End Date:</strong> {service.endDate ? new Date(service.endDate).toLocaleDateString() : 'Ongoing'}</p>
                                    {/* <button onClick={() => handleDeactivateInternet(service.serviceId)} className="btn deactivate-button">
                                        Deactivate Internet Service
                                    </button> */}
                                    <DeactivateInternetService selectedService={service}/>
                                    <button onClick={() => handleModifyInternet(service.serviceId)} className="btn modify-button">
                                        Modify Internet Service
                                    </button>
                                </div>
                            ))}
                            
                        </div>  
                    )}
                    {tvServices.length > 0 && (
                        <div className="service-section">
                            <h3>TV Services</h3>
                            {tvServices.map(service => (
                                <div className="service-box" key={service.serviceId}>
                                    <h4>{service.tvService.serviceName}</h4>
                                    <p><strong>Service ID:</strong> {service.serviceId}</p>
                                    <p><strong>Type:</strong> {service.tvService.serviceType}</p>
                                    <p><strong>Description:</strong> {service.tvService.description}</p>
                                    <div className="speed-info">
                                        <p><span className="icon">⬇️</span> <strong>Download Speed:</strong> {service.tvService.serviceDownloadSpeed} Mbps</p>
                                        <p><span className="icon">⬆️</span> <strong>Upload Speed:</strong> {service.tvService.serviceUploadSpeed} Mbps</p>
                                    </div>
                                    <p><strong>Benefits:</strong> {service.tvService.benefits}</p>
                                    <p><strong>Monthly Cost:</strong> ${service.tvService.monthlyCost}</p>
                                    <p><strong>Start Date:</strong> {new Date(service.startDate).toLocaleDateString()}</p>
                                    <p><strong>End Date:</strong> {service.endDate ? new Date(service.endDate).toLocaleDateString() : 'Ongoing'}</p>
                                    {/* <button onClick={() => handleDeactivateTv(service.serviceId)} className="btn deactivate-button">
                                        Deactivate TV Service
                                    </button> */}
                                    <DeactivateTvService selectedService={service}/>
                                    <button onClick={() => handleModifyTv(service.serviceId)} className="btn modify-button">
                                        Modify TV Service
                                    </button>
                                </div>
                            ))}
                            
                        </div>
                    )}
                </div>
            )}
            <button onClick={handleToggleModifyOptions} className="btn upgrade-downgrade-button">
                {showModifyOptions ? 'Hide Options' : 'Upgrade/Downgrade Service'}
            </button>
            {showModifyOptions && (
                <div className="modify-options">
                    <button onClick={handleModifyInternet} className="btn">
                        Modify Internet Subscription
                    </button>
                    <button onClick={handleModifyTv} className="btn">
                        Modify TV Subscription
                    </button>
                </div>
            )}
        </div>
    );
};

export default SubscribedServices;
