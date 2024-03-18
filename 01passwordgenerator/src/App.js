import './App.css';
import {useState,useCallback,useRef,useEffect} from 'react'
function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState('')
  const passwordRef=useRef(null)

  const generatePassword= useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(numberAllowed) str+='1234567890'
    if(charAllowed) str+='!@#$%^&*()_+?><'
    for(let i=1;i<length;i++){
      const char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
    generatePassword()
  },[length,charAllowed,numberAllowed])

  const copyPassword=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <div className="App">
        <h1>Password Generator</h1>
        <div>
          <input
            type='text'
            value={password}
            placeholder='Password....'
            ref={passwordRef}
            readOnly
          />
          {'  '}
          <button onClick={copyPassword}>Copy</button>
        </div>
        <div>
            <input 
              name='length'
              type='range'
              min={8}
              max={20}
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label htmlFor='length'>Length {length}</label>
            <div>
              <input
                type='checkbox'
                name="allowedNumber"
                defaultChecked={numberAllowed}
                onChange={()=>{setNumberAllowed((prev)=>!prev)}}
                />
              <label htmlFor='allowedNumber'>Number Allowed</label>

              <input
                type='checkbox'
                name="charNumber"
                defaultChecked={charAllowed}
                onChange={()=>{setCharAllowed((prev)=>!prev)}}
                />
              <label htmlFor='charNumber'>Character Allowed</label>
              </div>
        </div>
    </div>
  );
}

export default App;
