import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { THEME } from "../../theme/theme";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";

export const OrderBook = () => {
  const orderBookData = [
    [
      7254.7, //PRICE
      3, //COUNT
      3.3, //AMOUNT
    ], //BOOK_ENTRY
    [
      7254.7, //PRICE
      3, //COUNT
      3.3, //AMOUNT
    ], //BOOK_ENTRY
  ]; //BOOK_ENTRIES

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          ORDER BOOK <Text style={{ color: THEME.textLight }}>BTC/USD</Text>
        </Text>
        <View style={styles.headerBottom}>
          <Button
            title="connect"
            onPress={() => console.log("connect")}
            variant="primary"
          />
          <Button
            title="disconnect"
            onPress={() => console.log("disconnect")}
            variant="secondary"
          />
        </View>
      </View>
      <View style={styles.content}>
        <Table data={orderBookData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    padding: 16,
    width: "100%",
  },
  headerText: {
    color: THEME.text,
    fontSize: 20,
  },
  headerBottom: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8,
  },
  content: {
    flex: 1,
    padding: 8,
    width: "100%",
  },
});
