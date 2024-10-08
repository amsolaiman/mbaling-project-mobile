import { StyleSheet } from "react-native";
// @expo
import { router, useLocalSearchParams } from "expo-router";
// components
import { Text, View } from "@/components/custom-native";

// ----------------------------------------------------------------------

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text onPress={router.back} font="300" style={styles.title}>
        Post Details
      </Text>
      <Text font="100" style={styles.id}>
        {id}
      </Text>
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
    fontSize: 48,
  },
  id: {
    fontSize: 12,
  },
});
