import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useAuth} from '../context/AuthContext';

const ClaimsScreen: React.FC = () => {
  const {user, refreshUserData} = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshUserData();
    setRefreshing(false);
  }, [refreshUserData]);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const ClaimCard: React.FC<{
    claim: any;
  }> = ({claim}) => (
    <View style={styles.claimCard}>
      <View style={styles.claimHeader}>
        <Text style={styles.claimName}>{claim.name}</Text>
        <View
          style={[
            styles.statusBadge,
            claim.status === 'active' && styles.statusActive,
            claim.status === 'inactive' && styles.statusInactive,
            claim.status === 'under_attack' && styles.statusUnderAttack,
          ]}>
          <Text style={styles.statusText}>{claim.status}</Text>
        </View>
      </View>
      <Text style={styles.coordinates}>
        Coordinates: ({claim.coordinates.x}, {claim.coordinates.y})
      </Text>
      <View style={styles.resourcesContainer}>
        <Text style={styles.resourcesTitle}>Resources:</Text>
        {claim.resources.length > 0 ? (
          claim.resources.map((resource: any, index: number) => (
            <Text key={index} style={styles.resourceItem}>
              • {resource.name}: {resource.quantity}/{resource.maxQuantity}
            </Text>
          ))
        ) : (
          <Text style={styles.noResources}>No resources available</Text>
        )}
      </View>
    </View>
  );

  const EmpireCard: React.FC<{
    empire: any;
  }> = ({empire}) => (
    <View style={styles.empireCard}>
      <Text style={styles.empireName}>{empire.name}</Text>
      <Text style={styles.empireMembers}>
        Members: {empire.members.length}
      </Text>
      <Text style={styles.empireClaims}>
        Claims: {empire.claims.length}
      </Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <Text style={styles.title}>Claims & Empires</Text>
        <Text style={styles.subtitle}>
          Manage your BitCraft claims and empires
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Claims</Text>
        {user?.claims && user.claims.length > 0 ? (
          user.claims.map((claim: any, index: number) => (
            <ClaimCard key={index} claim={claim} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏰</Text>
            <Text style={styles.emptyTitle}>No Claims Yet</Text>
            <Text style={styles.emptyDescription}>
              You haven't claimed any territory yet. Start exploring the world!
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Empires</Text>
        {user?.empires && user.empires.length > 0 ? (
          user.empires.map((empire: any, index: number) => (
            <EmpireCard key={index} empire={empire} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>👑</Text>
            <Text style={styles.emptyTitle}>No Empires Yet</Text>
            <Text style={styles.emptyDescription}>
              You haven't joined any empires yet. Connect with other players!
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>🔍</Text>
          <Text style={styles.actionText}>Find New Claims</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>👥</Text>
          <Text style={styles.actionText}>Join Empire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionText}>View Statistics</Text>
        </TouchableOpacity>
      </View>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  claimCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  claimName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#dcfce7',
  },
  statusInactive: {
    backgroundColor: '#fef3c7',
  },
  statusUnderAttack: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  coordinates: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  resourcesContainer: {
    marginTop: 8,
  },
  resourcesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  resourceItem: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 8,
  },
  noResources: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  empireCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  empireName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  empireMembers: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  empireClaims: {
    fontSize: 14,
    color: '#64748b',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
});

export default ClaimsScreen; 