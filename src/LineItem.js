import { useEffect, useState } from "react";

function LineItem({ entity, lineNumber,onClick }) {
 
    const handleOnClick=()=>{
        if(!entity.canCollapse) return
        setCollapse(!collapse)
        onClick(lineNumber,collapse==false?true:false)        
    }

    const [collapse,setCollapse] = useState(false)
    
    return (
        <>
        <div className={`jsonFormatter__lineItem ${entity.hide?'jsonFormatter__lineItem--hide':''}`} >
            <div className='jsonFormatter__left' onClick={handleOnClick}> 
                <span className='jsonFormatter__lineNumber'>{lineNumber < 10 ? 0 : ''}{lineNumber}</span> 
                {entity.canCollapse?<span className={`jsonFormatter__toggleBtn`}> <img width={15} src="/down-arrow.png" style={{transform: collapse ? 'rotate(-90deg)' : '' }}/></span>:<span className='jsonFormatter__toggleBtn'></span>}
            </div>
            <div className='jsonFormatter__entity' style={{ marginLeft: entity.style.marginLeft }}>
                {entity.values?.map((item1, index1) => {
                    return (<span className={`jsonFormatter__entity--${entity.colors[index1]}`} key={index1}>{item1}</span>)
                })}
            </div>
        </div>
        </>
    );
}
export default LineItem;