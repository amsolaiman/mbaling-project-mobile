import { StyleSheet } from "react-native";
// components
import { Text, View } from "@/components/custom-native";

// ----------------------------------------------------------------------

export default function PostEditScreen() {
  return (
    <View style={styles.container}>
      <Text font="300" style={styles.title}>
        Edit Post
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
});
