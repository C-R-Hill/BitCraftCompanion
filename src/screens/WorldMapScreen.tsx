import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useBitCraft} from '../context/BitCraftContext';

const WorldMapScreen: React.FC = () => {
  const {worldMap, fetchWorldMap, isLoading, error} = useBitCraft();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchWorldMap();
    setRefreshing(false);
  }, [fetchWorldMap]);

  useEffect(() => {
    fetchWorldMap();
  }, [fetchWorldMap]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <Text style={styles.title}>BitCraft World Map</Text>
        <Text style={styles.subtitle}>
          Explore the world and discover resources
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapIcon}>🗺️</Text>
          <Text style={styles.mapText}>Interactive World Map</Text>
          <Text style={styles.mapDescription}>
            {worldMap
              ? `${worldMap.size.width}x${worldMap.size.height} world`
              : 'Loading world data...'}
          </Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>🔍</Text>
          <Text style={styles.controlText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>📍</Text>
          <Text style={styles.controlText}>My Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>🏰</Text>
          <Text style={styles.controlText}>Claims</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>📦</Text>
          <Text style={styles.controlText}>Resources</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  mapContainer: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapPlaceholder: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  mapDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  controlButton: {
    alignItems: 'center',
    padding: 12,
  },
  controlIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  controlText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  errorContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
  },
});

export default WorldMapScreen; 