import * as React from 'react';
import {
  Container,
  Box,
  Stack,
  Heading,
  HStack,
  Text,
  Button,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  title?: string;
  subtitle?: string;
  action: 'Sign up' | 'Log in';
  children?: React.ReactNode;
}

export const Layout = ({ title, subtitle, action, children }: LayoutProps) => {
  return (
    <Container maxW={'lg'} py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing={8}>
        <Stack spacing={6}>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>{title}</Heading>

            <HStack spacing={1} justify="center">
              <Text>{subtitle}</Text>
              <Button variant="link" colorScheme="blue">
                <Link to={action === 'Sign up' ? '/auth/register' : '/auth/login'}>{action}</Link>
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">{children}</Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
