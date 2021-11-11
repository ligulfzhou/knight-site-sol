import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { getNFTCountForOwner, getNFTsForOwner } from "../utils/candyMachine";
import * as consts from "../utils/const";

// const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;
const rpcHost = consts.NEXT_PUBLIC_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const useWalletNftCount = () => {
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }

      setIsLoading(true);

      // const nftsForOwner = await getNFTsForOwner(connection, wallet.publicKey);
      const nftsCountForOwner = await getNFTCountForOwner(connection, wallet.publicKey)
      setCount(nftsCountForOwner)
      setIsLoading(false);
    })();
  }, [wallet]);

  return [isLoading, count];
};

export default useWalletNftCount;
