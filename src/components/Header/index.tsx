import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { RiCloseLine } from 'react-icons/ri'
import { useState } from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'

export default function Header() {
    const [mobileMenu, setMobileMenu] = useState(false)

    return (
        <header className={styles.container}>
            <nav className={styles.navigation}>
                <Link href='/home' passHref>
                    <h1 className={styles.logo}>
                        PokeWeb
                    </h1>
                </Link>
                <div className={styles.menu}>
                    <Link href='/home' passHref>
                        <p>Home</p>
                    </Link>
                    <Link href='/search' passHref>
                        <p>Search</p>
                    </Link>
                </div>
                <div className={styles.mobileMenuIcon} onClick={() => { setMobileMenu(true) }}>
                    <HiOutlineMenuAlt3 size={30} />
                </div>
                <div className={`${styles.mobileMenu} ${mobileMenu ? styles.showMenu : styles.closeMenu}`}>
                    <div className={styles.mobileCloseIcon} onClick={() => setMobileMenu(false)}>
                        <RiCloseLine size={30} />
                    </div>
                    <Link href='/home' passHref>
                        <p className={styles.menuItem} onClick={() => setMobileMenu(false)}>Home</p>
                    </Link>
                    <Link href='/search' passHref>
                        <p className={styles.menuItem} onClick={() => setMobileMenu(false)}>Search</p>
                    </Link>
                </div>
            </nav>
        </header>
    )
}