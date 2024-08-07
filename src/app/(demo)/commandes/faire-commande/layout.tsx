import React, { Suspense } from 'react';

function LayoutPageCommande({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense fallback={<div>...Chargement</div>}>
            {children}
        </Suspense>
    );
}

export default LayoutPageCommande;