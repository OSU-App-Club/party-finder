import { StyleSheet } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import useLocation from '@/hooks/useLocation';
import { useFetchCloseParties } from '@/hooks/queries/useFetchCloseParties';

export default function App() {
  const { latitude, longitude, permissionDenied, awaitingPermission } = useLocation();
  const { data, isLoading, error } = useFetchCloseParties(latitude, longitude, 10);

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
      >
        {data?.map((party) => (
          <Marker
            key={party.id}
            coordinate={party.location}
            title={party.title}
            description={party.description}
          />
        ))}
      </MapView>
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
