import React from 'react';
import { BufferGeometry, Vector3 } from 'three';

interface OrbitProps {
    xRadius: number;
    zRadius: number;
}

export const Orbit: React.FC<OrbitProps> = (props) => {
    const vPoints: Vector3[] = [];
    for (let index = 0; index < 64; index++) {
        const angle = (index / 64) * 2 * Math.PI;
        const x = props.xRadius * Math.cos(angle);
        const z = props.zRadius * Math.sin(angle);
        vPoints.push(new Vector3(x, 0, z));
    }

    vPoints.push(vPoints[0]);
    const lineGeometry = new BufferGeometry().setFromPoints(vPoints);
    return (
        <lineLoop rotation={[Math.PI / 2, 0, 0]} geometry={lineGeometry}>
            <lineBasicMaterial attach="material" color="#fffff" linewidth={1} />
        </lineLoop>
    );
};
