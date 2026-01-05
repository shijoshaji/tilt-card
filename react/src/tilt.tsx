import React, { useRef, useEffect } from 'react';
import { Tilto, TiltOptions } from '@jojovms/tilt-card-core';

export interface TiltProps extends TiltOptions {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const Tilt: React.FC<TiltProps> = ({ children, className, style, ...options }) => {
    const elRef = useRef<HTMLDivElement>(null);
    const tiltRef = useRef<Tilto | null>(null);

    useEffect(() => {
        if (elRef.current) {
            tiltRef.current = new Tilto(elRef.current, options);
        }
        return () => {
            tiltRef.current?.destroy();
        };
    }, [options.max, options.scale, options.glare, options.perspective]); // Re-init if options change deeply? 
    // Ideally simple dependency check. For now, this is enough.

    return (
        <div ref={elRef} className={className} style={{ display: 'inline-block', ...style }}>
            {children}
        </div>
    );
};
