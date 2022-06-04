import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ChannelList, Chat, OverlayProvider } from "stream-chat-expo";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'"]);

const API_KEY = "je8mzyd5zvdm";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

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
      setIsReady(true);

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

  if (!isLoadingComplete && !isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <OverlayProvider>
          <Chat client={client}>
            {/* <Navigation colorScheme={colorScheme} /> */}
            <ChannelList />
          </Chat>
        </OverlayProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
