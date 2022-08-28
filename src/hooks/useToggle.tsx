import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'
import axios, { AxiosError } from "axios";
import { useRouter } from 'next/router';

interface UseToggleProps {
    children: ReactNode
}

interface ToggleContextData {
    applicationMode: 'default' | 'pixel'
    setApplicationMode: Dispatch<SetStateAction<'default' | 'pixel'>>
    changeApplicationMode: () => void
}

export const ToggleContext = createContext({} as ToggleContextData)

function ToggleProvider({ children }: UseToggleProps) {
    const [applicationMode, setApplicationMode] = useState<'default' | 'pixel'>('default')

    function verifyApplicationMode() {
        let currentMode = localStorage.getItem('@pokeWeb:applicationMode') as 'default' | 'pixel'

        if (!currentMode) {
            localStorage.setItem('@pokeWeb:applicationMode', 'default')
            setApplicationMode('default')
            currentMode = 'default'
        }

        setApplicationMode(currentMode)
        // return currentMode
    }

    function changeApplicationMode() {
        // switch (mode) {
        //     case 'default':
        //         localStorage.setItem('@pokeWeb:applicationMode', 'default')
        //         setApplicationMode('default')
        //         break;
        //     case 'pixel':
        //         localStorage.setItem('@pokeWeb:applicationMode', 'pixel')
        //         setApplicationMode('pixel')
        //         break
        // }

        // let currentMode = localStorage.getItem('@pokeWeb:applicationMode')
        // console.log(currentMode)

        switch (applicationMode) {
            case 'pixel':
                localStorage.setItem('@pokeWeb:applicationMode', 'default')
                setApplicationMode('default')
                break;
            default:
                localStorage.setItem('@pokeWeb:applicationMode', 'pixel')
                setApplicationMode('pixel')
                break;
        }
    }

    useEffect(() => {
        verifyApplicationMode()
    }, [])

    return (
        <ToggleContext.Provider value={{
            applicationMode,
            setApplicationMode,
            changeApplicationMode
        }}>
            {children}
        </ToggleContext.Provider>
    )
}

function useToggle() {
    return useContext(ToggleContext)
}

export {
    useToggle,
    ToggleProvider
}