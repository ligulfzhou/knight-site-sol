import { shorter } from "../utils/utils";
import {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import { injected } from "../utils/connector";


export default function ConnectButton() {
    const {active, account, activate, chainId} = useWeb3React();
    const [failed, setFailed] = useState(false);

    useEffect(()=>{
        eagerConnect()
    }, [active, chainId])

    const connect = () => {
        activate(injected, undefined, true).catch((error)=> {
            if (error.name.includes('UnsupportedChainIdError')) {
                setFailed(true)
            }
            console.log('activate...onCatch')
            console.log(error)
            console.log('activate...onCatch')
        })
    }
    const eagerConnect = () => {
        console.log("connect...")

        setFailed(false)

        injected.isAuthorized().then(isAuthorized => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch((error)=> {
                    if (error.name.includes('UnsupportedChainIdError')) {
                        setFailed(true)
                    }
                    console.log('activate...onCatch')
                    console.log(error)
                    console.log('activate...onCatch')
                })
            } else {
                console.log('not authorized....')
            }
        });
    }

    return (
        <div>
            {active && (chainId === 1 || chainId === 1337 || chainId === 5777 || chainId == 4) && (
                <button onClick={connect} className="px-2 py-1 rounded-md bg-red-500 text-gray-900">
                    Connected {shorter(account)}
                </button>
            )}
            {!active && !failed && (
                <button onClick={connect} className="px-2 py-1 rounded-md bg-purple-400 text-gray-900">
                    <div>Connect Wallet</div>
                </button>
            )}
            {(failed || (active && chainId !== 1 && chainId !== 1337 && chainId !== 5777 && chainId !== 4)) && (
                <div data-tip="Please switch to Mainnet" className="tooltip tooltip-open tooltip-bottom">
                    <button onClick={connect} className="px-2 py-1 rounded-md bg-red-500 text-gray-900">
                        <div>Wrong Network</div>
                    </button>
                </div>
            )}
        </div>
    )
}
