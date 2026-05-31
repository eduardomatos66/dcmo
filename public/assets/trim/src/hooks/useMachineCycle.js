import {useState} from 'react';
export default function useMachineCycle(){
 const [machine,setMachine]=useState({
   state:'IDLE',
   ram:0,leftCore:0,rightCore:0,ejector:0,
   doorsOpen:true,
   tower:'green'
 });
 return {machine,setMachine};
}