import Sidebar from "../../components/Sidebar"
import { Flex,Text } from "@chakra-ui/layout"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { collection,doc , orderBy, query} from "firebase/firestore"
import { db, auth } from "../../firebaseconfi"
import { useAuthState } from 'react-firebase-hooks/auth';
import getOtherEmail from "../../utils/getOtheremail"
import { useRef,useEffect } from "react"
import Topbar from "../../components/Topbar"
import Bootombar from "../../components/Bootombar"
import styles from "../../styles/Home.module.css"

export default function Chat(){
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const q = query( collection(db,`Chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const [chat] = useDocumentData(doc(db,"Chats",id));
  const bottomOfChat = useRef();

  const getMessages = ()=>
    messages?.map(msg =>{
      const sender = msg.sender === user.email;
      return(
        <Flex key={Math.random()} w="fit-content"
                         minWidth="100px" 
                         borderRadius="10px"
                          p={3}
                           m={1}
                           alignSelf={sender ? "flex-start": "flex-end"}
                           bg ={sender ? "blue.100" : "green.100"}
                           >
                        <Text >{msg.text}</Text>
                    </Flex>       
      )})

     useEffect(()=> {
      setTimeout(
        bottomOfChat.current.scrollIntoView({behavior: "smooth", block: "start"}),50)
        ,[messages]})

  
    return (
        <Flex
        h="100vh"
        className={styles.body}
        >
          <Head>
            <title>Chatt app</title>
          </Head>
            <Sidebar></Sidebar>
            <Flex
            flex={1}
            direction="column"
            className={styles.chat_content}
            >
                <Topbar email={getOtherEmail(chat?.users, user)}/>
                <Flex  direction="column"className={styles.scroll1}>
                {getMessages()}   
               <div ref={bottomOfChat}></div>
                </Flex>
                <Bootombar id={id} user={user}></Bootombar>
            </Flex>
        </Flex>
    )
}