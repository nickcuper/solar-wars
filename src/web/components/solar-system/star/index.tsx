import React, { useRef } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import sunPic from './assets/2k_sun.jpeg';
import blueGiantPic from './assets/blue_gas_giant.png';
import gasGiantPic from './assets/gas_giant.png';

export const StarType = {
    SUN: sunPic,
    BLUE_GIANT: blueGiantPic,
    GAS_GIANT: gasGiantPic,
};

interface StarOption {
    type: string;
    size: number;
    position: [x: number, y: number, z: number];
}

export const Star: React.FC<StarOption> = (props) => {
    const ref = useRef();
    const texture = useLoader(TextureLoader, props.type);
    return (
        <>
            <mesh receiveShadow={false} ref={ref} position={props.position}>
                <sphereGeometry args={[props.size, 30, 30]} attach="geometry" />
                <meshPhongMaterial
                    map={texture}
                    bumpMap={texture}
                    bumpScale={0.001}
                    attach="material"
                />
            </mesh>
            <pointLight color="0xFFFFFF" intensity={0.2} position={[0, 0, 0]} />
        </>
    );
};
