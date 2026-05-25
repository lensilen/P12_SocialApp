import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  const [loc, setLoc] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshLocation = async () => {
    try {
      setLoading(true);
      setError('');

      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        setError('Izin lokasi ditolak.');
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLoc(current.coords);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let subscription;
    let mounted = true;

    async function startLocation() {
      try {
        setLoading(true);
        const permission = await Location.requestForegroundPermissionsAsync();
        if (permission.status !== 'granted') {
          setError('Izin lokasi ditolak.');
          return;
        }

        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        if (mounted) setLoc(current.coords);
        if (mounted) setLoading(false);

        subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Balanced, distanceInterval: 10 },
          (next) => setLoc(next.coords)
        );
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    startLocation();

    return () => {
      mounted = false;
      subscription?.remove();
    };
  }, []);

  return { loc, error, loading, refreshLocation };
}
