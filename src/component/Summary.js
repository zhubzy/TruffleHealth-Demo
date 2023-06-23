import { Box, Text, Card, CardBody, Stack, StackDivider, Heading, CardHeader, Image } from '@chakra-ui/react';

export default function SummaryComponent({ formData }) {
  return (
<Card boxShadow={'none'} maxW='sm'>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
    <Image
      src={formData.file}
      borderRadius='lg'
    />
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Name
        </Heading>
        <Text pt='2' fontSize='sm'>
          {formData.first_name + " " + formData.last_name}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Address
        </Heading>
        <Text pt='2' fontSize='sm'>
          {formData.addr}
        </Text>
      </Box>

      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Hospital
        </Heading>
        <Text pt='2' fontSize='sm'>
          {formData.hospital_name}
        </Text>
      </Box>


      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Date
        </Heading>
        <Text pt='2' fontSize='sm'>
          {formData.date}
        </Text>
      </Box>

      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Amount
        </Heading>
        <Text pt='2' fontSize='sm'>
          ${formData.amount}
        </Text>
      </Box>
    </Stack>
  </CardBody>
</Card>
  );
}
