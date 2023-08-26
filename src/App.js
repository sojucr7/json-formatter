import './App.css';
import LineItem from './LineItem';
import { Tree } from './Lib/Tree';
import { Entity } from './Lib/Entity';
import { useEffect, useState } from 'react';

function App({ json }) {
  let [jsonState, setJsonState] = useState([])

  useEffect(() => {
    let tree = new Tree().generateTree(json)
    setJsonState(tree.heirarchy)
  }, [])

  const handleOnClick = (lineNumber, isCollapse) => {
    const tempState = [...jsonState]
    const openingParenthesesIndex = lineNumber - 1
    const closingParenthesesIndex = Entity.closingParenthesesIndex(jsonState, jsonState[openingParenthesesIndex].parenthesesId)

    if (closingParenthesesIndex == -1) return
    //current state of the bracket
    tempState[openingParenthesesIndex].collapse = isCollapse
    //next line of opening bracket
    let i = lineNumber

    while (i < closingParenthesesIndex - 1) {
      //hide every child
      tempState[i].hide = isCollapse
      //is nested child already collapsed?? then skip
      if (tempState[i].collapse && isCollapse == false) {
        i = Entity.closingParenthesesIndex(jsonState, jsonState[i].parenthesesId) - 1
      } else {
        i++
      }
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