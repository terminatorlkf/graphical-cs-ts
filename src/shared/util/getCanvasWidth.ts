export const getCanvasWidth = () => {
    let newCanvasWidth: number = 0;
    if (window.innerWidth < 1700) newCanvasWidth = window.innerWidth * 1.2 / 3;
    else if (window.innerWidth < 2000) newCanvasWidth = window.innerWidth * 1.75 / 3;
    else if (window.innerWidth < 2500) newCanvasWidth = window.innerWidth * 2 / 3;
    else newCanvasWidth = window.innerWidth * 1 / 3;

    return newCanvasWidth;
}