import React from 'react';
import { DoubleSide, RingBufferGeometry, TextureLoader, Vector3 } from 'three';
import { useLoader } from '@react-three/fiber';
import ringImg from './assets/1.png';

interface RingOption {
    position: [x: number, y: number, z: number];
    r: number;
}
export const Rings: React.FC<RingOption> = (props) => {
    const texture = useLoader(TextureLoader, ringImg);

    const innerRadius = props.r * 1.5;
    const outerRadius = props.r * 2.5;
    const vectorPositionXMaxRange = (innerRadius + outerRadius) / 2;
    const geometry = new RingBufferGeometry(innerRadius, outerRadius, 64);
    const position = geometry.attributes.position;
    const vector3 = new Vector3();

    for (let i = 0; i < position.count; i++) {
        vector3.fromBufferAttribute(position, i);
        geometry.attributes.uv.setXY(i, vector3.length() < vectorPositionXMaxRange ? 0 : 1, 1);
    }

    return (
        <>
            <mesh
                castShadow={true}
                receiveShadow={true}
                position={props.position}
                geometry={geometry}
            >
                <meshBasicMaterial
                    transparent={true}
                    color={0xffffff}
                    attach="material"
                    side={DoubleSide}
                    map={texture}
                />
            </mesh>
        </>
    );
};
