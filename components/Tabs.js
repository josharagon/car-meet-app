import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import MainMap from "./MainMap.js";
import UserSearch from "./UserSearch";
import UserProfile from "./UserProfile";
import Settings from "./Settings";

import { setStatusBarHidden } from "expo-status-bar";

const Tab = createBottomTabNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={UserProfile}
      />
      <ProfileStack.Screen
        name="Settings"
        options={{ headerShown: false }}
        component={Settings}
      />
    </ProfileStack.Navigator>
  );
}
const ProfileStack = createStackNavigator();

const Tabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#FFFFFF",
        activeBackgroundColor: "#202020",
        inactiveBackgroundColor: "#202020",
        backgroundColor: "#212121",
        borderTopWidth: 0,
      }}
      options={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker-outline"
              color={color}
              size={size}
            />
          ),
        }}
        component={MainMap}
      />
      <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-search-outline"
              color={color}
              size={size}
            />
          ),
        }}
        component={UserSearch}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
        }}
        component={ProfileStackScreen}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
