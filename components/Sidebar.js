import { Avatar } from "@chakra-ui/avatar";
import { Button} from "@chakra-ui/react";
import {Flex, Text} from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import {auth} from "../firebaseconfi";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from "@firebase/firestore"
import { db } from "../firebaseconfi";
import getOtherEmail from "../utils/getOtheremail";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css"
import { useState } from "react";





export default function Sidebar(){
    const [user] = useAuthState(auth);
    const [snapshot] = useCollection(collection(db,"Chats"));
    const chats = snapshot?.docs.map(doc =>({id: doc.id, ...doc.data()}));
    const router = useRouter();
    const [isClass, setIsClass] = useState("")
    const [isClass2, setIsClass2] = useState("")
   
    
    const redirect = (id) =>{
        router.push(`/chat/${id}`);
    }
   // const chatExists = email => chats?.find(chat => (chat.user.includes(user.email) && chat.users.includes(email)))
    const newChat = async () =>{
        const input = prompt("Ingresa Correo electronico");
       
            await addDoc(collection(db,"Chats"),{ users: [user.email, input]})
         //   if (!chatExists(input) && (input!= user.email )){}
       
    }

    const chatList = () =>{
   
        return(
            chats?.filter(chat => chat.users.includes(user.email))
            .map(
                chat=>
                <Flex key={Math.random()}
                p={3}
                aling="center" 
                _hover={{bg: "gray.100",cursor:"pointer"}}
                onClick={()=> redirect(chat.id)}
                >
                    <Avatar src={chat.users.photoURL} marginEnd={3}/>
                    <Text>{getOtherEmail(chat.users, user)}</Text>
                </Flex>
            )
          
        )
    }
    return (
        <Flex bg="blue.100"borderEnd="1px sold" 
        borderColor="gray.200" direction="column" className={styles.div_main}>
            <Flex
            bg="red.100"
            h="81px" w="100%"
            align="center" justifyContent="space-between"
            borderBottom="1px solid" borderColor="gray.200"
            p={3}
            className={styles.content_first}
            >
                <Flex align="center">
                <Avatar  src={user.photoURL} marginEnd={5}/>
                <Text>{user.displayName}</Text>
                </Flex>
               
                <IconButton size="sm" icon={<ArrowLeftIcon></ArrowLeftIcon>}
                onClick={()=> signOut(auth)}
                ></IconButton>
                <ArrowDownIcon className={`${styles.icon_2} ${isClass ? styles.activo : styles.unactivo}`} onClick={() => {setIsClass(!isClass),setIsClass2(!isClass2)}}></ArrowDownIcon>

            </Flex>
            <Button m={5} p={4} className={styles.chat_buton} onClick={()=> newChat()}>New Chat</Button>
            <Flex direction="column" className={styles.scroll2} flex={1}>
            {chatList()}
            </Flex>
            <div className={`${styles.chat_resposinve} ${isClass ? styles.activos : styles.unactivo}`}>
            <Button m={5} p={4} className={styles.chat_buton_responsive} onClick={()=> newChat()}>New Chat</Button>
            {chatList()} 
            </div>
          
        </Flex>
    )

}