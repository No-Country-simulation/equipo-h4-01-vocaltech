'use client';
import { getHealthCheck } from '@/api/HealthCheck/Get/HealthCheck';
import { useEffect, useState } from 'react';

export const useHealthCheck = () => {
  const [serverStatus, setServerStatus] = useState<string>(
    'Checking server status...'
  );

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await getHealthCheck();
        setServerStatus('Server is online');
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setServerStatus('Server is waking up...');
        } else {
          setServerStatus('Error checking server status');
        }
      }
    };

    checkHealth();
  }, []);

  return serverStatus;
};
