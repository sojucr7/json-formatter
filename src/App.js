import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import LineItem from './LineItem';
import { Tree } from './Lib/Tree'

function App({ json }) {
  let [jsonState, setJsonState] = useState([])
  let [treeSize, setTreeSize] = useState(0)

  useEffect(() => {
    let tree = new Tree().generateTree(json)
    setTreeSize(tree.size(tree.heirarchy))
    setJsonState(tree.heirarchy)
  }, [])

  return (
    <div className="jsonFormatter">
      <div className="jsonFormatter__lineItemsCounterContainer">
        {

          [...Array(treeSize)].map((item, index) => {
            return (<div className='jsonFormatter__lineItemsCounter' key={`lineNumber${index}`} style={{ top: index * 21.60 }}>{index<9 ? 0:''}{index + 1}</div>)
          })

        }
      </div>
      <div className="jsonFormatter__lineItemsDataContainer">
      {
        jsonState.map((item, index) => {
          return (
            <div className="jsonFormatter__lineItemsChildren" key={index}>
              <LineItem entity={item} lineNumber={index + 1} />
            </div>
          )
        })
      }
      </div>
    </div >
  );
}

export default App;