import { useEffect } from 'react'
import { useLoading } from '../../hooks/useLoading'
import { useToggle } from '../../hooks/useToggle'
import styles from './styles.module.scss'

export function Toggle() {
    const { changeApplicationMode, applicationMode } = useToggle()
    const { setAppLoading } = useLoading()
    let currentMode = ''

    if (typeof window !== 'undefined') {
        currentMode = localStorage.getItem('@pokeWeb:applicationMode') as 'default' | 'pixel'
    }

    async function handleChangePictureMode() {
        setAppLoading(true)
        changeApplicationMode()
        setTimeout(cancelLoading, 2500)
    }

    function cancelLoading() {
        setAppLoading(false)
    }

    function getToggleState() {
        let toggle = window.document.getElementById('toggle') as HTMLInputElement

        if (!currentMode) {
            toggle.checked = false
            return
        }

        switch (currentMode) {
            case 'default':
                toggle.checked = false
                break;
            case 'pixel':
                toggle.checked = true
                break
        }
    }

    useEffect(() => {
        getToggleState()
    }, [applicationMode])

    return (
        <section >
            <h1 className={styles.title}>Toggle</h1>
            <label className={styles.switch}>
                <input
                    checked={currentMode === 'pixel' ? true : false}
                    onChange={() => { }}
                    id='toggle'
                    type="checkbox"
                    className={styles.input}
                    onClick={handleChangePictureMode}
                />
                <span className={styles.slider} />
            </label>
        </section>
    )
}