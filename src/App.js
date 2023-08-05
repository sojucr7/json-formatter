import './App.css';
import LineItem from './LineItem';
import { Tree } from './Lib/Tree';
import { useEffect, useState } from 'react';

function App({ json }) {
  let [jsonState, setJsonState] = useState([])

  useEffect(() => {
    let tree = new Tree().generateTree(json)
    //tree.closingIndex(jsonState,'3-0')
    setJsonState(tree.heirarchy)
  }, [])

  return (
    <div className="jsonFormatter">
      {
        jsonState.map((item, index) => {
          return (
            <LineItem entity={item} lineNumber={index + 1} key={index} />
          )
        })
      }
    </div>
  );
}

export default App;