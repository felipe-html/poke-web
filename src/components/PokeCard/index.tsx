import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PokeCardProps, PokemonProps, PokemonTypeProps } from '../../modules'
import Link from 'next/link'

import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { redirect } from 'next/dist/server/api-utils'
interface PokeCardPageProps {
    data: PokeCardProps
}

export default function PokeCard({ data }: PokeCardPageProps) {
    const { id, name, url } = data
    const [currentPokemon, setCurrentPokemon] = useState<PokemonProps>()

    async function getPokemon() {
        await axios.get(url)
            .then(response => {
                setCurrentPokemon(response.data)
            })
    }

    useEffect(() => {
        getPokemon()
    }, [])

    return (
        <Link href={`/pokemon/${id}`} passHref>
            <article className={styles.container}>
                <h1 className={styles.title}>{name[0].toUpperCase() + name.substring(1)}</h1>
                <div className={styles.image}>
                    <Image src={`https://cdn.traction.one/pokedex/pokemon/${id}.png`} layout='fill' alt={name} />
                </div>

                {currentPokemon ? (
                    <section className={styles.typesContainer}>

                        <h2 className={styles.types}>
                            {currentPokemon.types.length === 1 ? 'Type' : 'Types'}
                        </h2>
                        {
                            currentPokemon.types.map((item: PokemonTypeProps, key) => {
                                return (
                                    <p
                                        key={key}
                                        className={`
                                            ${styles.type} 
                                            ${item.type.name}
                                            `
                                        }
                                    >
                                        {item.type.name[0].toUpperCase() + item.type.name.substring(1)}
                                    </p>
                                )
                            }
                            )
                        }
                    </section>) : (
                    <div className={styles.loaderContainer}>
                        <div className="loader" />
                    </div>)
                }

            </article>
        </Link>
    )
}