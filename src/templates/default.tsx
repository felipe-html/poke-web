import { ReactNode } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { useLoading } from "../hooks/useLoading";

interface DefaultTemplateProps {
    children: ReactNode
}

export function DefaultTemplate({ children }: DefaultTemplateProps) {
    const { appLoading } = useLoading()

    return (
        <>
            <Header />
            {appLoading ? (
                <Loading />
            ) : (
                <>
                    {children}
                </>
            )
            }
            <Footer />
        </>
    )
}