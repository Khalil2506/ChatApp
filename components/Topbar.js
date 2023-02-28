import {Flex, Heading} from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
const Topbar =({email})=>{
    return(
        <Flex
        bg="gray.100"
        h="81px" w="100%"
        align="center"
        p={5}>
            <Avatar src="" marginEnd={3}></Avatar>
            <Heading size="1g">{email}</Heading>
        </Flex>
    )
}
export default Topbar;