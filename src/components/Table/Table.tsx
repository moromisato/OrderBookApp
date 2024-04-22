import { View, StyleSheet, Text, FlatList } from "react-native";
import { THEME } from "../../theme/theme";

export type Data = number[][];

interface TableProps {
  data: Data;
}

export const Table = ({ data }: TableProps) => {
  const renderItem = ({ item }: { item: number[] }) => {
    const [price, count, amount] = item;
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableRowText}>{price}</Text>
        <Text style={styles.tableRowText}>{count}</Text>
        <Text style={styles.tableRowText}>{amount}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableContent}>
        <FlatList
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={() => {
            return (
              <View style={styles.tableHeader}>
                <Text style={styles.tableColumnText}>COUNT</Text>
                <Text style={styles.tableColumnText}>AMOUNT</Text>
                <Text style={styles.tableColumnText}>TOTAL</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: THEME.white,
    alignItems: "center",
    justifyContent: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: THEME.primary,
    paddingTop: 8,
    paddingBottom: 8,
  },
  tableContent: {
    flex: 1,
    width: "100%",
    backgroundColor: THEME.primary,
  },
  tableColumnText: {
    flex: 1,
    textAlign: "center",
    color: THEME.textLight,
  },
  tableRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tableRowText: {
    color: THEME.white,
    fontSize: 16,
  },
});
