export const formatMontant = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MGA',
      minimumFractionDigits: 2
    }).format(value).replace('MGA', 'Ar');
  };