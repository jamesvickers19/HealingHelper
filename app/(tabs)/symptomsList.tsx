import { FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { symptomFiles } from "../../assets/files";

const LinkItem = ({
  title,
  openSymptomDetails,
}: {
  title: string;
  openSymptomDetails: () => void;
}) => {
  const handlePress = () => {
    openSymptomDetails();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.linkContainer}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default function MedicationsListScreen() {
  const router = useRouter();

  // TODO maybe just navigate to a page instead of opening a modal?
  const openSymptomDetails = (data: any) => {
    router.push({
      pathname: "/symptomDetails",
      params: data,
    });
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={symptomFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LinkItem
            title={item.name}
            openSymptomDetails={() => openSymptomDetails(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linkContainer: {
    marginVertical: 10,
  },
  linkText: {
    fontSize: 18,
    color: "white",
    textDecorationLine: "underline",
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
