import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
    return(
        <>
        <span style={{display: 'flex', justifyContent:'center'}}>
            <span style={{paddingTop:'1px'}}><ThreeDots height='15' width='15' color='white' ariaLabel='Loading'/></span>
            &nbsp;Loading
        </span>
        </>
    )
}
export default Loader;