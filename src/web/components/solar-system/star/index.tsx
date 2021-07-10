import React, { forwardRef } from 'react';
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

export const Star = forwardRef<unknown, StarOption>((props, ref) => {
    const texture = useLoader(TextureLoader, props.type);
    return (
        <>
            <group>
                <mesh ref={ref} position={props.position}>
                    <sphereGeometry args={[props.size, 30, 30]} attach="geometry" />
                    <meshPhongMaterial
                        map={texture}
                        bumpMap={texture}
                        bumpScale={0.001}
                        attach="material"
                    />
                </mesh>
                <pointLight color="0xFFFFFF" intensity={0.2} position={[0, 0, 0]} />
            </group>

            {/*<directionalLight*/}
            {/*    color={0xcccccc}*/}
            {/*    intensity={1}*/}
            {/*    position={props.position}*/}
            {/*    castShadow={true}*/}
            {/*    shadowCameraNear={0.01}*/}
            {/*    shadowCameraFar={15}*/}
            {/*    shadowCameraFov={45}*/}
            {/*    shadowCameraLeft={-1}*/}
            {/*    shadowCameraBottom={-1}*/}
            {/*    shadowCameraRight={1}*/}
            {/*    shadowCameraTop={1}*/}
            {/*    shadowBias={0.001}*/}
            {/*    shadowMapHeight={600 * 2}*/}
            {/*    shadowMapWidth={1024 * 2}*/}
            {/*/>*/}
        </>
    );
});
