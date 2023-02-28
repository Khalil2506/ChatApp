import Head from "next/head";
import { ChatIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Stack } from '@chakra-ui/react'
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebaseconfi";
import styles from "../styles/Home.module.css"

export default function Login() {
  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithRedirect(getAuth(), provider);
    } catch (error) {
      console.error(error);
      // handle error
    }
  }

  return (
    <>
      <Head> <title>Login</title></Head>
      <Center h="100vh">
        <Stack boxShadow="1g" align="center"
          bgColor="gray.600"
          p={16}
          rounded="3x1"
          borderRadius="10%"
          spacing={12}
        >
          <Box
            bgColor="blue.500"
            w="fit-content"
            p={5}
            rounded="3x1"
            borderRadius="20%"
            boxShadow="md"
          >
            <ChatIcon w="100px" h="100px" color="black"></ChatIcon>
          </Box>
          <Button boxShadow="md" onClick={handleSignInWithGoogle} target="_blank">Sign in With Google</Button>
        </Stack>
      </Center>
    </>
  )
}