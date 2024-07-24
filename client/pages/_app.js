import '../App.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default ({ Component, pageProps})=>{
    return(
        <main className={inter.className}>
            <Component {...pageProps}/>
        </main>
    )
}