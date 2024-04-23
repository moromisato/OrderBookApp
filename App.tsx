import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./src/components/Button";
import { OrderBook } from "./src/screens/OrderBook";
import startNetworkListener from "./src/services/networkingService/networkingService";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <OrderBook />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
