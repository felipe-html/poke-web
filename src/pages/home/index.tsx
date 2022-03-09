import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
    return (
        <>
            <Head>
                <title>Poke Web | Home</title>
            </Head>
            <Header />
            <main>
                Página de listagem
            </main>
        </>
    )
}