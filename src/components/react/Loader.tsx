import React from 'react';
// import LoaderGif from "../../assets/images/loader.gif";
import './loader.css';

const Loader = () => {
    const loaderContainerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)', // Adjust the blur amount as needed
        zIndex: 9999,
        // Optionally, set opacity
        // opacity: 0.8, // Adjust the opacity as needed
    };


    return (
        // @ts-ignore
        <div style={loaderContainerStyle} className='flex-col'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            <h1 className="font-semibold text-xl">Generating your MIDI</h1>
        </div>
    );
};

export default Loader;