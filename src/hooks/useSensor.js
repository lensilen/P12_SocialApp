import { useEffect, useState } from 'react';
import { Accelerometer, Gyroscope } from 'expo-sensors';

export function useSensor() {
  const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });
  const [gyro, setGyro] = useState({ x: 0, y: 0, z: 0 });
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    Accelerometer.setUpdateInterval(300);
    Gyroscope.setUpdateInterval(300);

    const accelSub = Accelerometer.addListener((value) => {
      setAccel(value);
      const total = Math.abs(value.x) + Math.abs(value.y) + Math.abs(value.z);
      setShaking(total > 2.5);
    });

    const gyroSub = Gyroscope.addListener(setGyro);

    return () => {
      accelSub.remove();
      gyroSub.remove();
    };
  }, []);

  return { accel, gyro, shaking };
}
