import React, { useRef } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import marsPic from './assets/2k_mars.jpeg';
import moonPic from './assets/2k_moon.jpeg';
import neptunePic from './assets/2k_neptune.jpeg';
import earthPic from './assets/2k_earth_daymap.jpeg';
import { Orbit } from '../orbit';
import { Rings } from './rings';

export const PlanetType = {
    MARS: marsPic,
    MOON: moonPic,
    NEPTUNE: neptunePic,
    EARTH: earthPic,
};

interface PlanetOption {
    type: string;
    size: number;
    hasRings: boolean;
    position: [x: number, y: number, z: number];
    xR: number;
    zR: number;
}

export const Planet: React.FC<PlanetOption> = (props) => {
    const ref = useRef();
    const texture = useLoader(TextureLoader, props.type);
    return (
        <>
            <group>
                <mesh ref={ref} receiveShadow={true} castShadow={true} position={props.position}>
                    <sphereGeometry attach="geometry" args={[props.size, 30, 30]} />
                    <meshPhongMaterial
                        attach="material"
                        map={texture}
                        bumpMap={texture}
                        bumpScale={0.001}
                    />
                </mesh>
                <pointLight color={0xffffff} intensity={0.01} />
                {props.hasRings && <Rings position={props.position} r={props.size} />}
                <Orbit xRadius={props.xR} zRadius={props.zR} />
            </group>
        </>
    );
};
