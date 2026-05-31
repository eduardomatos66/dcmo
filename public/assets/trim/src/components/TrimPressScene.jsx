import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import useMachineCycle from '../hooks/useMachineCycle';
import Machine from './machine/Machine';

export default function TrimPressScene(){
 const {machine,setMachine}=useMachineCycle();

 const runCycle=async()=>{
  setMachine(m=>({...m,state:'CORES_CLOSE',leftCore:1,rightCore:1,tower:'yellow'}));
  setTimeout(()=>setMachine(m=>({...m,state:'PRESS_DOWN',ram:2})),1000);
  setTimeout(()=>setMachine(m=>({...m,state:'PRESS_UP',ram:0})),2500);
  setTimeout(()=>setMachine(m=>({...m,state:'EJECT',ejector:1})),3500);
  setTimeout(()=>setMachine(m=>({...m,state:'CORES_OPEN',leftCore:0,rightCore:0,ejector:0,tower:'green'})),5000);
 };

 return <>
 <div style={{position:'absolute',zIndex:10,padding:10}}>
   <button onClick={runCycle}>Start Auto Cycle</button>
 </div>
 <Canvas camera={{position:[10,8,10]}}>
   <ambientLight intensity={2}/>
   <Machine machine={machine}/>
   <OrbitControls/>
 </Canvas>
 </>;
}