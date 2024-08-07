"use client"

import React, { Suspense } from 'react';

function LayoutPageStockEntree({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense fallback={<div>Chargement des stocks...</div>}>
            {children}
        </Suspense>
    );
}

export default LayoutPageStockEntree;