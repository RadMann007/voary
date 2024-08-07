
export const formatDateOnly = ({ma_date}: {ma_date: string}) => {
    return ma_date.split(" ")[0];
}

export const formatHoursOnly = ({ma_date}: {ma_date: string}) => {
    return ma_date.split(" ")[1];
}