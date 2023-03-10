import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div >
      <Head>
        <title>Whatsapp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div h="100vh"  className={styles.body_main}>
      <Sidebar></Sidebar>
      </div>
     

     
    </div>
  )
}
