import React, {useState} from 'react';
import isCloudflare from '@authentication/cloudflare-ip';
import {MainPage, Input, ValidationResultIcon} from './visly';

function getStatus(value: string) {
  try {
    return isCloudflare(value) ? 'valid' : 'invalid';
  } catch (ex) {
    return 'unknown';
  }
}
function App() {
  const [value, setValue] = useState('');
  return (
    <MainPage
      style={{minHeight: '100vh', width: '100%'}}
      Input={<Input value={value} onChange={setValue} />}
      ValidationResultIcon={<ValidationResultIcon status={getStatus(value)} />}
    />
  );
}

export default App;
