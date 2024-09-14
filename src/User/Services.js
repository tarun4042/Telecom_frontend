import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styling_Components/Services.css'; // Import your CSS file here

function Services() {
    const [internetServices, setInternetServices] = useState([]);           // working
    const [tvServices, setTvServices] = useState([]);                        // working
    const [error, setError] = useState('');                                    // working
    const [loading, setLoading] = useState(true);                          // working
    // added 1 
    const [userId, setUserId] = useState(null);                                // working
    const [subInternetServices, setSubInternetServices] = useState([]);       // working
    const [subTvServices, setSubTvServices] = useState([]);                               // working
    const [subscriptionLimits, setSubscriptionLimits] = useState({ internet: 2, tv: 2 }); // working

    // added 2
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
    //console.log(userId)

    // added 3
    useEffect(() => {
        const fetchSubscribedServices = async () => {
            if (!userId) return;

            try {
                const response = await axios.get('http://localhost:8082/user/api/subscribed-services', {
                    params: { userId },
                    withCredentials: true
                });
                const { internetServicesAvailed, tvServicesAvailed } = response.data;
                setSubInternetServices(internetServicesAvailed || []);
                setSubTvServices(tvServicesAvailed || []);
                setError('');
            } catch (err) {
                setError('Unable to fetch subscribed services.');
                console.error(err);
            }
        };
        fetchSubscribedServices();
    }, [userId]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const [internetResponse, tvResponse] = await Promise.all([
                    axios.get('http://localhost:8082/api/internet-services/', { withCredentials: true }),
                    axios.get('http://localhost:8082/api/tv-services/', { withCredentials: true })
                ]);

                setInternetServices(internetResponse.data);
                setTvServices(tvResponse.data);
            } catch (err) {
                setError('Error fetching services.');
                console.error('Error fetching services:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    //console.log(userId);
    // Function to handle subscription using query parameters
    const handleSubscribe = async (serviceId, isInternetService) => {

        const apiUrl = isInternetService
                ? `http://localhost:8082/user/api/internet-service`
                : `http://localhost:8082/user/api/tv-service`;

        try {

            // POST request with query params instead of request body
            await axios.post(
                apiUrl,
                null,
                {
                    params: { serviceId }, // Send serviceId as query param
                    withCredentials: true
                }
            );
            //console.log(apiUrl+serviceId)

            alert('Request sent to admin successfully!');
        } catch (err) {
            alert('Error sending request to admin.');
            console.error('Error details:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // added 4
    const canSubscribeToInternet = subInternetServices.length < subscriptionLimits.internet;
    const canSubscribeToTv = subTvServices.length < subscriptionLimits.tv;
    //console.log(canSubscribeToInternet)
    //console.log(canSubscribeToTv)
    return (
        <div>
            <h1>Internet Services</h1>
            <div className="services-grid">
                {internetServices.length === 0 ? (
                    <p>No internet services available.</p>
                ) : (
                    internetServices.map(service => (
                        service.active && (
                            <div className="service-box" key={service.serviceId}>
                                <h2>{service.serviceName}</h2>
                                <p><strong>Type:</strong> {service.serviceType}</p>
                                <p><strong>Benefits:</strong> {service.benefits}</p>

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

                                {/* Subscribe button */}
                                <button
                                    className="subscribe-btn"
                                    onClick={() => handleSubscribe(service.serviceId, true)}
                                    disabled={!canSubscribeToInternet}
                                >
                                    Subscribe
                                </button>
                            </div>
                        )
                    ))
                )}
            </div>

            <hr /> {/* Simple divider instead of Ant Design's Divider */}

            <h1>TV Services</h1>
            <div className="services-grid">
                {tvServices.length === 0 ? (
                    <p>No TV services available.</p>
                ) : (
                    tvServices.map(service => (
                        service.active && (
                            <div className="service-box" key={service.serviceId}>
                                <h2>{service.serviceName}</h2>
                                <p><strong>Type:</strong> {service.serviceType}</p>
                                <p><strong>Benefits:</strong> {service.benefits}</p>

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

                                {/* Subscribe button */}
                                <button
                                    className="subscribe-btn"
                                    onClick={() => handleSubscribe(service.serviceId, false)}
                                    disabled={!canSubscribeToTv}
                                >
                                    Subscribe
                                </button>
                            </div>
                        )
                    ))
                )}
            </div>
        </div>
    );
}

export default Services;
