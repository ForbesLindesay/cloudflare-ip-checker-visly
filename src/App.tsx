import React, {useState} from 'react';
import isCloudflare from '@authentication/cloudflare-ip';
import {
  MainPage,
  Input,
  ValidationResultIcon,
  StreamlineLinkText,
} from './visly';

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
      Input={
        <label style={{flexGrow: 1}}>
          <Input value={value} onChange={setValue} />
        </label>
      }
      ValidationResultIcon={<ValidationResultIcon status={getStatus(value)} />}
      StreamlineLinkText={
        <a
          style={{
            padding: 0,
            margin: 0,
            textDecoration: 'none',
          }}
          href="https://www.streamlineicons.com/"
        >
          <StreamlineLinkText />
        </a>
      }
    />
  );
}

export default App;
