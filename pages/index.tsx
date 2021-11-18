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
  const [mintCnt, setMintCnt] = useState(0);

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
      const res = await fetch('/knight/in/whitelist/' + address)
      const data = await res.json()

      console.log(address + " in wl: " + data['in'])
      setInWL(data['in'])
      // }
    })();
  }, [connected])

  const onCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    var cnt = event.currentTarget.value;

    console.log(cnt); // in chrome => B

    setMintCnt(parseInt(cnt))
  }

  const mint = async () => {
    if (!connected) {
      addToast("plz connect your wallet first...", {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }

    if (mintCnt == 0) {
      addToast("select mint count first...", {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }

    if (!isMintLive) {
      addToast("both Whitelist mint and public mint are not started...", {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }

    // if (isLoading as boolean) {
    //   addToast("checking if you have already minted 2 nfts,\nIt may take up to 20 seconds.\nBe patient...", {
    //     appearance: 'error',
    //     autoDismiss: true,
    //   })
    //   console.log(isLoading)
    //   return
    // }

    const address = publicKey?.toString()
    console.log('address: ' + address)
    const res = await fetch('/knight/check/mint/' + address)
    const data = await res.json()
    if (!data['can']) {
      addToast("wait a second...", {
        appearance: 'error',
        autoDismiss: true,
      })
      console.log(isLoading)
      return
    }

    startMintMultiple(mintCnt)


    // if (nftCount > 2 - mintCnt && !inWL) {
    //   addToast('you have already minted ' + nftCount + " nfts...\nyou are not able to mint > 2 nfts...", {
    //     appearance: 'error',
    //     autoDismiss: true,
    //   })
    //   return
    // }

    // if (nftCount > 3 - mintCnt && inWL) {
    //   addToast('you have already minted ' + nftCount + " nfts...\nyou are not able to mint > 3 nfts...", {
    //     appearance: 'error',
    //     autoDismiss: true,
    //   })
    //   return
    // }

    // if (privateStarted && !publicStarted && !inWL) {
    //   addToast('you are not in whitelist, can not mint in whitelist mint...', {
    //     appearance: 'error',
    //     autoDismiss: true,
    //   })
    //   return
    // } else if (privateStarted && !publicStarted && inWL) {
    //   startMintMultiple(mintCnt)
    // } else if (publicStarted) {
    //   startMintMultiple(mintCnt)
    // } else {
    //   addToast("contact project master...but you will never see this...", {
    //     appearance: 'error',
    //     autoDismiss: true,
    //   })
    // }

    // console.log('address: ' + address)
    // const mint_data = {
    //   address: address,
    //   count: mintCnt
    // }
    // const mint_res = await fetch('/knight/mint', {
    //   method: "POST",
    //   body: JSON.stringify(data)
    // })
    // const resData = await mint_res.json();
    // console.log(resData)

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
                        className="inline-block text-red-400"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {privateStarted && !publicStarted && <div className="inline-block text-xl mx-auto text-brown-700 font-medium">Whitelist Mint is Live{" "} </div>}
                    {publicStarted && <div className="inline-block text-xl mx-auto text-brown-700 font-medium">Whitelist Mint is Live{" "} </div>}
                  </>
                )}
                <p className="mr-auto text-sm">
                  <span className="font-medium">Available/Total:</span>{" "}
                  <span className="text-red-400">{nftsData.itemsRemaining}/{nftsData.itemsAvailable} </span>
                </p>
                {/* <p>Whether you prefer human, elf or orc, but they are all unique, cool and adorable. Mint your Pixel Knights before it`s too late.</p> */}
                {/* <p className="mt-4">Whitelist mint: <span className="text-red-400">Nov 18th 2021, 00:00 UTC</span>.</p> */}
                <p className="font-medium">Public mint: <span className="text-red-400"> Nov 18th 2021, 00:00 UTC</span>.</p>
                {/* <p className="font-medium">Public mint: <span className="text-red-400"> Nov 19th 2021, 00:00 UTC</span>.</p> */}
                <p className="font-medium mt-4">One solana wallet can hold unlimited nft.</p>
                <p className="font-medium">Only 3 nfts can be minted at once.</p>
                {/* <p className="font-medium">Wallet on whitelist can hold 3 nft.</p> */}
                {/* <p className="font-medium mt-2">You have <span className="text-red-400">{nftCount}</span> nfts </p> */}
                {/* {isLoading && isMintLive && (
                  <>
                    <ReactLoading type="bars" color="#fff" className="inline-block" />
                    <p> Checking your holdings. </p>
                  </>
                )} */}
                <div className="card-actions">
                  <select className="select select-bordered select-accent max-w-xs" onChange={onCountChange}>
                    <option disabled selected>mint count: </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                 </select>
                  {/* {isMintLive && ( TODO  */}
                  <button className="btn rounded-full btn-info" onClick={mint}>Mint</button>
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

    </Layout>
  );
}
