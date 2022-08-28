import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'
import axios, { AxiosError } from "axios";
import { useRouter } from 'next/router';

interface UseLoadingProps {
    children: ReactNode
}

interface LoadingContextData {
    appLoading: boolean
    setAppLoading: Dispatch<SetStateAction<boolean>>
}

export const LoadingContext = createContext({} as LoadingContextData)

function LoadingProvider({ children }: UseLoadingProps) {
    const { events } = useRouter()

    const [appLoading, setAppLoading] = useState<boolean>(false)

    const onRouteChangeStart = useCallback(() => {
        setAppLoading(true)
    }, [])

    const onRouteChangeDone = useCallback(() => {
        setAppLoading(false)
    }, [])

    useEffect(() => {
        events.on('routeChangeStart', onRouteChangeStart);
        events.on('routeChangeComplete', onRouteChangeDone);
        events.on('routeChangeError', onRouteChangeDone);

        return () => {
            events.off('routeChangeStart', onRouteChangeStart);
            events.off('routeChangeComplete', onRouteChangeDone);
            events.off('routeChangeError', onRouteChangeDone);
        };
    }, [onRouteChangeDone, onRouteChangeStart, events]);

    useEffect(() => {
        setAppLoading(false)
    }, [])

    return (
        <LoadingContext.Provider value={{
            appLoading,
            setAppLoading
        }}>
            {children}
        </LoadingContext.Provider>
    )
}

function useLoading() {
    return useContext(LoadingContext)
}

export {
    useLoading,
    LoadingProvider
}