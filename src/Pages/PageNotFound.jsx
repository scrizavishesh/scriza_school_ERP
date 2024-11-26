import { Icon } from '@iconify/react';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
height: 100%;
`;


const PageNotFound = () => {

  return (
    <Container className='d-flex justify-content-center flex-column'>
      <Icon className='align-self-center mb-3' icon="twemoji:sad-but-relieved-face" width="5em" height="5em"  style={{color: 'red'}} />
      <h1 className='align-self-center text-danger'>Page Not Found !!!</h1>
    </Container>
  );
}

export default PageNotFound;
