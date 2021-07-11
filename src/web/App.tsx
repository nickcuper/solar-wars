import React, { Suspense } from 'react';
import { Universe } from './components/universe';
import { SolarSystem, PlanetType, StarType } from './components/solar-system';
import { Canvas } from '@react-three/fiber';

export const App: React.FC = () => {
    const stars = [];
    const planets = [];
    stars.push({ type: StarType.SUN, position: [0, 0, 10] });
    planets.push({ type: PlanetType.NEPTUNE, position: [10, 0, 0] });
    planets.push({ type: PlanetType.SATURN, position: [2, 0, 5], hasRings: true });
    planets.push({ type: PlanetType.MARS, position: [8, 0, 5] });
    planets.push({ type: PlanetType.EARTH, position: [6, 0, 5], hasMoon: true });

    return (
        <Canvas
            linear
            mode="concurrent"
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
            camera={{ position: [10, 0, 0] }}
        >
            <Suspense fallback={null}>
                <Universe>
                    <SolarSystem planets={planets} stars={stars} />
                </Universe>
            </Suspense>
        </Canvas>
    );
};
