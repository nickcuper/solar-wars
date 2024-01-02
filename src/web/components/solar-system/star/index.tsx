import React, { useEffect, useMemo, useRef } from 'react';
import { Mesh, TextureLoader, Vector2 } from 'three';
import { UnrealBloomPass, ShaderPass, EffectComposer, RenderPass } from 'three-stdlib';
import { useFrame, useLoader, useThree, extend } from '@react-three/fiber';
import sunPic from './assets/2k_sun.jpeg';
import blueGiantPic from './assets/blue_gas_giant.png';
import gasGiantPic from './assets/gas_giant.png';

extend({ UnrealBloomPass, EffectComposer, ShaderPass, RenderPass });

export const StarType = {
    SUN: sunPic,
    BLUE_GIANT: blueGiantPic,
    GAS_GIANT: gasGiantPic,
};

//@ts-ignore
const Effect: React.FC = () => {
    const composer = useRef<EffectComposer>();
    const { gl, size, camera, scene } = useThree();
    const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
    //@ts-ignore
    useEffect(() => composer.current.setSize(size.width, size.height), [size]);
    //@ts-ignore
    useFrame(() => {
        composer.current.render();
    }, 1);
    console.log('Effect');
    return (
        <>
            <effectComposer ref={composer} args={[gl]} renderToScreen={true}>
                <renderPass attachArray="passes" args={[scene, camera]} />
                {/*@ts-ignore*/}
                <unrealBloomPass
                    attachArray="passes"
                    resolution={aspect}
                    threshold={0.5}
                    strength={1}
                    radius={0.1}
                />
            </effectComposer>
        </>
    );
};

export const Star: React.FC<StarOption> = (props) => {
    const ref = useRef<Mesh>();
    const texture = useLoader(TextureLoader, props.type);
    console.log('Star');
    return (
        <>
            <mesh ref={ref} position={props.position}>
                <sphereGeometry args={[props.size, 30, 30]} attach="geometry" />
                <meshBasicMaterial
                    map={texture}
                    wireframe={false}
                    // bumpScale={0.001}
                    attach="material"
                />
            </mesh>
            <Effect />
            <pointLight color="0xFFFFFF" intensity={0.2} position={[0, 0, 0]} />
        </>
    );
};
