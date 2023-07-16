import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App({ json }) {
  let [jsonState, setJsonState] = useState([])
  useEffect(() => {
    let formattedArray = []
    formattedArray.push({
      values: ['{'],
      colors: ['black'],
      hasColon: false,
      style: {
        marginLeft: 0
      }
    })
    Object.keys(json).map((key, index) => {
      formattedArray.push({
        values: [key, ` "${json[key]}"`],
        colors: ['red', 'blue'],
        hasColon: true,
        style: {
          marginLeft: 20
        }
      })
    })
    formattedArray.push({
      values: ['}'],
      colors: ['black'],
      hasColon: false,
      style: {
        marginLeft: 0
      }
    })
    setJsonState(formattedArray)
  }, [])
  return (
    <div className="jsonFormatter">
      {
        jsonState && Object.keys(jsonState).map((item, index) => {
          return (
            <div className="jsonFormatter__lineItems" key={index}>
              <div className='jsonFormatter__lineItemsCounter'>{index + 1}</div>
              <div className='jsonFormatter__lineItemOutput' style={{ marginLeft: jsonState[item].style.marginLeft }}>
                {jsonState[item].values.map((item1, index1) => {
                  return (<span className={`jsonFormatter__lineItemOutput--${jsonState[item].colors[index1]}`} key={index1}>{item1} {index1 == 0 && jsonState[item].hasColon && <span>:</span>}</span>)
                })}
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
