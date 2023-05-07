const importImage = (dir: string) => import(`/src/${dir}`);

export default importImage;

const changeImage = async (imageRef: React.RefObject<HTMLImageElement>, imageSrc: string): Promise<void> => {
    const module = await importImage(imageSrc);

    if (imageRef.current && module.default) imageRef.current.src = module.default;
}

const random = (min: number = 0, max: number = 1): number => Math.floor(Math.random() * (max - min + 1)) + min

const usedNumbers: number[] = [1, 2, 3, 4, 5, 6];
const getId = (): number => {
    const lastItem = usedNumbers[usedNumbers.length - 1];
    usedNumbers.push(lastItem + 1);
    return usedNumbers[usedNumbers.length - 1];
}

const getPassedTimeSince = (msTime: number): { month: number, day: number, hour: number, minute: number } => {
    const passedMiliSeconds = new Date().getTime() - msTime;

    const secondMS = 1000;
    const minuteMS = secondMS * 60;
    const hourMS = minuteMS * 60;
    const dayMS = hourMS * 24;
    const monthMS = dayMS * 30.4167;

    const month = Math.floor(passedMiliSeconds / monthMS);
    const day = Math.floor((passedMiliSeconds % monthMS) / dayMS);
    const hour = Math.floor((passedMiliSeconds % dayMS) / hourMS);
    const minute = Math.floor((passedMiliSeconds % hourMS) / minuteMS);

    return {
        month, day, hour, minute
    }
}

export { changeImage, random, getId, getPassedTimeSince };