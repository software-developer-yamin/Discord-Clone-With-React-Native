import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { useEffect } from "react";
import { Alert } from "react-native";

const API_KEY = "je8mzyd5zvdm";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const connectUser = async () => {
    try {
      await client.connectUser(
        {
          id: "user-2",
          name: "User 2",
          image: "https://i.pravatar.cc/300?img=1",
        },
        client.devToken("user-2")
      );

      // create a channel
      const channel = client.channel("team", "general-2", {
        name: "General 2",
      });
      await channel.create();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  useEffect(() => {
    connectUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
