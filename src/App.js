import { useEffect, useState, useRef } from "react";
// import AnimatedNumber from "animated-number-react";
import plusSound from './assets/audio/plus.mp3';
import minusSound from './assets/audio/minus.mp3';
import achived from './assets/audio/achived20.mp3';


function App() {

  const [count, setCount] = useState(0);
  const [plus, setPlus] = useState('');
  const [minus, setMinus] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(plusSound);

  const audioElem = useRef(null);

async function tooglePlay () {
    if(!isPlaying){
      await audioElem.current.load();
      await audioElem.current.play();
    } else {
      await audioElem.current.pause();
    }
  }


 function counting(e){
    if(e.key === 'ArrowRight'){
      setCount(count + 1);
      setPlus('');
      setMinus('');
      if(count !==0 && (count + 1) % 20 === 0){
        setSound(achived);
      } else {
        setSound(plusSound);
      }
      setIsPlaying(true);
      tooglePlay();
      setIsPlaying(false);
      setPlus('+1');
      setTimeout(()=>{
        setPlus('');
      }, 1000)
    } else if(e.key === "ArrowLeft"){
      setCount(count - 1);
      setPlus('');
      setSound(minusSound);
      setIsPlaying(true);
      tooglePlay();
      setIsPlaying(false);
      setMinus('-1');
      setTimeout(()=>{
        setMinus('');
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
        <h1>{count}</h1>
        <audio ref={audioElem} src={sound} preload="auto" />
        <h3 className="minus">{minus}</h3>
        <h3 className="plus" style={{right: `${count === 100 ? '' : '50%'}`}}>{plus}</h3>
      </div>
    </div>
  );
}

export default App;
