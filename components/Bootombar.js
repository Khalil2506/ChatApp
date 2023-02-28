
import { useState } from "react"
import { Input } from "@chakra-ui/input"
import { Button } from "@chakra-ui/button"
import { FormControl } from "@chakra-ui/form-control"
import { addDoc } from "firebase/firestore"
import { collection} from "firebase/firestore"
import { db } from "../firebaseconfi"
import { serverTimestamp } from "firebase/firestore"
const Bootombar = ({id,user}) =>{
    const [input, setinput ] = useState("");
    const sendMessage = async (e) =>{
      e.preventDefault();
      await addDoc(collection(db,`Chats/${id}/messages`),{
        text: input,
        sender: user.email,
        timestamp: serverTimestamp()
      })
      setinput("");
    }
     return (
       <FormControl 
       p={3}
       onSubmit={sendMessage}
       as="form"
       >
          <Input placeholder="type a message..." value={input} onChange={e => setinput(e.target.value)}></Input>
          <Button type="submit" hidden >Submit</Button>
       </FormControl>
     )
  
  }
  export default Bootombar;