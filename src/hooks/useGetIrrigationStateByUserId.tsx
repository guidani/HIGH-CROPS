import { useAuth } from '@clerk/clerk-expo';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { rtdb } from '../services/firebaseConfig';

export default function useGetIrrigationStateByUserId(sensorId: string) {
  const [ativado, setAtivado] = useState<boolean>();
  const { userId } = useAuth();
  useEffect(() => {
    const valueRef = ref(rtdb, `users/${userId}/sensores/${sensorId}/irrigation/v`);
    const unsubscribe = onValue(valueRef, (snapshot) => {
      const val = snapshot.val();
      setAtivado(val);
    });
    return () => unsubscribe();
  }, []);
  return { ativado };
}
