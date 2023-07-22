import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App({ json }) {
  let [jsonState, setJsonState] = useState([])

  const isObject = (object) => {
    return typeof object === 'object' && !Array.isArray(object) && object !== null
  }
  

  const generateLineItems = (entity, level = 0,margin=0) => {

    let lineItems = []
    if (isObject(entity)) {
      if (level == 0) {
        lineItems.push({
          values: ['{'],
          colors: ['black'],
          style: {
            marginLeft: 0
          }
        })
      }

      Object.keys(entity).map((key, index) => {

        let value = entity[key]
          let color = 'blue'
          if (Array.isArray(entity[key])) {
            value = '['
            color = 'black'
          }
          if (isObject(entity[key])) {
            value = '{'
            color = 'black'
          }

          lineItems.push({
            values: [key, ' :', ` ${value}`],
            colors: ['orange', 'black', color],
            style: {
              marginLeft: margin+20
            }
          })

        if (Array.isArray(entity[key]) || isObject(entity[key])) {
          lineItems = [...lineItems, ...generateLineItems(entity[key], level + 1,margin+20)]
        }
      })
      lineItems.push({
        values: ['}'],
        colors: ['black'],
        style: {
          marginLeft: margin
        }
      })
    }

    if (Array.isArray(entity)) {
      if (level == 0) {
        lineItems.push({
          values: ['['],
          colors: ['black'],
          style: {
            marginLeft: margin
          }
        })
      }
      entity.forEach((item) => {

        lineItems.push({
          values: ['{'],
          colors: ['black'],
          style: {
            marginLeft: margin+20
          }
        })
        Object.keys(item).map((key, index) => {

          let value = item[key]
          let color = 'blue'
          if (Array.isArray(item[key])) {
            value = '['
            color = 'black'
          }
          if (isObject(item[key])) {
            value = '{'
            color = 'black'
          }

          lineItems.push({
            values: [key, ' :', ` ${value}`],
            colors: ['orange', 'black', color],
            style: {
              marginLeft: margin+40
            }
          })

          if (Array.isArray(item[key]) || isObject(item[key])) {
            lineItems = [...lineItems, ...generateLineItems(item[key], level + 1,margin+40)]
          }
        })

        lineItems.push({
          values: ['}'],
          colors: ['black'],
          style: {
            marginLeft: margin+20
          }
        })
      })

      lineItems.push({
        values: [']'],
        colors: ['black'],
        style: {
          marginLeft: margin
        }
      })
    }

    return lineItems
  }
  useEffect(() => {
    setJsonState(generateLineItems(json))
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
                  return (<span className={`jsonFormatter__lineItemOutput--${jsonState[item].colors[index1]}`} key={index1}>{item1}</span>)
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
