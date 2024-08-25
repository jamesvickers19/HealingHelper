import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useLocalSearchParams, useRouter } from "expo-router";

// TODO change this to show a medication details page

export default function ModalScreen() {
  const router = useRouter();
  const x = useLocalSearchParams();
  console.log("modal data", JSON.stringify(x));
  return (
    <View style={styles.container}>
      <Text>Common Name: {x.commonName}</Text>
      <Text>Drug Name: {x.drugName}</Text>
      <Text>Purpose: {x.purpose}</Text>
      <Text>{x.description}</Text>
      <Button title="Close" onPress={() => router.back()} />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
