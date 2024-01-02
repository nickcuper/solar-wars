interface PlanetOption {
    type: string;
    size: number;
    hasRings?: boolean;
    hasMoon?: boolean;
    position: [x: number, y: number, z: number];
    xR: number;
    zR: number;
}

interface StarOption {
    type: string;
    size: number;
    position: [x: number, y: number, z: number];
}
