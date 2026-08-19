import React,{useState,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,AnimatePresence} from 'framer-motion';
import {Heart,ArrowRight,ArrowLeft,Sparkles,Music2,VolumeX} from 'lucide-react';
import './styles.css';

const pages=[
 {k:'begin',title:'For Navya',sub:'A little journey… made from the things I sometimes fail to say out loud.',button:'Start the journey'},
 {k:'one',title:'The beginning',placeholder:'Some of the most beautiful things in life are the ones we never planned for.\n\nI never knew that one ordinary day, someone would walk into my life and slowly become such a beautiful part of it.\n\nYou came unexpectedly… but somehow, everything about having you in my life feels like it was meant to happen.\n\n I’m really glad life introduced me to you. ❤️'},
 {k:'two',title:'Somewhere along the way…',placeholder:'It started so simply..\n\nA colleague.\nThen a friend.\n\nThen someone I started looking forward to talking to, sharing things with, laughing with…And somewhere along the way, without even realizing when it happened, you became someone very, very special to my heart.\n\nFunny how a person can enter your life as a stranger and slowly become your most favorite in the world.'},
 {k:'three',title:'What you may not know',placeholder:'I dont think you truly know what you mean to me.\n\nI may not always say it. \n\nI may not always know how to express it. Sometimes I probably do a terrible job of showing it too.\n\nBut beneath all of that is a heart that genuinely cares about you… more than my words could ever explain.\n\nYou matter to me. A lot. More than you probably realize. ❤️'},
 {k:'four',title:'If I could give you one thing…',placeholder:'If I could give you something today, I wouldnt choose just one gift.\n\nI would give you the best of everything this world has to offer.\n\nAll the happiness your heart can hold.\nAll the peace your mind deserves.\nAll the laughter that makes your eyes sparkle.\nAll the beautiful moments you havent experienced yet.\n\nAnd whenever life gets a little difficult, I would give you a little extra strength to get through it.\n\nBecause if you deserve anything, you deserve the very best. Always.'},
 {k:'five',title:'And then there is today…',placeholder:'Today, Im celebrating you. 🎂❤️Even though Im not beside you right now, this day still feels incredibly special to me.\n\nBecause for the first time in my life, Im celebrating the birthday of someone I truly love and care about.\n\nAnd I want you to remember one thing - you never have to face everything alone.No matter how life changes, no matter how difficult some days become, I will always be here wishing for your happiness, caring for you, and quietly cheering for you.\n\nNever forget… you will always have a very special place in my heart. ❤️'},
 {k:'final',title:'Happy Birthday, Navya',sub:'Today is yours. But somehow, I feel lucky that you exist in my world.',button:'One last little surprise'}
];
function FloatingHearts(){return <div className="floaters">{Array.from({length:18},(_,i)=><motion.div key={i} className="floater" initial={{y:'110vh',x:`${(i*37)%100}vw`,opacity:0,scale:.5}} animate={{y:'-15vh',opacity:[0,.8,.8,0],scale:[.5,1,1.2,.7],rotate:[0,20,-20,0]}} transition={{duration:8+i%5,delay:i*.35,repeat:Infinity,ease:'linear'}}><Heart fill="currentColor" size={12+i%4*4}/></motion.div>)}</div>}
function SparkleField(){return <div className="sparkles">{Array.from({length:40},(_,i)=><motion.span key={i} initial={{opacity:.15,scale:.5}} animate={{opacity:[.1,1,.15],scale:[.5,1.4,.5]}} transition={{duration:1.8+i%4*.5,delay:i*.11,repeat:Infinity}} style={{left:`${(i*29)%100}%`,top:`${(i*47)%100}%`}}>✦</motion.span>)}</div>}

function App(){
 const [page,setPage]=useState(0);
 const [celebrate,setCelebrate]=useState(false);
 const [musicPlaying,setMusicPlaying]=useState(false);
 const audioRef=React.useRef(null);
 const [wishGranted, setWishGranted] = useState(false);
useEffect(() => {
  const audio = audioRef.current;

  if (!audio) return;

  audio.volume = 1;

  const playMusic = async () => {
    try {
      await audio.play();
      console.log("🎵 Music started");
    } catch (error) {
      console.log("🔇 Autoplay blocked by browser");
    }
  };

  playMusic();

  const startOnInteraction = () => {
    playMusic();
  };

  document.addEventListener("click", startOnInteraction, { once: true });
  document.addEventListener("touchstart", startOnInteraction, { once: true });

  return () => {
    document.removeEventListener("click", startOnInteraction);
    document.removeEventListener("touchstart", startOnInteraction);
  };
}, []);

 useEffect(()=>{
   const audio=audioRef.current;
   if(!audio) return;
   audio.loop=true;
   audio.volume=0.55;
 },[]);

 useEffect(()=>{
   if(page===6) setCelebrate(true);
 },[page]);

 const startMusic=async()=>{
   const audio=audioRef.current;
   if(!audio) return;
   try{
    
     setMusicPlaying(true);
   }catch(e){
     // Browser may block playback until a direct user interaction.
     setMusicPlaying(false);
   }
 };

 

 const next=async()=>{
   if(page===0) await startMusic();
   setPage(p=>Math.min(6,p+1));
 };
 const prev=()=>setPage(p=>Math.max(0,p-1));
 const current=pages[page];

 return <main className={`app page-${current.k}`}>
<audio
  ref={audioRef}
  src={`${import.meta.env.BASE_URL}music/navya-birthday.mp3`}
  autoPlay
  loop
  preload="auto"
/>  <FloatingHearts/>{page===6&&<SparkleField/>}
  <div className="ambient a1"/><div className="ambient a2"/>

  <header>
    <div className="brand"><Heart size={16} fill="currentColor"/> for Navya</div>
    <div className="counter">{page===0?'':`${page}/6`}</div>
 
  </header>

  {page>0&&<div className="progress"><div className="track"><motion.div animate={{width:`${(page/6)*100}%`}}/></div>{[1,2,3,4,5,6].map(n=><span className={page>=n?'on':''} key={n}>{n}</span>)}</div>}

  <AnimatePresence mode="wait"><motion.section key={page} className="screen" initial={{opacity:0,y:35,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-25,scale:.98}} transition={{duration:.55,ease:[.22,1,.36,1]}}>
   {page===0&&<>
    <div className="hero-orbit"><div className="orbit o1"/><div className="orbit o2"/><motion.div className="hero-heart" animate={{scale:[1,1.08,1],rotate:[-4,4,-4]}} transition={{duration:2.4,repeat:Infinity}}><Heart fill="currentColor" size={76}/></motion.div></div>
    <div className="eyebrow">A tiny website with a very big feeling</div>
    <h1>For <em>Navya</em><span>♥</span></h1>
    <p>{current.sub}</p>
    <button className="primary" onClick={next}>{current.button}<ArrowRight size={18}/></button>
    <div className="music-note"></div>
    <div className="scroll">scroll into my heart <span>↓</span></div>
   </>}

   {page>0&&page<6&&<div className="letter-wrap">
     <div className="letter">
       <div className="mini-heart"><Heart fill="currentColor"/></div>
       <div className="eyebrow">chapter {page}</div>
       <h2>{current.title} <span>♡</span></h2>
       <div className="placeholder" style={{ whiteSpace: "pre-wrap" }}>{current.placeholder}</div>
       <div className="line"/>
       <p className="hint">To, my dearest 'someone'.</p>
     </div>
     <div className="nav">
       <button className="ghost" onClick={prev}><ArrowLeft size={17}/> Back</button>
       <button className="primary small" onClick={next}>Continue <ArrowRight size={17}/></button>
     </div>
   </div>}

   {page===6&&<div className="finale">
      <motion.div className="burst" animate={{rotate:360}} transition={{duration:18,repeat:Infinity,ease:'linear'}}><div>✦</div><div>✦</div><div>✦</div><div>✦</div><div>✦</div><div>✦</div></motion.div>
      <motion.div className="cake" initial={{scale:0,rotate:-8}} animate={{scale:1,rotate:0}} transition={{delay:.2,type:'spring',stiffness:130}}><div className="flame">♥</div><div className="candles">| | |</div><div className="cake-body">♡</div></motion.div>
      <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.45}}>Happy Birthday,<br/><em>Navya</em> <span>♥</span></motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}}>May life be gentle with your heart,<br/>may your smile always find its way back,<br/>and may you never forget how wonderfully special you are.</motion.p>
      <motion.div className="signature" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1}}>— from someone who is very, very lucky to know you.</motion.div>
      <motion.button className="primary glow" onClick={() => setWishGranted(true)} whileTap={{scale:.96}}><Sparkles size={18}/> {celebrate?'Make a wish and click here':'One last little surprise'}</motion.button>
      {wishGranted && (
  <div className="wish-overlay">
    <div className="wish-card">
      <div className="wish-stars">✨ ⭐ ✨</div>

      <div className="wish-icon">🌙</div>

      <h2>Wish Granted! 💫</h2>

      <p>
        Your wish has been sent to the universe...
        <br />
        and I’m secretly making sure it comes true. ❤️
      </p>

      <div className="wish-sparkles">✦ · ˚ ✧ · ˚ ✦</div>

      <button
        className="close-wish"
        onClick={() => setWishGranted(false)}
      >
        Keep this wish 🤍
      </button>
    </div>
  </div>
)}
      {celebrate&&<Confetti/>}
   </div>}
  </motion.section></AnimatePresence>

  {page>0&&page<6&&<div className="dots">{pages.slice(1,7).map((_,i)=><span className={i+1===page?'active':''} key={i}/>)}</div>}
 </main>
}
function Confetti(){return <div className="confetti">{Array.from({length:100},(_,i)=><motion.i key={i} initial={{y:-30,x:'50vw',rotate:0,opacity:1}} animate={{y:'110vh',x:`${(i*71)%100}vw`,rotate:720,opacity:0}} transition={{duration:2.8+i%12*.12,delay:i%18*.035,ease:'easeOut'}}/> )}</div>}

createRoot(document.getElementById('root')).render(<App/>);
