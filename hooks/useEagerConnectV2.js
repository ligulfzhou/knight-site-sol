import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from '../utils/connector'

export function useEagerConnect() {
    const { activate, active } = useWeb3React();
    const [tried, setTried] = useState(false);
    const [isWrongChainId, setIsWrongChainId] = useState(false);

    useEffect(() => {
        injected.isAuthorized().then(isAuthorized => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch((error) => {
                    if (error.name.includes('UnsupportedChainIdError')) {
                        setIsWrongChainId(true)
                    }
                })
            } else {
                console.log('not authorized....')
            }

            setTried(true)
        });


    }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
        if (!tried && active) {
            setTried(true);
        }
    }, [tried, active]);

    return [tried, isWrongChainId];
}