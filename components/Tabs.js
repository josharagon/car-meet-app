import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainMap from "./MainMap.js";
import UserSearch from "./UserSearch";
import UserProfile from "./UserProfile";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#FFFFFF",
        activeBackgroundColor: "#202020",
        inactiveBackgroundColor: "#202020",
      }}
      options={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={MainMap}
      />
      <Tab.Screen
        name="Search"
        options={{ headerShown: false }}
        component={UserSearch}
      />
      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={UserProfile}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
