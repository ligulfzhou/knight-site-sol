/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
// import toast from "react-hot-toast";
import { useToasts } from 'react-toast-notifications'


import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCandyMachine from "../hooks/useCandyMachine";
import useWalletBalance from "../hooks/useWalletBalance";
import { useWallet } from "@solana/wallet-adapter-react";

import { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import useWalletNfts from "../hooks/useWalletNFTs";
import useWalletNftCount from "../hooks/useWalletNFTCount";
import AnNFT from "../components/AnNFT/AnNFT";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import MilestoneSection from "../components/MilestoneSection";
import FaqSection from "../components/FaqSection";
import CollectionSection from "../components/CollectionSection";

export default function Home() {
  const [balance] = useWalletBalance();
  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    startMint,
    startMintMultiple,
    nftsData,
  } = useCandyMachine();
  const [isLoading, nftCount] = useWalletNftCount();
  const { connected, publicKey } = useWallet();
  const [isMintLive, setIsMintLive] = useState(false);
  const [privateStarted, setPrivateStarted] = useState(false);
  const [publicStarted, setPublicStarted] = useState(false);
  const [privateSeconds, setPrivateSeconds] = useState(0);
  const [publicSeconds, setPublicSeconds] = useState(0);
  const [inWL, setInWL] = useState(false);

  const { addToast } = useToasts()


  useEffect(() => {
    if (new Date(mintStartDate).getTime() < Date.now()) {
      setIsMintLive(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch('/knight/started')
      const data = await res.json()

      setPrivateStarted(data['presale_started']);
      setPrivateSeconds(data['presale_seconds']);
      setPublicSeconds(data['public_seconds']);
      setPublicStarted(data['public_started']);
      console.log(data)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if (!connected) {
        return
      }
      const address = publicKey?.toString()
      console.log('address: ' + address)
      // TODO
      // if (privateStarted && !publicStarted) {
      const res = await fetch('knight/in/whitelist/' + address)
      const data = await res.json()

      console.log(address + " in wl: " + data['in'])
      setInWL(data['in'])
      // }
    })();
  }, [connected])

  const mint = () => {
    if (!connected) {
      addToast("plz connect your wallet first...", {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }

    if (!isMintLive) {
      addToast("both premint and public mint are not started...", {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }

    if (isLoading as boolean) {
      addToast("checking if you have already minted 2 nfts,\nIt may take up to 20 seconds.\nBe patient...", {
        appearance: 'error',
        autoDismiss: true,
      })
      console.log(isLoading)
      return
    }

    if (nftCount >= 2) {
      addToast('you have already minted ' + nftCount + " nfts.", {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }

    if (privateStarted && !publicStarted && !inWL) {
      addToast('you are not in whitelist, can not mint in premint', {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    } else if (privateStarted && !publicStarted && inWL) {
      startMintMultiple(2)
    } else if (publicStarted) {
      startMintMultiple(2)
    } else {
      addToast("contact project master...but you will never see this...", {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  return (
    <Layout>
      <HeroSection />
      <section className="text-white body-font bg-gray-800" id="mint">
        <div className="container px-5 py-16 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">Mint Your Pixel Knights</h1>
          </div>
          <div className="flex items-center w-full px-4 py-10 bg-cover card bg-base-200" style={{ backgroundImage: `url(https://f002.backblazeb2.com/file/pixelknights/banner_450.png)` }}>
            <div className="card glass lg:card-side text-neutral-content">
              <figure className="p-6">
                <img src="https://f002.backblazeb2.com/file/pixelknights/mint_knights.png" className="rounded-lg shadow-lg" />
              </figure>
              <div className="max-w-md card-body">
                {!isMintLive ? (
                  <>
                    <div className="inline-block text-xl">mint date: {" "}
                    <Countdown
                      date={mintStartDate}
                      onMount={({ completed }) => completed && setIsMintLive(true)}
                      onComplete={() => setIsMintLive(true)}
                      className="inline-block"
                    />
                    </div>
                  </>
                ):(
                  <>
                 <div className="inline-block text-xl mx-auto text-brown-700 font-medium">Mint is Live{" "} </div>
                  </>
                )}
                <p className="mr-auto text-sm">
                  <span className="font-medium">Available/Total:</span>{" "}
                  <span className="text-red-400">{nftsData.itemsRemaining}/{nftsData.itemsAvailable} </span>
                </p>
                {/* <p>Whether you prefer human, elf or orc, but they are all unique, cool and adorable. Mint your Pixel Knights before it`s too late.</p> */}
                <p className="mt-4">Private mint: Nov 14th 2021, 00:00 UTC.</p>
                <p className="font-medium">Public mint: Nov 15th 2021, 00:00 UTC</p>
                <p className="font-medium mt-4">One solana wallet can only hold 2 nft.</p>
                <p className="font-medium">You have <span className="text-red-700">{nftCount}</span> nfts </p>
                {isLoading && isMintLive && (
                  <>
                    <ReactLoading type="bars" color="#fff" className="inline-block" />
                    <p> Checking your holdings. </p>
                  </>
                )}
                <div className="card-actions">
                  {/* {isMintLive && ( TODO  */} 
                    <button className="btn rounded-full btn-info" onClick={mint}>Mint 2</button>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CollectionSection />
      {/* <MilestoneSection /> */}
      <FaqSection />

      {/* <div className="flex flex-col items-center min-h-screen mx-6">
        <Toaster />
        <div className="flex items-center justify-between w-full mt-3">
          <h1 className="text-2xl font-bold">next-candy-machine</h1>
          <div className="flex items-center">
            {connected && (
              <div className="flex items-end mr-2">
                <p className="text-xs text-gray-400">balance</p>
                <p className="mx-1 font-bold leading-none">
                  {balance.toFixed(2)}
                </p>
                <p
                  className="font-bold leading-none text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, #00FFA3, #03E1FF, #DC1FFF)`,
                  }}
                >
                  SOL
                </p>
              </div>
            )}
            <WalletMultiButton />
          </div>
        </div>
        {connected && (
          <p className="mr-auto text-sm">
            <span className="font-bold">Available/Minted/Total:</span>{" "}
            {nftsData.itemsRemaining}/{nftsData.itemsRedeemed}/
            {nftsData.itemsAvailable}
          </p>
        )}
        <div className="flex items-start justify-center w-11/12 my-10">
          {connected ? (
            <>
              {new Date(mintStartDate).getTime() < Date.now() ? (
                <>
                  {isSoldOut ? (
                    <p>SOLD OUT</p>
                  ) : (
                    <>
                      <div className="flex flex-col w-1/2">
                        <h1 className="mb-10 text-3xl font-bold">Mint One</h1>
                        <button
                          onClick={startMint}
                          disabled={isMinting}
                          className="px-4 py-2 mx-auto font-bold text-white transition-opacity rounded-lg hover:opacity-70 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600"
                        >
                          {isMinting ? "loading" : "mint 1"}
                        </button>
                      </div>
                      <div className="flex flex-col w-1/2">
                        <h1 className="mb-10 text-3xl font-bold">Mint Many</h1>
                        <MintMany /> 
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Countdown
                  date={mintStartDate}
                  onMount={({ completed }) => completed && setIsMintLive(true)}
                  onComplete={() => setIsMintLive(true)}
                />
              )}
            </>
          ) : (
            <p>connect wallet to mint</p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-bold">My NFTs</h2>
          <div className="flex mt-3 gap-x-2">
            {(nfts as any).map((nft: any, i: number) => {
              return <AnNFT key={i} nft={nft} />;
            })}
          </div>
        </div>
      </div> */}
    </Layout>
  );
}
