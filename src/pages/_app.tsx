import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { DefaultTemplate } from '../templates/default'
import { LoadingProvider } from '../hooks/useLoading'
import { ToggleProvider } from '../hooks/useToggle'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToggleProvider>
        <LoadingProvider>
          <DefaultTemplate>
            <Component {...pageProps} />
          </DefaultTemplate>
        </LoadingProvider>
      </ToggleProvider>
    </>
  )
}

export default MyApp
