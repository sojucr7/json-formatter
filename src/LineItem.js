function LineItem({ entity, lineNumber }) {
    return (
        <div className="jsonFormatter__lineItem">
            <div className='jsonFormatter__lineItemCounter'>{lineNumber < 10 ? 0 : ''}{lineNumber}</div>
            <div className='jsonFormatter__lineItemEntity' style={{ marginLeft: entity.style.marginLeft }}>
                {entity.values?.map((item1, index1) => {
                    return (<span className={`jsonFormatter__lineItemEntity--${entity.colors[index1]}`} key={index1}>{item1}</span>)
                })}
            </div>
        </div>
    );
}
export default LineItem;