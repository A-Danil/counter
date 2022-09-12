import { useEffect, useState } from "react";
import AnimatedNumber from "animated-number-react";


function App() {

  const [count, setCount] = useState(0);
  const [plus, setPlus] = useState('');
  const [minus, setMinus] = useState('');

  function counting(e){
    if(e.key === 'ArrowRight'){
      setCount(count + 1)
      setPlus('')
      setMinus('')
      setPlus('+1')
      setTimeout(()=>{
        setPlus('')
      }, 1000)
    } else if(e.key === "ArrowLeft"){
      setCount(count - 1)
      setPlus('')
      setMinus('')
      setMinus('-1')
      setTimeout(()=>{
        setMinus('')
      }, 1000)
    }
  }


  useEffect(()=>{
    window.addEventListener('keydown', counting);
    return () => {
      window.removeEventListener('keydown', counting);
    }
  })

  return (
    <div className="container">
      <div className="counter">
        <AnimatedNumber value={count} formatValue={n=>n.toFixed(0)} className='h1' duration={500} />
        {/* <h1><span>{minus}</span>{count}<span>{plus}</span></h1> */}
        <span className="minus">{minus}</span>
        <span className="plus">{plus}</span>
      </div>
    </div>
  );
}

export default App;
