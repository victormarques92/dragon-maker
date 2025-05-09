import { CircularProgress, Stack } from '@mui/material';
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface Props {
  lat?: number;
  lng?: number;
}

export const Map: React.FC<Props> = ({ lat, lng }) => {
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setPosition({ lat, lng });
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setPosition({
            lat: coords.latitude,
            lng: coords.longitude,
          });
        },
        () => {
          setPosition({ lat: 0, lng: 0 });
        },
      );
    }
  }, [lat, lng]);

  if (!isLoaded || !position) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        height="100%"
        sx={{
          backgroundColor: theme => theme.palette.grey[200],
        }}
      >
        <CircularProgress color="primary" />
      </Stack>
    );
  }

  return (
    <GoogleMap
      center={position}
      zoom={15}
      mapContainerStyle={{ width: '100%', height: '100%' }}
    >
      <Marker position={position} />
    </GoogleMap>
  );
};
