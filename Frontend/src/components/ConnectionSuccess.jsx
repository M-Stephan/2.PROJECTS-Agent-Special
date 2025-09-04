import { useEffect } from 'react';

function ConnectionSuccess({ message, onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000); // 5 secondes
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="success-message">
      <h1>{message}</h1>
    </div>
  );
}

export default ConnectionSuccess;
