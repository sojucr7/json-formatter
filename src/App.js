import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import LineItem from './LineItem';
import {Tree} from './Lib/Tree'

function App({ json }) {
  let [jsonState, setJsonState] = useState([])

  const isObject = (object) => {
    return typeof object === 'object' && !Array.isArray(object) && object !== null
  }


  const generateLineItems = (entity, level = 0) => {

    const margin = level ? level * 20 + 20 : 0
    let lineItems = []
    if (isObject(entity)) {
      

      

      Object.keys(entity).map((key, index) => {

        if(index==0){
          lineItems.push({
            values: ['{'],
            colors: ['black']
          })
        }
        let items=[]
        let value = entity[key]
        let color = 'blue'
        if (Array.isArray(entity[key]) || isObject(entity[key])) {
          value = ''
          color = ''
        }

        items.push({
          values: [key, ' :', ` ${value}`],
          colors: ['orange', 'black', color]
        })
        

        if (Array.isArray(entity[key]) || isObject(entity[key])) {

          items['children'] = generateLineItems(entity[key], level + 1)
        }

        lineItems[lineItems.length - 1]['children']=items

        if(index==Object.keys(entity).length-1){
          lineItems.push({
            values: ['}'],
            colors: ['black']
          })
        }
      })
      
    }

    if (Array.isArray(entity)) {
      
      entity.forEach((item,index1) => {
        if(index1==0){
          lineItems.push({
            values: ['['],
            colors: ['black']
          })
        }

        let items=[]
        items.push({
          values: ['{'],
          colors: ['black']
        })
        Object.keys(item).map((key, index) => {

          let value = item[key]
          let color = 'blue'
          if (Array.isArray(item[key]) || isObject(item[key])) {
            value = ''
            color = ''
          }

          items.push({
            values: [key, ' :', ` ${value}`],
            colors: ['orange', 'black', color]
          })

          if (Array.isArray(item[key]) || isObject(item[key])) {
            items['children'] = generateLineItems(item[key], level + 1)
          }
        })
        lineItems[lineItems.length - 1]['children'] =items
        items.push({
          values: ['}'],
          colors: ['black']
        })

        if(index1==entity.length-1){
          lineItems.push({
            values: [']'],
            colors: ['black']
          })
        }
      })

      
    }

    return lineItems
  }
  useEffect(() => {
    let tree=new Tree()
    console.log(generateLineItems(json))
    setJsonState(generateLineItems(json))
  }, [])
  return (
    <div className="jsonFormatter">
      {
        jsonState && Object.keys(jsonState).map((item, index) => {
          return (
            <div className="jsonFormatter__lineItems">
              <div className='jsonFormatter__lineItemsCounter'>{index + 1}</div>
              <LineItem entity={jsonState[item]} lineNumber={index + 1} key={index} />
            </div>

          )
        })
      }
    </div >
  );
}

export default App;
