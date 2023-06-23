import React, { useState } from 'react';
import SummaryComponent from '../component/Summary';
import { HStack, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import {selectData, selectUser} from '../features/dataSlice';



function Home() {

 const data = useSelector(selectData);
 const {username} = useSelector(selectUser);

  return (
    <div>
    <Heading textAlign='center' size='lg'>Welcome {username}! You have filled {data.length} forms so far </Heading>
    <HStack spacing='24px'>
      {data.map((item, index) => (
        <SummaryComponent key={index} formData={item} />
      ))}
    </HStack>
    </div>
  );
}

export default Home;
