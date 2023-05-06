const importImage = (dir: string) => import(`/src/${dir}`);

export default importImage;

const changeImage = async (imageRef: React.RefObject<HTMLImageElement>, imageSrc: string) => {
    const module = await importImage(imageSrc);

    if (imageRef.current && module.default) imageRef.current.src = module.default;
}

export { changeImage };