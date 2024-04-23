import { StatusBar } from "expo-status-bar";
import { OrderBook } from "./src/screens/OrderBook";
import { Provider } from "react-redux";
import store from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <OrderBook />
    </Provider>
  );
}
