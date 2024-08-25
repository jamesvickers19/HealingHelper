import { FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { medicationFiles } from "../../assets/files";

// TODO change this to pages on the medications
const links = [
  { id: "1", title: "Tylenol", resourceId: "tylenol" },
  { id: "2", title: "Advil", resourceId: "advil" },
];

const LinkItem = ({
  title,
  openModal,
}: {
  title: string;
  openModal: () => void;
}) => {
  const handlePress = () => {
    openModal();
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
  const openModal = (data: any) => {
    console.log("openModal call data", data);
    router.push({
      pathname: "/modal",
      params: data,
    });
  };
  console.log("medicationFiles", medicationFiles);
  return (
    <View style={styles.container}>
      <FlatList
        data={medicationFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LinkItem title={item.commonName} openModal={() => openModal(item)} />
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
