import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeactivateTvService = ({ selectedService }) => {
    // const [selectedService, setSelectedService] = useState(null);
    // const [message, setMessage] = useState('');
    // const [error, setError] = useState('');

    // // Effect to set the selected service if available
    // useEffect(() => {
    //     if (tvServices.length > 0) {
    //         setSelectedService(tvServices[0]);  // Automatically select the first service
    //     } else {
    //         setSelectedService(null);
    //     }
    // }, [tvServices]);

    // // Function to deactivate the selected TV service
    // const deactivateService = async () => {
    //     if (!selectedService) {
    //         setError('No TV service selected.');
    //         return;
    //     }

    //     try {
    //         const { serviceId, startDate } = selectedService;
    //         const response = await axios.post(
    //             'http://localhost:8082/user/api/deactivate-tv-service',
    //             null, // No request body needed
    //             {
    //                 params: { availedServiceId: serviceId, startDate },
    //                 withCredentials: true
    //             }
    //         );

    //         setMessage(response.data);
    //         setError('');
    //     } catch (err) {
    //         setMessage('');
    //         setError('Error deactivating TV service.');
    //         console.error(err);
    //     }
    // };


    const navigate = useNavigate();

    const handleFeedbackNavigation = () => {
        if (!selectedService) {
            console.error('No Tv service selected.');
            return;
        }
        navigate('/user/tv-service-feedback', { state: { selectedService } });
    };
    return (
        <div>
            {selectedService ? (
                <div>
                    <button onClick={handleFeedbackNavigation}>
                        Deactivate Tv Service
                    </button>
                </div>
            ) :  (
                <p>Loading service details...</p>
            )}
            {/* {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} */}
        </div>
    );
};

export default DeactivateTvService;

