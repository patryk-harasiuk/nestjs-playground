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
} from '@chakra-ui/react';

interface LayoutProps {
  title?: string;
  subtitle?: string;
  action: 'Sign up' | 'Log in';
  children?: React.ReactNode;
}

export const Layout = ({ title, subtitle, action, children }: LayoutProps) => {
  return (
    <Container maxW={'lg'}>
      <Stack spacing={8}>
        <Stack spacing={6}>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>{title}</Heading>

            <HStack spacing={1} justify="center">
              <Text>{subtitle}</Text>
              <Button variant="link">{action}</Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          borderRadius={{ base: 'none', sm: 'xl' }}
        ></Box>
        {children}
      </Stack>
    </Container>
  );
};
