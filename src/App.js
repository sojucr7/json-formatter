import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import LineItem from './LineItem';
import {Tree} from './Lib/Tree'

function App({ json }) {
  let [jsonState, setJsonState] = useState([])

  useEffect(() => {
    let tree=new Tree().generateTree(json)   
    setJsonState(tree)
  }, [])

  return (
    <div className="jsonFormatter">
      { 
        jsonState.map((item, index) => {
          return (
            <div className="jsonFormatter__lineItems"  key={index}>
              <LineItem entity={item} lineNumber={index + 1}/>
            </div>
          )
        })
      }
    </div >
  );
}

export default App;