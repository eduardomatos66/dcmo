import {Group} from 'three';
export default function Machine({machine}){
 return <group>
  <mesh position={[0,0,0]}><boxGeometry args={[8,.5,6]}/><meshStandardMaterial/></mesh>

  <mesh position={[0,4-machine.ram,0]}>
   <boxGeometry args={[5,.7,4]}/>
   <meshStandardMaterial/>
  </mesh>

  <mesh position={[-3+machine.leftCore,1.5,0]}>
   <boxGeometry args={[1,2,3]}/>
   <meshStandardMaterial/>
  </mesh>

  <mesh position={[3-machine.rightCore,1.5,0]}>
   <boxGeometry args={[1,2,3]}/>
   <meshStandardMaterial/>
  </mesh>

  <mesh position={[0,machine.ejector,0]}>
   <boxGeometry args={[2,.3,2]}/>
   <meshStandardMaterial/>
  </mesh>
 </group>
}