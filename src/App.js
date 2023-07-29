import './App.css';
import LineItem from './LineItem';
import { Tree } from './Lib/Tree';
import { useEffect, useState } from 'react';

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