import { StyleSheet } from 'react-native';

import MapView from 'react-native-maps';
import useLocation from '@/hooks/useLocation';

export default function App() {
  const { latitude, longitude, permissionDenied, awaitingPermission } = useLocation();

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude || 37.78825,
          longitude: longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
