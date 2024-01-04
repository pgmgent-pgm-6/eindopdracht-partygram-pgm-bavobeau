import { Tabs, useRouter } from "expo-router";
import { DefaultNavigatorOptions, Variables } from "@style";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";

const getTabIcon = (name: string, focused: boolean) => {
  let icon = "";
  switch (name) {
    case "index":
      icon = "home";
      break;
    case "projects":
      icon = "folder";
      break;
    case "clients":
      icon = "briefcase-account";
      break;
    case "settings":
      icon = "cog";
      break;
  }

  return focused ? icon : `${icon}`;
};

const TabLayout = () => {
  const router = useRouter();
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
          title: "Logs",
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: "Clients",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;