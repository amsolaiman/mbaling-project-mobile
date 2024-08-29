import { StyleSheet } from "react-native";
// _mock
import { _landlordDetails, _users } from "@/_mock";
// hooks
import { useColorScheme } from "@/hooks/use-color-scheme";
// theme
import Colors from "@/theme/Colors";
// components
import InfoHelper from "@/components/info-helper";
import { Text, View } from "@/components/custom-native";
//
import AccountListItem from "../_common/account-list-item";

// ----------------------------------------------------------------------

export default function AccountStudentDisplay() {
  const theme = useColorScheme() ?? "light";

  const _pending = [...Array(3)].map((item, index) => {
    const data = {
      name: _landlordDetails[index].housingName,
      username: _users[index].username,
      avatarUrl: _users[index].avatarUrl,
    };

    return (
      <AccountListItem
        key={item}
        data={data}
        onReject={() => console.log(data.name)}
      />
    );
  });

  return (
    <View style={styles.container}>
      <InfoHelper
        title="Set your campus housing"
        caption="Please set your campus housing address to complete your student record."
        instruction="Go to your landlord profile > click Apply."
      />

      <View style={styles.listWrapper}>
        <Text
          font="600"
          style={{
            fontSize: 16,
            color:
              theme === "light" ? Colors.grey[700] : Colors.common.white.main,
          }}
        >
          Pending
        </Text>

        {_pending}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    paddingBottom: 102,
    paddingHorizontal: 16,
  },
  listWrapper: {
    marginTop: 20,
    flex: 1,
    gap: 10,
  },
});
