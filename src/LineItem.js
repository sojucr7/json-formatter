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
        <div className="jsonFormatter__lineItem" style={{display: entity.collapse ? 'none' : '' }}>
            <div className='jsonFormatter__lineItemCounter' onClick={handleOnClick}> 
                <span className='jsonFormatter__lineNumber'>{lineNumber < 10 ? 0 : ''}{lineNumber}</span> 
                {entity.canCollapse?<span className='jsonFormatter__lineItemCounterToggleBtn' > <img width={15} src="/down-arrow.png"/></span>:<span className='jsonFormatter__lineItemCounterToggleBtn'></span>}
            </div>
            <div className='jsonFormatter__lineItemEntity' style={{ marginLeft: entity.style.marginLeft }}>
                {entity.values?.map((item1, index1) => {
                    return (<span className={`jsonFormatter__lineItemEntity--${entity.colors[index1]}`} key={index1}>{item1}</span>)
                })}
            </div>
        </div>
        </>
    );
}
export default LineItem;