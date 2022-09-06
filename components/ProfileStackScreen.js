import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import MainMap from "./MainMap.js";
import UserSearch from "./UserSearch";
import UserProfile from "./UserProfile";
import Settings from "./Settings";

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({ accountData, navigation }) => {
  useEffect(() => {
    // console.log(route.params);
    // if (route.params?.accountData) {
    //   console.log(route.params.accountData);
    // } else {
    //   console.log("no current driver", route.params.accountData);
    // }
  }, [accountData]);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        children={() => (
          <UserProfile
            userName={accountData.username}
            garageArr={accountData.profile}
          />
        )}
      />
      <ProfileStack.Screen
        name="Settings"
        options={{ headerShown: false }}
        component={Settings}
        // navigation={null}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
