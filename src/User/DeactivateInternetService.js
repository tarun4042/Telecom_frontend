import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeactivateInternetService = ({ selectedService }) => {
    // const [selectedService, setSelectedService] = useState(null);
    // const [message, setMessage] = useState('');
    // const [error, setError] = useState('');

    // // Effect to set the selected service if available
    // useEffect(() => {
    //     if (internetServices.length > 0) {
    //         setSelectedService(internetServices[0]);  // Automatically select the first service
    //     } else {
    //         setSelectedService(null);
    //     }
    // }, [internetServices]);

    // // Function to deactivate the selected Internet service
    // const deactivateService = async () => {
    //     if (!selectedService) {
    //         setError('No Internet service selected.');
    //         return;
    //     }

    //     try {
    //         const { serviceId, startDate } = selectedService;
    //         const response = await axios.post(
    //             'http://localhost:8082/user/api/deactivate-internet-service',
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
    //         setError('Error deactivating Internet service.');
    //         console.error(err);
    //     }
    // };
   
    // //   starting here
    // const [message, setMessage] = useState('');
    // const [error, setError] = useState('');

    // // Function to deactivate the selected TV service

    // console.log(selectedService);
    // const deactivateService = async () => {
    //     if (!selectedService) {
    //         setError('No Internet service selected.');
    //         return;
    //     }

    //     try {
    //         const { serviceId, startDate } = selectedService;
            
    //         const response = await axios.delete(
    //             'http://localhost:8082/user/api/internet-service',
    //             //null, // No request body needed
    //             {
    //                 params: { availedServiceId: serviceId, startDate },
    //                 withCredentials: true
    //             }
    //         );

    //         setMessage(response.data);
    //         setError('');
    //     } catch (err) {
    //         setMessage('');
    //         setError('Error deactivating Internet service.');
    //         console.error(err);
    //     }
    // };
    // // ends here
    const navigate = useNavigate();

    const handleFeedbackNavigation = () => {
        if (!selectedService) {
            console.error('No Internet service selected.');
            return;
        }
        navigate('/user/internet-service-feedback', { state: { selectedService } });
    };
    return (
        <div>
            {selectedService ? (
                <div>
                    <button onClick={handleFeedbackNavigation}>
                        Deactivate Internet Service
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

export default DeactivateInternetService;

