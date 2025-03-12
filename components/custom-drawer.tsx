import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { UserData } from '@/models/git-user';

type CustomDrawerContentProps = DrawerContentComponentProps & {
  userData: UserData | null;
  onLogin: () => void;
  onLogout: () => void;
};

export default function CustomDrawerContent({
  userData,
  onLogin,
  onLogout,
  ...props
}: CustomDrawerContentProps) {
  return (
    <View style={styles.container}>
      {/* User Info at the Top */}
      {userData ? (
        <View style={styles.userContainer}>
          <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
          <Text style={styles.userName}>{userData.name}</Text>
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
