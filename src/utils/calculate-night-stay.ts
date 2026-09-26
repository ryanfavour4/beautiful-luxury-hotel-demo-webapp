export const calculateNights = (checkIn: Date, checkOut: Date) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / ONE_DAY);
}
