import { Tabs } from "expo-router";
import { DefaultNavigatorOptions, Variables } from "@style";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";

const getTabIcon = (name: string, focused: boolean) => {
  let icon = "";
  switch (name) {
    case "index":
      icon = "home";
      break;
    case "search":
      icon = "magnify";
      return "magnify";
    case "favorites":
      icon = "heart";
      break;
    case "profile":
      icon = "account";
      break;
  }

  return focused ? icon : `${icon}-outline`;
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Icons name={getTabIcon(route.name, focused)} size={size} color={color} />
        ),
        tabBarInactiveTintColor: Variables.colors.gray,
        ...DefaultNavigatorOptions.screenOptions,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;