"use client"

import React, { Suspense } from 'react';

function LayoutPageDetailFacture({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense fallback={<div>...Chargement</div>}>
            {children}
        </Suspense>
    );
}

export default LayoutPageDetailFacture;