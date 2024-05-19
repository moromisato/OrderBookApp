import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { THEME } from "../../theme/theme";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { useEffect } from "react";
import startNetworkListener from "../../services/networkingService/networkingService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  OrderBookStructure,
  updatePrecision,
} from "../../store/slices/orderBookSlice";
import {
  connectToWebsocket,
  disconnectFromWebsocket,
  subscribe,
} from "../../store/slices/websocketSlice";

export const OrderBook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    startNetworkListener();
  }, []);

  const isConnected = useSelector(
    (state: RootState) => state.networking.isOnline,
  );

  const { asks, bids, precision } = useSelector(
    (state: RootState) => state.orderBook,
  );

  useEffect(() => {
    console.log("changed precision to ", precision);
  }, [precision]);

  const unifiedLists = (bookStructure: OrderBookStructure) => {
    const bidsArray = Object.entries(bookStructure.bids).map(
      ([price, { count, amount }]) => ({
        key: price,
        type: "Bid",
        price: Number(price),
        count,
        amount,
      }),
    );

    const asksArray = Object.entries(bookStructure.asks).map(
      ([price, { count, amount }]) => ({
        key: price,
        type: "Ask",
        price: Number(price),
        count,
        amount,
      }),
    );

    return [...bidsArray, ...asksArray];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.headerText}>
            ORDER BOOK <Text style={{ color: THEME.textLight }}>BTC/USD</Text>
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: THEME.white,
              borderRadius: 5,
              backgroundColor: THEME.primary,
              padding: 5,
              margin: 5,
            }}
            onPress={
              () =>
                dispatch(
                  subscribe({
                    event: "subscribe",
                    channel: "book",
                    symbol: "tBTCUSD",
                    freq: "F1",
                    prec: precision,
                  }),
                )
              /*dispatch({
                type: "socket/send",
                payload: {
                  event: "subscribe",
                  channel: "book",
                  symbol: "tBTCUSD",
                  freq: "F1",
                  prec: precision,
                },
              })*/
            }
          >
            <Text style={{ color: THEME.white }}>subscribe</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottom}>
          <Button
            title="connect"
            onPress={() => {
              dispatch(connectToWebsocket());
            }}
            variant="primary"
          />
          <Button
            title="disconnect"
            onPress={() => dispatch(disconnectFromWebsocket())}
            variant="secondary"
          />
          <Button
            title="<"
            onPress={() =>
              dispatch(
                updatePrecision({
                  changePrecision: "decrease",
                }),
              )
            }
            variant="secondary"
          />
          <Button
            title=">"
            onPress={() =>
              dispatch(
                updatePrecision({
                  changePrecision: "increase",
                }),
              )
            }
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
    paddingTop: 30,
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
    display: "flex",
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
