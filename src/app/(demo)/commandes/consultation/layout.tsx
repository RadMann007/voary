import React, { Suspense } from 'react';

function LayoutPageConsultation({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense fallback={<div>...Chargement</div>}>
            {children}
        </Suspense>
    );
}

export default LayoutPageConsultation;