import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function LineItem({entity,lineNumber}) {
    return (
            <div className='jsonFormatter__lineItemOutput'>
                {entity.values.map((item1, index1) => {
                    return (<span className={`jsonFormatter__lineItemOutput--${entity.colors[index1]}`} key={index1}>{item1}</span>)
                })}
                {entity?.children?.length && entity.children.map((item2, index2) => {
                    return (<span className={`jsonFormatter__lineItemsChildren`} key={index2}>
                        <LineItem entity={item2} lineNumber={lineNumber+1} key={index2}/>
                    </span>)
                })}
            </div>
    );
}

export default LineItem;
