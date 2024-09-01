import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { symptomFiles } from "../../assets/files";
import { useState } from "react";

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

export default function SymptomsListScreen() {
  const router = useRouter();

  // TODO maybe just navigate to a page instead of opening a modal?
  const openSymptomDetails = (data: any) => {
    router.push({
      pathname: "/symptomDetails",
      params: data,
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSymptoms, setFilteredSymptoms] = useState(symptomFiles);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setFilteredSymptoms(
        symptomFiles.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredSymptoms(symptomFiles);
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
        data={filteredSymptoms}
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
