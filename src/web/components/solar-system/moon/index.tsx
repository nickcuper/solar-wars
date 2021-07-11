import React, { useRef } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import moonImg from './assets/2k_moon.jpeg';

interface MoonOption {
    distanceX: number;
    size: number;
    position: [x: number, y: number, z: number];
}

export const Moon: React.FC<MoonOption> = (props) => {
    const ref = useRef();
    const texture = useLoader(TextureLoader, moonImg);
    return (
        <>
            <group position={[props.distanceX, 0, 0]}>
                <mesh ref={ref} receiveShadow={true} castShadow={true} position={props.position}>
                    <sphereGeometry attach="geometry" args={[props.size, 30, 30]} />
                    <meshPhongMaterial
                        attach="material"
                        map={texture}
                        bumpMap={texture}
                        bumpScale={0.001}
                    />
                </mesh>
            </group>
        </>
    );
};
