// import "../styles/globals.css";
import 'tailwindcss/tailwind.css'
import { ToastProvider } from 'react-toast-notifications';


import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { WalletBalanceProvider } from "../hooks/useWalletBalance";

require("@solana/wallet-adapter-react-ui/styles.css");

const WalletConnectionProvider = dynamic(
  () => import("../components/WalletConnection/WalletConnectionProvider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectionProvider>
      <WalletBalanceProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </WalletBalanceProvider>
    </WalletConnectionProvider>
  );
}
export default MyApp;
