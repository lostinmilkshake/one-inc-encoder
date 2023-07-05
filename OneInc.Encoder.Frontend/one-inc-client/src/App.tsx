import { MantineProvider } from '@mantine/core'
import './App.css'
import { Encoder } from './Encoder'

function App() {  
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Encoder />
      </MantineProvider>      
    </>
  )
}

export default App
