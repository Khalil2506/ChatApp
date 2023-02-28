import { Center, ChakraProvider, Spinner } from "@chakra-ui/react"
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../firebaseconfi";
import Login from "../components/Login";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  if (loading){
    return(
      <ChakraProvider>
        <Center h="100vh">
        <Spinner size="x1"></Spinner>
        </Center>
    </ChakraProvider>
    )

  }
  if (!user){
    return(
      <ChakraProvider>
        <Login></Login>
      </ChakraProvider>
    )
  }
  return(
   
    <ChakraProvider>
    <Component {...pageProps} />
    </ChakraProvider>
  )
 
}

export default MyApp
