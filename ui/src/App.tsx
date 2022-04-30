import { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import * as React from 'react';

//test component for react hot module

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  return (
    <div className="App">
      <Box p={3}>
        <Button></Button>
        <header className="App-header">
          <p>
            Page has been open for <code>{count}</code> seconds.
          </p>
        </header>
      </Box>
    </div>
  );
}

export default App;
