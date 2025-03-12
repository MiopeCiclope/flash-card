import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons'; // Import the icon library
import { UserData } from '@/models/git-user';

type CustomDrawerContentProps = DrawerContentComponentProps & {
  userData: UserData | null;
  onLogin: () => void;
  onLogout: () => void;
  onSync: () => void; // Add a prop for the sync function
};

export default function CustomDrawerContent({
  userData,
  onLogin,
  onLogout,
  onSync,
  ...props
}: CustomDrawerContentProps) {
  return (
    <View style={styles.container}>
      {/* User Info at the Top */}
      {userData ? (
        <View style={styles.userContainer}>
          <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
          <Text style={styles.userName}>{userData.name}</Text>

          {/* Sync Data Button */}
          <TouchableOpacity onPress={onSync} style={styles.syncButton}>
            <MaterialIcons name="sync" size={24} color="#fff" />
            <Text style={styles.syncButtonText}>Sync Data</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={onLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login with GitHub</Text>
        </TouchableOpacity>
      )}

      {/* Default Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button at the Bottom */}
      {userData && (
        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  userContainer: {
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  syncButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#24292e',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  drawerItems: {
    flex: 1,
  },
  logoutContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
