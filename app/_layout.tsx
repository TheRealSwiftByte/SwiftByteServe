import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { Button } from "@swift-byte/switftbytecomponents";
import { RestaurantContextProvider } from "@/context/RestaurantContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RestaurantContextProvider>
        <Stack initialRouteName="welcome">
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="signIn" options={{ headerShown: false }} />
          <Stack.Screen name="signUp" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="MyMenu"
            options={{
              title: "My Menu",
              headerRight: () => (
                <Button
                  buttonStyle={{ marginHorizontal: 20 }}
                  text={"+ Add Menu"}
                  type={"primary"}
                  size="small"
                  onPress={function (): void {
                    router.navigate("/MenuModal");
                  }}
                />
              ),
            }}
          />
          <Stack.Screen name="MenuModal" options={{ title: "Menu" }} />
          <Stack.Screen name="MyProfile" options={{ title: "My Profile" }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen name="orderDetail" options={{ title: 'Order Detail' }} />
        </Stack>
      </RestaurantContextProvider>
    </ThemeProvider>
  );
}
