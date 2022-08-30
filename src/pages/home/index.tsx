import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { PokeCardProps, PokePageProps, TypeProps } from "../../modules";
import PokeCard from "../../components/PokeCard";

import styles from './styles.module.scss';
import { api } from "../../services/api";
export interface HomeProps {
    count: number,
    next: string | null,
    results: PokeCardProps[],
    types: TypeProps[]
}

export default function Home({ count, next, results, types }: HomeProps) {
    const [pageDetails, setPageDetails] = useState<PokePageProps>({ count, next } as PokePageProps)
    const [homePokemons, setHomePokemons] = useState<PokeCardProps[]>([...results])
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)

    async function handleShowMorePokemons() {
        if (pageDetails.next) {
            setButtonLoading(true)
            await axios.get(pageDetails.next)
                .then(response => {
                    const data = response.data as HomeProps

                    setHomePokemons(oldValue => {
                        return [...oldValue, ...data.results]
                    })

                    setPageDetails({
                        count: data.count,
                        next: data.next,
                    })

                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() =>
                    setButtonLoading(false)
                )
        }
    }

    return (
        <>
            <Head>
                <title>Poke Web | Home</title>
            </Head>

            <main className={`main ${styles.container}`}>
                <section>
                    <h1>What Pokemon are you looking for?</h1>
                </section>
                <div className={styles.pokeCard}>
                    {
                        homePokemons.map((pokemon, key) => {
                            return (
                                <PokeCard data={pokemon} key={key} />
                            )
                        })
                    }
                </div>

                {
                    pageDetails.next &&
                    <button
                        className={styles.button}
                        onClick={handleShowMorePokemons}>
                        {buttonLoading ?
                            <div className="loader" />
                            :
                            <p>Show more</p>
                        }
                    </button>
                }

            </main>
        </>
    )
}

export async function getStaticProps() {
    try {
        const pokemons = await api.get(`/pokemon`)
            .then(response => { return response.data })

        const types = await api.get(`/type`)
            .then(response => { return response.data })

        return {
            props: {
                count: pokemons.count,
                next: pokemons.next,
                results: pokemons.results,
                types: types.results
            }
        }

    } catch (e) {
        return {
            redirect: {
                destination: '/400',
                permanent: false
            }
        }
    }

}