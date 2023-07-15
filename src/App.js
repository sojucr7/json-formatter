import logo from './logo.svg';
import './App.css';

function App({json}) {
  return (
    <div className="jsonFormatter">
      
          <div className="jsonFormatter__lineItems">
          <div className='jsonFormatter__lineItemsCounter'>1</div>
          <div className='jsonFormatter__lineItemOutput'><span className='jsonFormatter__lineItemOutput--black'>&#123;</span></div>
  </div>
  {
        Object.keys(json).map((key,index)=>{
          return (
            <div className="jsonFormatter__lineItems" key={index}>
              <div className='jsonFormatter__lineItemsCounter'>{index+2}</div>
              <div className='jsonFormatter__lineItemOutput' style={{marginLeft:20}}><span className='jsonFormatter__lineItemOutput--red'>{key}</span>: <span className='jsonFormatter__lineItemOutput--blue'>"{json[key]}"</span></div>
            </div>
          )
        })
      }
      <div className="jsonFormatter__lineItems">
              <div className='jsonFormatter__lineItemsCounter'>{Object.keys(json).length+2}</div>
              <div className='jsonFormatter__lineItemOutput'><span className='jsonFormatter__lineItemOutput--black'>&#125;</span></div>
      </div>
      
    </div>
  );
}

export default App;
