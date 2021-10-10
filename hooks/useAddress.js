import {useWeb3React} from "@web3-react/core";
import {useEffect, useState} from "react";
import {rinkeby_contract_address, mainnet_contract_address} from "../utils/const";

export default function useAddress() {
    const {chainId} = useWeb3React();

    const [address, setAddress] = useState(rinkeby_contract_address);
    const [network, setNetwork] = useState("rinkeby");

    useEffect(()=> {
        if (chainId==1) {
            setAddress(mainnet_contract_address);
            setNetwork("homestead");
        }  else if (chainId == 4) {
            setAddress(rinkeby_contract_address)
            setNetwork("rinkeby")
        } else {
            setAddress(rinkeby_contract_address)
            setNetwork("rinkeby")
        }
    }, [chainId])

    return [address, network]
}