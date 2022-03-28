import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import MainMap from "./MainMap.js";
import UserSearch from "./UserSearch";
import UserProfile from "./UserProfile";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

const ProfileStack = createStackNavigator();

const Tabs = ({ currentDriver }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarActiveBackgroundColor: "#202020",
        tabBarInactiveBackgroundColor: "#202020",
        tabBarLabel: "",
        tabBarStyle: [{ display: "flex", borderTopWidth: 0 }, null],
      }}
      // tabBarOptions={{
      //   showLabel: false,
      //   activeTintColor: "#FFFFFF",
      //   activeBackgroundColor: "#202020",
      //   inactiveBackgroundColor: "#202020",
      //   backgroundColor: "#212121",
      //   borderTopWidth: 0,
      // }}
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
        initialParams={{ dude: currentDriver }}
      />
    </Tab.Navigator>
  );
};

function ProfileStackScreen({ route, navigation }) {
  console.log(route.params);
  useEffect(() => {
    if (route.params?.currentDriver) {
      console.log(route.params.currentDriver);
    } else {
      console.log("no current driver", route.params);
    }
  }, [route.params?.currentDriver]);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={UserProfile}
        initialParams={{ currentDriver: null }}
      />
      <ProfileStack.Screen
        name="Settings"
        options={{ headerShown: false }}
        component={Settings}
      />
    </ProfileStack.Navigator>
  );
}

export default Tabs;
