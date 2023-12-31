import React, { useRef,useState } from 'react'
import './ImageGenerator.css';
import default_image1 from '../Assets/default_image1.webp' 

const ImageGenerator = () => {
   const [image_url,setImage_url] = useState("/");
   let inputRef= useRef(null);
   const[loading,setLoading]=useState(false);
 
    const imageGenerator = async () =>{
      if(inputRef.current.value===""){
        return 0;
      }
      setLoading(true);

      const response  = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method:"POST",
          header:{
            "Conetnt-Type":"application/json",
            Authorization:
            "Bearer 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",
            "User-Agent":"Chrome",
          },
          body:JSON.stringify({
            prompt:'${inputRef.current.value}',
            n:1,
            size:"512x512",
          }),
        }
      );
      let data=await response.json();
      let data_array = data.data;
      setImage_url(data_array[0].url);
      setLoading(false);
    }


  return (
    <div className='ai-image-generator'>
      <div>
      <div className="header">Ai image <span>generator</span></div>
      <div className="self_name">Project by Vasudev</div> </div>
      <div className="img-loading">
       <div className="image"><img src={image_url==="/"?default_image1:image_url} alt="" /></div>
       <div className="loading">
        <div className={loading?"loading-bar-full":"loading-bar"}></div>
        <div className={loading?"loading-text":"display-none"}>Loading....</div>
       </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You want to See'/>
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator
