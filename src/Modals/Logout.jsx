import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container= styled.div`
    .warningHeading{
        font-size: var(--font-size-20);
    }

    .warningText{
        font-size: var(--font-size-15);
        color: var(--greyInputTextColor) !important;
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

`;

const Logout = () => {
  return (
    <>
        <Container>
            <div className="row">
                <p className='modalLightBorder pt-2 pb-2'>Logout</p>
                <div className='row text-center pt-5'>
                    <span className='mb-3'><svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
                        <path fill="#B50000" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22m7-6v-3h-8v-2h8V8l5 4z" />
                    </svg></span>
                    <p className=' warningHeading'>Are you Sure?</p>
                    <p className='greyText warningText'>Are you Sure you want to logout?</p>
                    <p className='text-center p-3'>
                    <Link className='btn deleteButtons text-white' to='/login'>Logout</Link>
                    <button className='btn dltcancelButtons'>Cancel</button>
                    </p>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Logout