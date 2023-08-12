import './App.css';
import { Entity } from './Lib/Entity';
import LineItem from './LineItem';
import { Tree } from './Lib/Tree';
import { useEffect, useState } from 'react';

function App({ json }) {
  let [jsonState, setJsonState] = useState([])

  useEffect(() => {
    let tree = new Tree().generateTree(json)
    setJsonState(tree.heirarchy)
  }, [])

  const handleOnClick = (openingParenthesesIndex, isCollapse) => {
    const tempState = [...jsonState]
    const closingParenthesesIndex = Entity.closingParenthesesIndex(jsonState, jsonState[openingParenthesesIndex - 1].parenthesesId)
    if (closingParenthesesIndex == -1) return
    for (let i = openingParenthesesIndex; i < closingParenthesesIndex; i++) {
      tempState[i].collapse = isCollapse
    }
    setJsonState(tempState)
  }

  return (
    <div className="jsonFormatter">
      {
        jsonState.map((item, index) => {
          return (
            <LineItem entity={item} lineNumber={index + 1} key={item._id} onClick={handleOnClick} />
          )
        })
      }
    </div>
  );
}

export default App;