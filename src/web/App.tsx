import React, { Suspense } from 'react';
import { Universe } from './components/universe';
import { SolarSystem, PlanetType, StarType } from './components/solar-system';
import { Canvas } from '@react-three/fiber';
import { TrackballControls } from '@react-three/drei';

export const App: React.FC = () => {
    const stars = [];
    const planets = [];
    stars.push({ type: StarType.SUN, position: [0, 0, 0] });
    planets.push({ type: PlanetType.NEPTUNE, position: [60, 0, 0] });
    planets.push({ type: PlanetType.SATURN, position: [40, 0, 0] });
    planets.push({ type: PlanetType.MARS, position: [20, 0, 5] });
    planets.push({ type: PlanetType.EARTH, position: [30, 0, 5], hasMoon: true });
    planets.push({ type: PlanetType.URANUS, position: [100, 0, 0] });
    planets.push({ type: PlanetType.JUPITER, position: [80, 0, 0], hasRings: true });
    console.log('App');
    return (
        <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: false }}
            camera={{
                position: [10, 0, 0],
                isPerspectiveCamera: true,
                near: 0.1,
                far: 1000,
                aspect: window.innerWidth / window.innerHeight,
            }}
            // onCreated={({ gl }) => {
            //     //   gl.setPixelRatio(1);
            //     //gl.setSize(window.innerWidth, window.innerHeight);
            // }}
        >
            <TrackballControls />
            <Suspense fallback={null}>
                <Universe>
                    <SolarSystem planets={planets} stars={stars} />
                </Universe>
            </Suspense>
        </Canvas>
    );
};
