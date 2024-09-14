import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styling_Components/styles.css'; // Import your CSS file here
 
function ModifyTvSubscription() {
    const [filteredServices, setFilteredServices] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const response = await axios.get('http://localhost:8082/checkLoggedInUser', { withCredentials: true });
                setUserId(response.data.userId);
            } catch (err) {
                setError('Unable to fetch user details.');
                console.error('Error fetching user details:', err);
            }
        };
 
        fetchLoggedInUser();
    }, []);
 
    useEffect(() => {
        const fetchFilteredServices = async () => {
            if (!userId) return;
 
            try {
                // Fetch availed TV services
                const availedResponse = await axios.get('http://localhost:8082/user/api/subscribed-service', {
                    params: { userId },
                    withCredentials: true,
                });
 
                console.log('Availed TV Services:', availedResponse.data);
 
                const { tvServicesAvailed } = availedResponse.data;
 
                if (tvServicesAvailed.length > 0) {
                    const [service] = tvServicesAvailed; // Use the first availed service for demonstration
 
                    console.log('Using Service for Filtering:', service);
 
                    // Fetch filtered TV services
                    const servicesResponse = await axios.get('http://localhost:8082/user/api/modify-tv-subscription', {
                        params: {
                            serviceName: service.tvService.serviceName, // Ensure correct field name
                            serviceType: service.tvService.serviceType // Ensure correct field name
                        },
                        withCredentials: true,
                    });
 
                    console.log('Filtered TV Services:', servicesResponse.data);
                    setFilteredServices(servicesResponse.data);
                } else {
                    setError('No availed TV services found.');
                }
            } catch (err) {
                setError(`Failed to fetch services. Please try again later. Error: ${err.message}`);
                console.error('Error fetching filtered services:', err);
            } finally {
                setLoading(false);
            }
        };
 
        fetchFilteredServices();
    }, [userId]);
 
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
 
    return (
        <div>
            <h1>Modify TV Subscription</h1>
            <div className="services-grid">
                {filteredServices.length === 0 ? (
                    <p>No available TV services found.</p>
                ) : (
                    filteredServices.map(service => (
                        service.active && (
                            <div className="service-box" key={service.serviceId}>
                                <h2>{service.serviceName}</h2>
                                <p><strong>Type:</strong> {service.serviceType}</p>
                                <p><strong>Benefits:</strong> {service.benefits}</p>
                                <p><strong>Description:</strong> {service.description}</p>
 
                                <div className="speed-info">
                                    <p>
                                        <span className="icon">⬇️</span>
                                        <strong>Download Speed:</strong> {service.serviceDownloadSpeed} Mbps
                                    </p>
                                    <p>
                                        <span className="icon">⬆️</span>
                                        <strong>Upload Speed:</strong> {service.serviceUploadSpeed} Mbps
                                    </p>
                                </div>
 
                                <p className="plan-cost">${service.monthlyCost}/month</p>
                            </div>
                        )
                    ))
                )}
            </div>
        </div>
    );
}
 
export default ModifyTvSubscription;