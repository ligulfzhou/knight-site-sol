
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";


const POLLING_INTERVAL = 8000;
const RPC_URLS = {
    1: "https://mainnet.infura.io/v3/786649a580e3441f996da22488a8742a",
    4: "https://rinkeby.infura.io/v3/786649a580e3441f996da22488a8742a"
};

export const injected = new InjectedConnector({
    supportedChainIds: [1, 4]
});

// @ts-ignore
export const network = new NetworkConnector({
    urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
    defaultChainId: 1,
});