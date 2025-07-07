import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useAuth} from '../context/AuthContext';

const ProfileScreen: React.FC = () => {
  const {user, logout} = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ],
    );
  };

  const ProfileItem: React.FC<{
    icon: string;
    title: string;
    value?: string;
    onPress?: () => void;
  }> = ({icon, title, value, onPress}) => (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={onPress}
      disabled={!onPress}>
      <Text style={styles.profileIcon}>{icon}</Text>
      <View style={styles.profileContent}>
        <Text style={styles.profileTitle}>{title}</Text>
        {value && <Text style={styles.profileValue}>{value}</Text>}
      </View>
      {onPress && <Text style={styles.profileArrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{user?.username?.charAt(0) || 'U'}</Text>
        </View>
        <Text style={styles.username}>{user?.username || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.sectionContent}>
          <ProfileItem
            icon="👤"
            title="Edit Profile"
            onPress={() => {}}
          />
          <ProfileItem
            icon="🔒"
            title="Change Password"
            onPress={() => {}}
          />
          <ProfileItem
            icon="📧"
            title="Email Settings"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>BitCraft Settings</Text>
        <View style={styles.sectionContent}>
          <ProfileItem
            icon="🔔"
            title="Notifications"
            onPress={() => {}}
          />
          <ProfileItem
            icon="🌍"
            title="Language"
            value="English"
            onPress={() => {}}
          />
          <ProfileItem
            icon="🎨"
            title="Theme"
            value="Light"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.sectionContent}>
          <ProfileItem
            icon="❓"
            title="Help & FAQ"
            onPress={() => {}}
          />
          <ProfileItem
            icon="📞"
            title="Contact Support"
            onPress={() => {}}
          />
          <ProfileItem
            icon="📝"
            title="Report Bug"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.sectionContent}>
          <ProfileItem
            icon="ℹ️"
            title="App Version"
            value="1.0.0"
          />
          <ProfileItem
            icon="📄"
            title="Terms of Service"
            onPress={() => {}}
          />
          <ProfileItem
            icon="🔒"
            title="Privacy Policy"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
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
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  profileIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  profileContent: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 2,
  },
  profileValue: {
    fontSize: 14,
    color: '#64748b',
  },
  profileArrow: {
    fontSize: 18,
    color: '#94a3b8',
  },
  logoutContainer: {
    padding: 20,
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
  },
});

export default ProfileScreen; 