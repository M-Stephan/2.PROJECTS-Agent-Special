import { useEffect } from 'react';

// Component to display a success message and auto-dismiss after a delay
function ConnectionSuccess({ message, onFinish }) {
    useEffect(() => {
        const timer = setTimeout(() => {
          if (onFinish) onFinish();
        }, 3000); // 3 sec
        return () => clearTimeout(timer);
    }, [onFinish]);

    // Render the success message
    return (
        <div className="success-message">
            <h1>{message}</h1>
        </div>
    );
}

export default ConnectionSuccess;
