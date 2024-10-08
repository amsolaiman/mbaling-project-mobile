import { Modal, StyleSheet, Text, View } from "react-native";
// theme
import Fonts from "@/theme/Fonts";
import Colors from "@/theme/Colors";
// component
import Spinner from "./spinner";

// ----------------------------------------------------------------------

type Props = {
  state: boolean;
  caption?: string;
};

const SpinnerOverlay: React.FC<Props> = ({ state, caption = "Loading..." }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={state}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Spinner />

          <Text style={styles.caption}>{caption}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SpinnerOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.common.black[500],
  },
  container: {
    alignItems: "center",
    gap: 12,
  },
  caption: {
    color: Colors.common.white.main,
    textAlign: "center",
    fontSize: 14,
    ...Fonts[400],
  },
});
