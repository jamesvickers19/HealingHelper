import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { medicationFiles } from "../../assets/files";
import { useState } from "react";

const LinkItem = ({
  title,
  openMedicationDetails,
}: {
  title: string;
  openMedicationDetails: () => void;
}) => {
  const handlePress = () => {
    openMedicationDetails();
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
  const openMedicationDetails = (data: any) => {
    router.push({
      pathname: "/medicationDetails",
      params: data,
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMedications, setFilteredMedications] =
    useState(medicationFiles);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setFilteredMedications(
        medicationFiles.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredMedications(medicationFiles);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredMedications}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <LinkItem
            title={item.commonName}
            openMedicationDetails={() => openMedicationDetails(item)}
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
  searchBar: {
    height: 40,
    borderColor: "#CED0CE",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  separator: {
    backgroundColor: "#CED0CE",
    marginVertical: 3,
    height: 1,
    width: 1000,
  },
});
