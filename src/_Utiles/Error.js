import React from 'react';
import './error.css'

const Error = () => {
    return (
        <div className='error'>
            <img src={require('../assets/error.gif')} alt='Error 404' />
        </div>
    );
};

export default Error;
