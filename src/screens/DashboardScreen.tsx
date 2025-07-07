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
import {useBitCraft} from '../context/BitCraftContext';

const DashboardScreen: React.FC = () => {
  const {user, refreshUserData} = useAuth();
  const {isLoading, error} = useBitCraft();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshUserData();
    setRefreshing(false);
  }, [refreshUserData]);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const StatCard: React.FC<{title: string; value: string; icon: string}> = ({
    title,
    value,
    icon,
  }) => (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const QuickActionCard: React.FC<{
    title: string;
    description: string;
    icon: string;
    onPress: () => void;
  }> = ({title, description, icon, onPress}) => (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome back, {user?.username || 'Player'}!
        </Text>
        <Text style={styles.subtitleText}>
          Here's what's happening in your BitCraft world
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Active Claims"
            value={user?.claims.length.toString() || '0'}
            icon="🏰"
          />
          <StatCard
            title="Empires"
            value={user?.empires.length.toString() || '0'}
            icon="👑"
          />
          <StatCard
            title="Resources"
            value="12"
            icon="📦"
          />
          <StatCard
            title="Online Time"
            value="2h 30m"
            icon="⏱️"
          />
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <QuickActionCard
          title="View World Map"
          description="Explore the BitCraft world and find resources"
          icon="🗺️"
          onPress={() => {}}
        />
        <QuickActionCard
          title="Check Claims"
          description="Monitor your claims and empire status"
          icon="🏰"
          onPress={() => {}}
        />
        <QuickActionCard
          title="Join Chat"
          description="Connect with other players in your empire"
          icon="💬"
          onPress={() => {}}
        />
        <QuickActionCard
          title="Manage Resources"
          description="Track and manage your resources"
          icon="📦"
          onPress={() => {}}
        />
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#64748b',
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
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
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  actionsContainer: {
    padding: 20,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#64748b',
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

export default DashboardScreen; 