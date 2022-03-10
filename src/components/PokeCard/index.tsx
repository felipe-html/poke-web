import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PokeCardProps, PokemonProps, PokemonTypeProps } from '../../modules'

import styles from './styles.module.scss'

type CardDataProps = {
    data: PokeCardProps
}

export default function PokeCard({ data }: CardDataProps) {
    const [currentPokemon, setCurrentPokemon] = useState<PokemonProps>()

    async function getPokemon() {
        await axios.get(data.url)
            .then(response => {
                setCurrentPokemon(response.data)
            })
            .catch((error: AxiosError) => {
                console.log(error.response)
            })
    }

    useEffect(() => {
        getPokemon()
    }, [])

    return (
        <article className={styles.container}>

            {
                currentPokemon !== undefined ?

                    <>
                        <h1 className={styles.title}>{data.name[0].toUpperCase() + data.name.substring(1)}</h1>
                        <div className={styles.image}>
                            <Image src={currentPokemon.sprites.front_default} layout='fill' alt={currentPokemon.name} />
                        </div>
                        <section>
                            <h2 className={styles.types}>Types</h2>
                            {
                                currentPokemon.types.map((item: PokemonTypeProps, key) => {
                                    return (
                                        <p key={key}>{item.type.name[0].toUpperCase() + item.type.name.substring(1)}</p>
                                    )
                                }
                                )
                            }
                        </section>
                    </>

                    :
                    <>
                        <div className={styles.loader} />
                    </>
            }



        </article>
    )
}