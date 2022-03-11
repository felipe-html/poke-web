import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PokePageProps } from "../../modules";
import Header from "../../components/Header";
import PokeCard from "../../components/PokeCard";
import Link from 'next/link';

import styles from './styles.module.scss';

export default function Home() {
    const [pokemons, setPokemons] = useState<PokePageProps>()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon`)
            .then(response => {
                setPokemons(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])


    return (
        <>
            <Head>
                <title>Poke Web | Home</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.pokeCard}>
                    {
                        pokemons !== undefined &&
                        pokemons.results.map((pokemon, key) => (
                            <PokeCard
                                key={key}
                                data={pokemon}
                            />
                        ))
                    }
                </div>
                {/* <p>Show more</p> */}
            </main>
        </>
    )
}