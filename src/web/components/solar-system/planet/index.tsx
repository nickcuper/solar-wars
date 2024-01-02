import React, { useRef } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import marsPic from './assets/2k_mars.jpeg';
import saturnPic from './assets/2k_saturn.jpeg';
import neptunePic from './assets/2k_neptune.jpeg';
import earthPic from './assets/2k_earth_daymap.jpeg';
import uranusPic from './assets/2k_uranus.jpeg';
import jupiterPic from './assets/2k_jupiter.jpeg';
import { Orbit } from '../orbit';
import { Rings } from '../rings';
import { Moon } from '../moon';

export const PlanetType = {
    MARS: marsPic,
    SATURN: saturnPic,
    NEPTUNE: neptunePic,
    EARTH: earthPic,
    URANUS: uranusPic,
    JUPITER: jupiterPic,
};

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
                {props.hasMoon && (
                    <Moon
                        distanceX={props.position[0] - props.position[0] / 0.9}
                        size={props.size * 0.4}
                        position={props.position}
                    />
                )}
                {/*<pointLight color={0xffffff} intensity={0.05} position={props.position} />*/}
                {props.hasRings && <Rings position={props.position} r={props.size} />}
                <Orbit xRadius={props.xR} zRadius={props.zR} />
            </group>
        </>
    );
};
