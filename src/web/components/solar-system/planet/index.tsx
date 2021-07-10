import React, { forwardRef, useRef } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import marsPic from './assets/2k_mars.jpeg';
import moonPic from './assets/2k_moon.jpeg';
import neptunePic from './assets/2k_neptune.jpeg';
import { Orbit } from '../orbit';

export const PlanetType = {
    MARS: marsPic,
    MOON: moonPic,
    NEPTUNE: neptunePic,
};

interface PlanetOption {
    type: string;
    ref: typeof useRef;
    size: number;
    position: [x: number, y: number, z: number];
    xR: number;
    zR: number;
}

export const Planet = forwardRef<unknown, PlanetOption>((props, ref) => {
    const texture = useLoader(TextureLoader, props.type);
    return (
        <>
            <mesh ref={ref} receiveShadow={true} position={props.position}>
                <sphereGeometry attach="geometry" args={[props.size, 30, 30]} />
                <meshPhongMaterial
                    attach="material"
                    map={texture}
                    bumpMap={texture}
                    bumpScale={0.001}
                />
            </mesh>
            <Orbit xRadius={props.position[0]} zRadius={props.position[1]} />
        </>
    );
});
