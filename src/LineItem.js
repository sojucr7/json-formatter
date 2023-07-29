function LineItem({entity,lineNumber,depth=0}) {
    return (
            <>
            <div className='jsonFormatter__lineItemOutput'>
                
                {entity.values?.map((item1, index1) => {
                    return (<span className={`jsonFormatter__lineItemOutput--${entity.colors[index1]}`} key={index1}>{item1}</span>)
                })}
                {entity?.children?.length>0 && entity.children.map((item2, index2) => {
                    return (<div className={`jsonFormatter__lineItemsChildren`} key={`${index2}-${depth}`}>
                        <LineItem entity={item2} lineNumber={lineNumber+1} depth={depth+1}/>
                    </div>)
                })}
            </div>
            </>
    );
}
export default LineItem;