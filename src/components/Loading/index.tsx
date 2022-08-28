import Image from 'next/image'
import styles from './styles.module.scss'

export function Loading() {
    return (
        <main className='main'>
            <div className={'loadingimage'}>
                <Image src={'/images/pikachu.gif'} alt='Loading' layout='fill' />
            </div>
        </main>
    )
}