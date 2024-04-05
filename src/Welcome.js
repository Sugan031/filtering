import React from 'react'
import InputSearch from './components/InputSearch'
import { Container }  from '@mui/material';
const Welcome = () => {
  return (
    <Container
                maxWidth="xl"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
    <InputSearch/>
    </Container>
  )
}

export default Welcome