import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface LocationData {
    latitude: number;
    longitude: number;
    permissionDenied: boolean;
    awaitingPermission: boolean;
}

const useLocation = (): LocationData => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [awaitingPermission, setAwaitingPermission] = useState(true);

    // Request location permission and get current location
    useEffect(() => {
        (async () => {
            // Trigger location permission request
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== null) {
                setAwaitingPermission(false);
            }

            if (status !== 'granted') {
                setPermissionDenied(true);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
        })();
    }, []);

    return {
        latitude: latitude || 0,
        longitude: longitude || 0,
        permissionDenied: permissionDenied,
        awaitingPermission: awaitingPermission,
    };
};

export default useLocation;
