import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { PokemonAbilitiesProps, PokemonProps, PokemonTypeProps, PokeStatsProps } from '../../modules'
import Image from 'next/image'
import axios, { AxiosError } from 'axios'
import PokemonDetails from '../../components/PokemonDetails'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

export default function Search() {
    const [currentPokemon, setCurrentPokemon] = useState<PokemonProps | null>(null)
    const [error, setError] = useState<boolean>(true)
    const [search, setSearch] = useState<string>('')
    const [currentPokeball, setCurrentPokeball] = useState<boolean>(true)

    const router = useRouter()


    async function getPokemon() {
        setCurrentPokemon(null)
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => {
                setError(false)
                console.log(response.data)
                setCurrentPokemon(response.data)
            })
            .catch((error: AxiosError) => {
                setError(true)
            })
    }

    const pokemon = router.query.pokemon
    useEffect(() => {
        getPokemon()
    }, [pokemon])


    return (
        <>
            <Head>
                <title>Poke Web | Search</title>
            </Head>
            <Header />
            <main className={styles.container}>
                {
                    currentPokemon &&
                    <PokemonDetails pokemonId={currentPokemon && currentPokemon.id} />
                }

                {
                    error &&
                    <article className={styles.notFoundContainer}>
                        <h1>Ops! No pokemons here.</h1>
                        <section className={styles.imageContainer}>
                            <div id='pokeball' onClick={() => { setCurrentPokeball(!currentPokeball) }}>
                                <Image src={currentPokeball ? '/images/pokeball.png' : '/images/pokeball-open.png'} alt='pokeball' width={120} height={160} />
                            </div>
                        </section>
                        <p>Do not open pokeball!</p>
                    </article>
                }

            </main>

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        console.log(query)
        return {
            props: {

            }
        }
    } catch (e) {
        return {
            props: {

            }
        }
    }
}