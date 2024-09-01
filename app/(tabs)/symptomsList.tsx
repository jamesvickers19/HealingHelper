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
      <Text style={styles.linkText}>{title}</Text>
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
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  linkContainer: {
    marginLeft: 7,
    marginVertical: 10,
  },
  linkText: {
    fontSize: 24,
    color: "blue",
    //textDecorationLine: "underline",
  },
  separator: {
    backgroundColor: "#CED0CE",
    marginVertical: 3,
    height: 1,
    width: 1000,
  },
});
