import Layout from '../components/Layout'
// import AboutSection from '../components/AboutSection'
import HeroSection from '../components/HeroSection'
import CollectionSection from '../components/CollectionSection'
import MilestoneSection from '../components/MilestoneSection'
import FaqSection from '../components/FaqSection'

import ABI from "../abi/abi.json";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core"
import ConnectButton from '../components/ConnectButton'
import { useEffect, useState, Fragment } from 'react'
import useAddress from '../hooks/useAddress'
import { Contract } from "@ethersproject/contracts";
import { parseEther } from "@ethersproject/units";
import { Dialog, Transition } from '@headlessui/react'


export default function Home() {
  const { active, account, activate, chainId, library } = useWeb3React()
  const [status, setStatus] = useState("")
  const [address, network] = useAddress()
  const [mintStarted, setMintStarted] = useState(false)
  const [totalSupply, setTotalSupply] = useState(0)

  const [isErrorOpen, setIsErrorOpen] = useState(false)
  const [isTransactionOpen, setIsTransactionOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [transactionId, setTransactionId] = useState("")

  const [count, setCount] = useState()

  useEffect(() => {
    console.log(address)
    console.log(network)
  }, [])

  useEffect(() => {
    const provider = ethers.getDefaultProvider(network, { 'infura': '786649a580e3441f996da22488a8742a' });
    const contract = new ethers.Contract(address, ABI, provider);

    console.log(contract)

    contract.getSaleStarted().then((started) => {
      console.log(started)
      setMintStarted(started)
      console.log(mintStarted)

      if (!started) {
        setStatus("Not Started")
      } else {
        // todo: ""
        setStatus("Started")
      }

    }).catch((error) => {
      console.log(error)
    })

    contract.totalSupply().then((count) => {
      console.log('count: ' + count)
      console.log(count)
      setTotalSupply(count)
    }).catch((error) => {
      console.log(error)
    })
  }, [active, chainId])

  const mint = () => {
    if (active) {
      const contract = new Contract(address, ABI, library.getSigner())
      if (!mintStarted) {
        // alert("mint not started...")
        setErrorMsg("Mint Not Started...")
        openErrorModal()
        return
      }
      console.log(count)
      contract.mint(count, { 'value': parseEther((0.0333 * count).toString()) }).then((res) => {
        console.log(res)
        // @ts-ignore
        setTransactionId(res["hash"])
        openTransactionModal()
      }).catch((error) => {
        // @ts-ignore
        console.log(error['data'])
        //alert(error['message'])
        if (error['data'] != null && error['data'] != undefined) {
          setErrorMsg(error['data']['message'])
        } else {
          setErrorMsg(error['message'])
        }
        openErrorModal()
      })
    } else {
      // alert("please connect to mainnet")
      setErrorMsg("Please Connect Metamask to Mainnet...")
      openErrorModal()
    }
  }

  const closeErrorModal = () => {
    setIsErrorOpen(false)
  }
  const openErrorModal = () => {
    setIsErrorOpen(true)
  }

  const closeTransactionModal = () => {
    setIsTransactionOpen(false)
  }
  const openTransactionModal = () => {
    setIsTransactionOpen(true)
  }

  const onCountChange =  (event) => {
    console.log(event.target.value)
    setCount(event.target.value)
  }


  return (
    <Layout>
      <HeroSection />
      <section className="text-white body-font bg-gray-800">
        <div className="container px-5 py-16 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">Mint Your Pixel Knight</h1>
            {!active && (<ConnectButton />)}
          </div>
          <div className="flex items-center w-full px-4 py-10 bg-cover card bg-base-200" style={{ backgroundImage: `url(https://picsum.photos/id/314/1000/300)` }}>
            <div className="card glass lg:card-side text-neutral-content">
              <figure className="p-6">
                <img src="https://picsum.photos/id/1005/300/200" className="rounded-lg shadow-lg" />
              </figure>
              <div className="max-w-md card-body">
                <h2 className="card-title">Status: {status}</h2>
                <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p>
                <div className="card-actions">
                  <select class="select select-bordered select-accent max-w-xs" onChange={onCountChange}>
                    <option disabled="disabled" selected="selected" >mint count: </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <button className="btn glass rounded-full" onClick={mint}>Get Started</button>
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
