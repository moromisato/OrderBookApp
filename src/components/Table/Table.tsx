import { View, StyleSheet, Text, FlatList } from "react-native";
import { THEME } from "../../theme/theme";

interface TableProps {
  data: {
    key: string;
    type: string;
    price: number;
    count: number;
    amount: number;
  }[];
}

export const Table = ({ data }: TableProps) => {
  const renderItem = ({
    item,
  }: {
    item: {
      key: string;
      type: string;
      price: number;
      count: number;
      amount: number;
    };
  }) => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCountColumn}>{item.count}</Text>
        <Text style={styles.tableRowText}>{item.amount}</Text>
        <Text style={styles.tableRowText}>{item.price}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableContent}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          ListHeaderComponent={() => {
            return (
              <View style={styles.tableRow}>
                <Text style={styles.tableColumnText}>COUNT</Text>
                <Text style={[styles.tableColumnText, { textAlign: "right" }]}>
                  AMOUNT
                </Text>
                <Text style={[styles.tableColumnText, { textAlign: "right" }]}>
                  PRICE
                </Text>
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
    flex: 1,
    flexDirection: "row",
    backgroundColor: THEME.white,
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
    fontSize: 16,
    textAlign: "center",
    color: THEME.textLight,
  },
  tableRow: {
    flex: 1,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableRowText: {
    flex: 1,
    color: THEME.white,
    fontSize: 16,
    textAlign: "right",
  },
  tableCountColumn: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: THEME.white,
  },
});
