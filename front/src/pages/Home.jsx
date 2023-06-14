import React from 'react';
import {Flex, Text} from "@chakra-ui/react";

const Home = () => {


    return (
        <Flex gap={10} wrap={"wrap"} mt={{base: "24", md: "24", lg: "40" }} justifyContent={"space-around"}>

            <Flex borderRadius={"5px"} _hover={{backgroundColor: "blue.700"}} boxSize={"260px"} cursor={"pointer"} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"} textAlign={"center"} bg={"blue.900"}>
                <Text  fontSize={"5xl"} color={"white"} >Invite Friend</Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/>
                    <path fill="white" d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5h8Zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1Zm-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z"/></g></svg>
            </Flex>
            <Flex borderRadius={"5px"} _hover={{backgroundColor: "blue.700"}} boxSize={"260px"} cursor={"pointer"} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"} textAlign={"center"} bg={"blue.900"}>
                <Text  fontSize={"5xl"} color={"white"} >New Chat</Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 16 16"><path fill="white" d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7s-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6c-.097 1.016-.417 2.13-.771 2.966c-.079.186.074.394.273.362c2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                </svg>
            </Flex>
            <Flex borderRadius={"5px"} _hover={{backgroundColor: "blue.700"}} boxSize={"260px"} cursor={"pointer"} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"} textAlign={"center"} bg={"blue.900"}>
                <Text  fontSize={"5xl"} color={"white"} >Create Group</Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 1200 1200">
                    <path fill="white" d="M596.847 188.488c-103.344 0-187.12 97.81-187.12 218.465c0 83.678 40.296 156.352 99.468 193.047l-68.617 31.801l-182.599 84.688c-17.64 8.821-26.444 23.778-26.444 44.947v201.102c1.451 25.143 16.537 48.577 40.996 48.974h649.62c27.924-2.428 42.05-24.92 42.325-48.974V761.436c0-21.169-8.804-36.126-26.443-44.947l-175.988-84.688l-73.138-34.65c56.744-37.521 95.061-108.624 95.061-190.197c-.001-120.656-83.778-218.466-187.121-218.466zm-301.824 76.824c-44.473 1.689-79.719 20.933-106.497 51.596c-29.62 36.918-44.06 80.75-44.339 124.354c1.819 64.478 30.669 125.518 82.029 157.446L21.163 693.997C7.05 699.289 0 711.636 0 731.041v161.398c1.102 21.405 12.216 39.395 33.055 39.703h136.284V761.436c2.255-45.639 23.687-82.529 62.196-100.531l136.247-64.817c10.584-6.175 20.731-14.568 30.433-25.152c-56.176-86.676-63.977-190.491-27.773-281.801c-23.547-14.411-50.01-23.672-75.419-23.823zm608.586 0c-29.083.609-55.96 11.319-78.039 26.444c35.217 92.137 25.503 196.016-26.482 276.52c11.467 13.23 23.404 23.377 35.753 30.434l130.965 62.195c39.897 21.881 60.47 59.098 60.866 100.532v170.707h140.235c23.063-1.991 32.893-20.387 33.093-39.704V731.042c0-17.641-7.05-29.987-21.163-37.045l-202.431-96.618c52.498-38.708 78.859-96.72 79.369-156.117c-1.396-47.012-15.757-90.664-44.339-124.354c-29.866-32.399-66.91-51.253-107.827-51.596z"/></svg>
            </Flex>

            <Flex borderRadius={"5px"} _hover={{backgroundColor: "blue.700"}} boxSize={"260px"} cursor={"pointer"} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"} textAlign={"center"} bg={"blue.900"}>
                <Text  fontSize={"5xl"} color={"white"} >Support</Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24"><path fill="white" d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4c1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"/></svg>
            </Flex>


        </Flex>

    );
};

export default Home;