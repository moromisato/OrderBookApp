import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import store from "../../store/store";
import { Dispatch } from "@reduxjs/toolkit";
import { checkConnection } from "../../store/slices/networkingSlice";

const handleConectivityChange = (dispatch: Dispatch, isConnected: boolean) => {
  dispatch(checkConnection(isConnected));
};

const startNetworkListener = () => {
  NetInfo.addEventListener((state: NetInfoState) => {
    const isConnected = state.isConnected ?? false;
    handleConectivityChange(store.dispatch, isConnected);
  });
};

export default startNetworkListener;
