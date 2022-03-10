import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PokeCardProps, PokemonProps } from '../../modules'

import styles from './styles.module.scss'

type CardDataProps = {
    data: PokeCardProps
}

export default function PokeCard({ data }: CardDataProps) {
    const [currentPokemon, setCurrentPokemon] = useState<PokemonProps>({} as PokemonProps)

    return (
        <article className={styles.container}>
            {
                currentPokemon ?
                    <>
                        <h1 className={styles.title}>{data.name[0].toUpperCase() + data.name.substring(1)}</h1>
                        <div className={styles.image}>
                            <Image src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'} layout='fill' alt={'Bulbasaur'} />
                        </div>
                        <section>
                            <h2 className={styles.types}>Types</h2>
                            <p>Grass</p>
                            {/* {
                                currentPokemon.types.map((item, key) => {
                                    return (
                                        <p key={key}>{item}</p>
                                    )
                                }
                                )
                            } */}
                        </section>
                    </>

                    :
                    <>
                        Error
                    </>
            }

        </article>
    )
}