import Layout from '../components/Layout'
// import AboutSection from '../components/AboutSection'
import HeroSection from '../components/HeroSection'
import CollectionSection from '../components/CollectionSection'
import MilestoneSection from '../components/MilestoneSection'
import FaqSection from '../components/FaqSection'

import ABI from "../abi/abi.json";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core"
// import ConnectButton from '../components/ConnectButton'
import { useEffect, useState, Fragment } from 'react'
// import useAddress from '../hooks/useAddress'
import { Contract } from "@ethersproject/contracts";
import { parseEther } from "@ethersproject/units";
import { Dialog, Transition } from '@headlessui/react'


import * as anchor from "@project-serum/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletModalButton } from "@solana/wallet-adapter-react-ui";


import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "../utils/candyMachine";

// interface AlertState {
//   open: boolean;
//   message: string;
//   severity: "success" | "info" | "warning" | "error" | undefined;
// }

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}


export default function Home(props: HomeProps) {
  const [balance, setBalance] = useState(0);
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate));
  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();


  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) return;

      const {
        candyMachine,
        goLiveDate,
        itemsAvailable,
        itemsRemaining,
        itemsRedeemed,
      } = await getCandyMachineState(
        // wallet as anchor.Wallet,
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  };

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection,
  ]);

  // useEffect(() => {
  //   console.log(address)
  //   console.log(network)
  // }, [])


  // useEffect(() => {
  //   const provider = ethers.getDefaultProvider(network, { 'infura': '786649a580e3441f996da22488a8742a' });
  //   const contract = new ethers.Contract(address, ABI, provider);

  //   console.log(contract)

  //   contract.getSaleStarted().then((started) => {
  //     console.log(started)
  //     setMintStarted(started)
  //     console.log(mintStarted)

  //     if (!started) {
  //       setStatus("Not Started")
  //     } else {
  //       // todo: ""
  //       setStatus("Started")
  //     }

  //   }).catch((error) => {
  //     console.log(error)
  //   })

  //   contract.totalSupply().then((count) => {
  //     console.log('count: ' + count)
  //     console.log(count)
  //     setTotalSupply(count)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, [active, chainId])

  // const mint = () => {
  //   alert('mint will start about on Nov 14th, stay tuned...')
  //   return
  //   if (active) {
  //     const contract = new Contract(address, ABI, library.getSigner())
  //     if (!mintStarted) {
  //       // alert("mint not started...")
  //       setErrorMsg("Mint Not Started...")
  //       openErrorModal()
  //       return
  //     }
  //     console.log(count)
  //     contract.mint(count, { 'value': parseEther((0.0333 * count).toString()) }).then((res) => {
  //       console.log(res)
  //       // @ts-ignore
  //       setTransactionId(res["hash"])
  //       openTransactionModal()
  //     }).catch((error) => {
  //       // @ts-ignore
  //       console.log(error['data'])
  //       //alert(error['message'])
  //       if (error['data'] != null && error['data'] != undefined) {
  //         setErrorMsg(error['data']['message'])
  //       } else {
  //         setErrorMsg(error['message'])
  //       }
  //       openErrorModal()
  //     })
  //   } else {
  //     // alert("please connect to mainnet")
  //     setErrorMsg("Please Connect Metamask to Mainnet...")
  //     openErrorModal()
  //   }
  // }

  // const closeErrorModal = () => {
  //   setIsErrorOpen(false)
  // }
  // const openErrorModal = () => {
  //   setIsErrorOpen(true)
  // }

  // const closeTransactionModal = () => {
  //   setIsTransactionOpen(false)
  // }
  // const openTransactionModal = () => {
  //   setIsTransactionOpen(true)
  // }

  // const onCountChange = (event) => {
  //   console.log(event.target.value)
  //   setCount(event.target.value)
  // }


  return (
    <Layout>
      <HeroSection />
      <section className="text-white body-font bg-gray-800" id="mint">
        <div>
          {wallet && (
            <p>Wallet {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
          )}
          {wallet && <p>Balance: {(balance || 0).toLocaleString()} SOL</p>}

          {wallet && <p>Total Available: {itemsAvailable}</p>}

          {wallet && <p>Redeemed: {itemsRedeemed}</p>}

          {wallet && <p>Remaining: {itemsRemaining}</p>}

          <MintContainer>
            {!wallet ? (
              <ConnectButton>Connect Wallet</ConnectButton>
            ) : (
              <MintButton
                disabled={isSoldOut || isMinting || !isActive}
                onClick={onMint}
                variant="contained"
              >
                {isSoldOut ? (
                  "SOLD OUT"
                ) : isActive ? (
                  isMinting ? (
                    <CircularProgress />
                  ) : (
                    "MINT"
                  )
                ) : (
                  <Countdown
                    date={startDate}
                    onMount={({ completed }) => completed && setIsActive(true)}
                    onComplete={() => setIsActive(true)}
                    renderer={renderCounter}
                  />
                )}
              </MintButton>
            )}
          </MintContainer>

          <Snackbar
            open={alertState.open}
            autoHideDuration={6000}
            onClose={() => setAlertState({ ...alertState, open: false })}
          >
            <Alert
              onClose={() => setAlertState({ ...alertState, open: false })}
              severity={alertState.severity}
            >
              {alertState.message}
            </Alert>
          </Snackbar>

        </div>
        <div className="container px-5 py-16 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">Mint Your Pixel Knights</h1>
            {/* {!active && (<ConnectButton />)} */}
          </div>
          <div className="flex items-center w-full px-4 py-10 bg-cover card bg-base-200" style={{ backgroundImage: `url(https://f002.backblazeb2.com/file/pixelknights/banner_450.png)` }}>
            <div className="card glass lg:card-side text-neutral-content">
              <figure className="p-6">
                <img src="https://f002.backblazeb2.com/file/pixelknights/mint_knights.png" className="rounded-lg shadow-lg" />
              </figure>
              <div className="max-w-md card-body">
                <h2 className="card-title">Status: <p className='inline-block text-red-600'>{status}</p></h2>
                <p>Whether you prefer human, elf or orc, but they are all unique, cool and adorable. Mint your Pixel Knights before it`s too late.</p>
                <p className="">5 nfts are allowed to be minted at once.</p>
                <div className="card-actions">
                  <select className="select select-bordered select-accent max-w-xs" onChange={onCountChange}>
                    <option disabled="disabled" selected="selected" >mint count: </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                  <button className="btn rounded-full btn-info" onClick={mint}>Mint</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CollectionSection />
      <MilestoneSection />
      <FaqSection />


      <Transition appear show={isErrorOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeErrorModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Failure occur.
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {errorMsg}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeErrorModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isTransactionOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeTransactionModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Transaction Submited
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Click <a href={"https://etherscan.io/tx/" + transactionId} target='_blank' rel="noreferrer" className="underline text-red-500"> me </a> to see transaction detail
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeTransactionModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </Layout>
  )
}
