import React, { useRef } from 'react';
import { TextureLoader, BackSide } from 'three';
import { useLoader } from '@react-three/fiber';
import milkyWay from './assets/2k_stars_milky_way.jpeg';
import stars from './assets/2k_stars.jpeg';

export const Universe: React.FC = (props): JSX.Element => {
    const mesh = useRef();
    const [mwTexture] = useLoader(TextureLoader, [milkyWay, stars]);
    console.log('Universe');
    return (
        <>
            <group>
                <mesh ref={mesh}>
                    <sphereGeometry attach="geometry" args={[100, 32, 32]} />
                    <meshPhongMaterial attach="material" map={mwTexture} side={BackSide} />
                </mesh>
                {props.children}
            </group>
        </>
    );
};
