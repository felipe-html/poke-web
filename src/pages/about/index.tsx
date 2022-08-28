import Link from 'next/link'

import styles from './styles.module.scss'

export default function About() {
    return (
        <main className={`main ${styles.container}`}>
            <section className={styles.content}>
                <h1>Sobre</h1>
                <article className={styles.article}>
                    <h2>O que é o Pokeweb?</h2>
                    <p>É um website que utiliza a <a href='https://pokeapi.co/' className='link' target='blank' >PokéApi</a> para listar todos os pokémons e os seus respectivos detalhes.</p>
                </article>

                <article className={styles.article}>
                    <h2>Como foi construído?</h2>
                    <p>
                        A aplicação foi construída utilizando <a href='https://reactjs.org/' className='link' target='blank'>React.JS</a> com <a href='https://www.typescriptlang.org/' className='link' target='blank'>Typescript</a>, aproveitando os conceitos de
                        componentização. Também foi utilizada a framework <a href='https://nextjs.org/' className='link' target='blank'>Next.JS</a>, pensando nas funcionalidades de Server
                        Rendering e Dynamic Routes, para a renderização das 1026  páginas de pokemóns que temos disponíveis
                        aqui.
                    </p>
                </article>
            </section>
        </main>
    )
}