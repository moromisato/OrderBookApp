import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { THEME } from "../../theme/theme";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { useEffect } from "react";
import startNetworkListener from "../../services/networkingService/networkingService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { OrderBookStructure } from "../../store/slices/orderBookSlice";

export const OrderBook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    startNetworkListener();
    dispatch({ type: "socket/connect" });
  }, []);

  const isConnected = useSelector(
    (state: RootState) => state.networking.isOnline
  );

  const { asks, bids } = useSelector((state: RootState) => state.orderBook);

  const unifiedLists = (bookStructure: OrderBookStructure) => {
    const bidsArray = Object.entries(bookStructure.bids).map(
      ([price, { count, amount }]) => ({
        key: price,
        type: "Bid",
        price: Number(price),
        count,
        amount,
      })
    );

    const asksArray = Object.entries(bookStructure.asks).map(
      ([price, { count, amount }]) => ({
        key: price,
        type: "Ask",
        price: Number(price),
        count,
        amount,
      })
    );

    return [...bidsArray, ...asksArray];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          ORDER BOOK <Text style={{ color: THEME.textLight }}>BTC/USD</Text>
        </Text>
        <View style={styles.headerBottom}>
          <Button
            title="connect"
            onPress={() => {
              dispatch({ type: "socket/send" });
            }}
            variant="primary"
          />
          <Button
            title="disconnect"
            onPress={() => dispatch({ type: "socket/disconnect" })}
            variant="secondary"
          />
        </View>
      </View>
      <View style={styles.content}>
        {isConnected ? (
          <Table data={unifiedLists({ asks, bids })} />
        ) : (
          <View>
            <Text>OFFLINE</Text>
          </View>
        )}
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
