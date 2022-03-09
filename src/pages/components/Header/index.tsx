import styles from './styles.module.scss'
import { BiSearchAlt } from 'react-icons/bi'

export default function Header() {
    return (
        <header className={styles.container}>
            <nav className={styles.navigation}>

                <h1 className={styles.logo}>Poke Web</h1>
                <form className={styles.searchBar}>
                    <label htmlFor="" />
                    <input type="text" placeholder="Pokémon's name" className={styles.input} />
                    <div className={styles.searchIcon}>
                        <BiSearchAlt size={30} />
                    </div>
                </form>
            </nav>
        </header>
    )
}