// import React, { useState } from 'react';
// import './Styling_Components/FeedbackForm.css';

// const InternetFeedback = () => {
//     const [feedback, setFeedback] = useState('');
//     const [submitted, setSubmitted] = useState(false);

//     const handleInputChange = (event) => {
//         setFeedback(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (feedback.trim() === '') {
//             alert('Please enter your feedback before submitting.');
//             return;
//         }
//         // Here, you can send the feedback to your backend
//         console.log('Feedback submitted:', feedback);
//         setSubmitted(true);
//     };

//     const handleCancel = () => {
//         setFeedback('');
//         setSubmitted(false);
//     };

//     return (
//         <div className="feedback-form">
//             <h2>User Feedback</h2>
//             {submitted ? (
//                 <p>Thank you for your feedback!</p>
//             ) : (
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="feedback">Your Feedback:</label>
//                         <textarea
//                             id="feedback"
//                             className="form-control"
//                             rows="4"
//                             value={feedback}
//                             onChange={handleInputChange}
//                             placeholder="Enter your feedback here"
//                         />
//                     </div>
//                     <div className="form-actions">
//                         <button type="submit" className="btn btn-primary">
//                             Submit
//                         </button>
//                         <button type="button" className="btn btn-secondary" onClick={handleCancel}>
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default InternetFeedback;


import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Styling_Components/FeedbackForm.css';

const InternetFeedback = () => {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');  // For deactivation messages
    const location = useLocation();
    const { selectedService } = location.state; // Retrieve service details passed via state

    const handleInputChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!feedback.trim()) {
            alert('Please enter your feedback before submitting.');
            return;
        }

        try {
            console.log(selectedService)
            await axios.post('http://localhost:8082/user/api/internet-service/feedback',null, {
                params: { availedServiceId: selectedService.serviceId, feedback },
                withCredentials: true
            });
            setSubmitted(true);
        } catch (err) {
            setError('Failed to submit feedback.');
            console.error(err);
        }
        
    };

    // Deactivation function for the service
    const handleDeactivateService = async () => {
        try {
            const { serviceId, startDate } = selectedService;
            
            const response = await axios.delete(
                'http://localhost:8082/user/api/internet-service',
                {
                    params: { availedServiceId: serviceId, startDate },
                    withCredentials: true
                }
            );

            setMessage(response.data);
            setError('');
        } catch (err) {
            setMessage('');
            setError('Error deactivating Internet service.');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setFeedback('');
        setSubmitted(false);
    };

    return (
        <div className="feedback-form">
            <h2>User Feedback</h2>
            {submitted ? (
                <p>Thank you for your feedback!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="feedback">Your Feedback:</label>
                        <textarea
                            id="feedback"
                            className="form-control"
                            rows="4"
                            value={feedback}
                            onChange={handleInputChange}
                            placeholder="Enter your feedback here"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

<div className="deactivation-section">
                <h2>Deactivate Service</h2>
                <button onClick={handleDeactivateService} className="btn btn-danger">
                    Deactivate Service
                </button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default InternetFeedback;
