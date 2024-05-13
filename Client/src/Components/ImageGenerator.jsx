import React from 'react'
import default_image from '../assets/default_image.svg'
import { useState, useRef } from 'react'

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);

    const generateImage = async () => {
        if(inputRef.current.value === ""){
            return 0;
        }
        const response = await fetch( 
            `${import.meta.env.API}`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : `${import.meta.env.API_KEY}`,
                "User-Agent": "Chrome",
            },
            body: JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n:1,
                size:"256x256",
            }),
        }
    )
        let data = await response.json();
        console.log(data);
        // let data_array = data.data;
        // setImage_url(data_array[0].url);
    }
  return (
    <div className='bg-white w-full h-screen flex flex-col items-center justify-center'>
        <div>
            <h1 className='font-semibold text-zinc-950 text-2xl mb-2'>AI IMAGE GENERATOR</h1>
        </div>
        <div className='w-96 h-96 bg-gray-200 rounded-2xl flex items-center justify-center'>
            <img src = {image_url ==="/" ? default_image:image_url} alt='Generated Image' className='w-96 h-96 rounded-2xl' />
        </div>
        <div>
            <input type='text'ref={inputRef} placeholder='Describe what you need' className='text-black w-96 h-12 border border-gray-300 rounded-lg px-4 py-2 mt-4' />
        </div>
        <div>
            <button className='bg-zinc-950 text-white px-4 py-2 rounded-lg mt-4' onClick={()=> {generateImage()}}>Generate</button>
        </div>
    </div>
  )
}

export default ImageGenerator