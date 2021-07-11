import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Planet, PlanetType } from './planet';
import { Star, StarType } from './star';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import {
    tensor2d,
    scalar,
    unstack,
    sub,
    norm,
    pow,
    tensor1d,
    stack,
    tidy,
    mul,
    dispose,
} from '@tensorflow/tfjs';
import data from './force/data.json';

interface StarOption {
    type: string;
    size: number;
    position: [x: number, y: number, z: number];
}

interface PlanetOption {
    type: string;
    size: number;
    hasRings: boolean;
    hasMoon: boolean;
    position: [x: number, y: number, z: number];
}

interface SolarSystemOptions {
    stars: StarOption[];
    planets: PlanetOption[];
}

const numberOfPlanets = 10;

const xInitialArray = data.planets.map((planet) => planet.x);
const vInitialArray = data.planets.map((planet) => planet.v);
const masses = data.planets.map((planet) => planet.m);

const xInitial = tensor2d(xInitialArray, [numberOfPlanets, 3]);
const vInitial = tensor2d(vInitialArray, [numberOfPlanets, 3]);
const G = scalar(2.95912208286e-4);

const calcA = (x) => {
    const unstackedX = unstack(x);
    const accelerations = Array(numberOfPlanets).fill(tensor1d([0, 0, 0]));

    for (let i = 0; i < numberOfPlanets; i++) {
        const iX = unstackedX[i];
        for (let j = i + 1; j < numberOfPlanets; j++) {
            const jX = unstackedX[j];
            const vector = sub(jX, iX);
            const r = norm(vector);

            const force = G.mul(masses[i]).mul(masses[j]).div(pow(r, 3)).mul(vector);
            accelerations[i] = accelerations[i].add(force);
            accelerations[j] = accelerations[j].sub(force);
        }

        accelerations[i] = accelerations[i].div(masses[i]);
    }

    return stack(accelerations);
};

const SolarSystem: React.FC<SolarSystemOptions> = (props) => {
    const { camera } = useThree();
    const [pos, setPos] = useState(xInitialArray);
    const x = useRef(xInitial);
    const v = useRef(vInitial);
    const dt = 0.1;
    const dtTensor = useMemo(() => scalar(dt), [dt]);

    const compute = useCallback(() => {
        const [newX, newV] = tidy(() => {
            const a = calcA(x.current);
            const newX = x.current.add(mul(v.current, dtTensor));
            const newV = v.current.add(mul(a, dtTensor));

            return [newX, newV];
        });

        dispose([x.current, v.current]);
        //@ts-ignore
        x.current = newX;
        //@ts-ignore
        v.current = newV;

        newX.array().then((newPos) => {
            //@ts-ignore
            //console.log('newPos', newPos);
            //@ts-ignore
            setPos(newPos);
        });
    }, [x, v, dtTensor]);
    useEffect(() => {
        requestAnimationFrame(() => {
            compute();
        });
    }, [pos, compute]);

    return (
        <>
            <group>
                <OrbitControls args={[camera]} />
                <ambientLight color={0x888888} intensity={0.7} />
                <pointLight intensity={0.8} />
                {props.stars.map((starProps, index) => {
                    return (
                        <Star
                            key={`star-${index}`}
                            //@ts-ignore
                            position={pos[index]}
                            type={starProps.type}
                            size={0.2}
                        />
                    );
                })}
                {props.planets.map((planetProps, index) => {
                    return (
                        <Planet
                            xR={(index + 1.5) * 4}
                            zR={(index + 1.5) * 2}
                            key={`planet-${index}`}
                            //@ts-ignore
                            position={pos[index + 1]}
                            type={planetProps.type}
                            size={data.planets[index + 1].r * 800}
                            hasRings={planetProps?.hasRings || false}
                            hasMoon={planetProps?.hasMoon || false}
                        />
                    );
                })}
            </group>
        </>
    );
};

export { PlanetType, StarType, SolarSystem };
