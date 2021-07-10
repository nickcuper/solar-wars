import React, { useRef } from 'react';
import { Html, useProgress } from '@react-three/drei';

export const Loader: React.FC = () => {
    const { progress } = useProgress();
    const ref = useRef();
    return (
        <Html ref={ref} center>
            {progress} % loaded
        </Html>
    );
};
