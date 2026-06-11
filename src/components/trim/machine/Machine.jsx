
import { useSpring, a } from '@react-spring/three';

export default function Machine({ targets, updateSensors, sensors }) {
  // RAM Animation (moves down)
  const { ramPos } = useSpring({
    ramPos: targets.ram === 1 ? [0, -2, 0] : [0, 0, 0],
    config: { tension: 60, friction: 20 },
    onStart: () => updateSensors({ LS_RAM_TOP: false, LS_RAM_BOTTOM: false }),
    onRest: () => updateSensors({
      LS_RAM_TOP: targets.ram === 0,
      LS_RAM_BOTTOM: targets.ram === 1
    })
  });

  // LEFT CORE Animation (moves inward)
  const { leftCorePos } = useSpring({
    leftCorePos: targets.leftCore === 1 ? [-2.0, 2.5, 0] : [-3.5, 2.5, 0],
    config: { tension: 70, friction: 25 },
    onStart: () => updateSensors({ LS_CORE_LEFT_OPEN: false, LS_CORE_LEFT_CLOSED: false }),
    onRest: () => updateSensors({
      LS_CORE_LEFT_OPEN: targets.leftCore === 0,
      LS_CORE_LEFT_CLOSED: targets.leftCore === 1
    })
  });

  // RIGHT CORE Animation (moves inward)
  const { rightCorePos } = useSpring({
    rightCorePos: targets.rightCore === 1 ? [2.0, 2.5, 0] : [3.5, 2.5, 0],
    config: { tension: 70, friction: 25 },
    onStart: () => updateSensors({ LS_CORE_RIGHT_OPEN: false, LS_CORE_RIGHT_CLOSED: false }),
    onRest: () => updateSensors({
      LS_CORE_RIGHT_OPEN: targets.rightCore === 0,
      LS_CORE_RIGHT_CLOSED: targets.rightCore === 1
    })
  });

  // EJECTOR Animation (moves up)
  const { ejectorPos } = useSpring({
    ejectorPos: targets.ejector === 1 ? [0, 2.5, 0] : [0, 1.5, 0],
    config: { tension: 100, friction: 20 },
    onStart: () => updateSensors({ LS_EJECTOR_HOME: false, LS_EJECTOR_EXTENDED: false }),
    onRest: () => updateSensors({
      LS_EJECTOR_HOME: targets.ejector === 0,
      LS_EJECTOR_EXTENDED: targets.ejector === 1
    })
  });

  // Material settings for an industrial look
  const steelMat = <meshStandardMaterial color="#b0b5b9" metalness={0.8} roughness={0.3} />;
  const coreMat = <meshStandardMaterial color="#0096FF" metalness={0.6} roughness={0.4} />;
  const frameMat = <meshStandardMaterial color="#2d3748" metalness={0.6} roughness={0.4} />;
  const yellowMat = <meshStandardMaterial color="#ffa000" metalness={0.2} roughness={0.5} />;
  const safetyGlass = <meshStandardMaterial color="#4299e1" transparent opacity={0.3} metalness={0.9} roughness={0.1} />;
  const lightCurtainMat = <meshStandardMaterial color="#f56565" transparent opacity={0.5} emissive="#f56565" emissiveIntensity={2} />;
  const partMat = <meshStandardMaterial color="#ff6600" metalness={0.1} roughness={0.5} emissive="#cc3300" emissiveIntensity={0.3} />;

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -1.25, 0]} receiveShadow>
        <boxGeometry args={[25, 0.5, 25]} />
        <meshStandardMaterial color="#4a5568" roughness={0.9} />
      </mesh>

      {/* Main Base / Lower Die area */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 2, 6]} />
        {yellowMat}
      </mesh>

      {/* Lower Die */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1, 4]} />
        {steelMat}
      </mesh>

      {/* The Part (only visible when PART_PRESENT is true) */}
      {sensors.PART_PRESENT && (
        <mesh position={[0, 2.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, 0.2]} />
          {partMat}
        </mesh>
      )}

      {/* Frame pillars */}
      <mesh position={[-3.5, 4.5, -2.5]} castShadow receiveShadow><boxGeometry args={[1, 9, 1]} />{frameMat}</mesh>
      <mesh position={[3.5, 4.5, -2.5]} castShadow receiveShadow><boxGeometry args={[1, 9, 1]} />{frameMat}</mesh>
      <mesh position={[-3.5, 4.5, 2.5]} castShadow receiveShadow><boxGeometry args={[1, 9, 1]} />{frameMat}</mesh>
      <mesh position={[3.5, 4.5, 2.5]} castShadow receiveShadow><boxGeometry args={[1, 9, 1]} />{frameMat}</mesh>

      {/* Top Frame / HPU */}
      <mesh position={[0, 9, 0]} castShadow receiveShadow>
        <boxGeometry args={[9, 1.5, 7]} />
        {yellowMat}
      </mesh>
      {/* Hydraulic Cylinder */}
      <mesh position={[0, 7.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 3]} />
        <meshStandardMaterial color="#718096" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Animated Ram & Upper Die */}
      <a.group position={ramPos}>
        <mesh position={[0, 5, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 1, 4]} />
          {yellowMat}
        </mesh>
        {/* Upper Die */}
        <mesh position={[0, 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 1, 4]} />
          {steelMat}
        </mesh>
      </a.group>

      {/* Animated Cores */}
      <a.mesh position={leftCorePos} castShadow receiveShadow>
        <boxGeometry args={[2, 1.5, 3]} />
        {coreMat}
      </a.mesh>
      <a.mesh position={rightCorePos} castShadow receiveShadow>
        <boxGeometry args={[2, 1.5, 3]} />
        {coreMat}
      </a.mesh>

      {/* Animated Ejector */}
      <a.mesh position={ejectorPos} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 1]} />
        {steelMat}
      </a.mesh>

      {/* Safety Doors (Front) */}
      <group position={[0, 4.5, 3.2]}>
        {!sensors.DOOR_LEFT_OPEN && (
          <mesh position={[-2.2, 0, 0]} castShadow>
            <boxGeometry args={[4, 6, 0.1]} />
            {safetyGlass}
          </mesh>
        )}
        {!sensors.DOOR_RIGHT_OPEN && (
          <mesh position={[2.2, 0, 0]} castShadow>
            <boxGeometry args={[4, 6, 0.1]} />
            {safetyGlass}
          </mesh>
        )}
        {/* Door Frames */}
        <mesh position={[-2.2, 3, 0]}><boxGeometry args={[4, 0.2, 0.2]} />{yellowMat}</mesh>
        <mesh position={[2.2, 3, 0]}><boxGeometry args={[4, 0.2, 0.2]} />{yellowMat}</mesh>
      </group>

      {/* Light Curtains (Right Lateral) */}
      <group position={[4, 4.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[-2.5, 0, 0]}><boxGeometry args={[0.2, 6, 0.2]} />{yellowMat}</mesh>
        <mesh position={[2.5, 0, 0]}><boxGeometry args={[0.2, 6, 0.2]} />{yellowMat}</mesh>
        {/* Laser Beams */}
        {!sensors.LIGHT_CURTAIN_BLOCKED && (
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[5, 6, 0.05]} />
            {lightCurtainMat}
          </mesh>
        )}
      </group>

    </group>
  );
}
