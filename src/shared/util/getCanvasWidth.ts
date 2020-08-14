export const getCanvasWidth = () => {
    let canvasWidth: number = 0;
    if (window.innerWidth < 1300) canvasWidth = window.innerWidth * 1 / 3;
    else if (window.innerWidth < 1500) canvasWidth = window.innerWidth * 1.23 / 3;
    else if (window.innerWidth < 1700) canvasWidth = window.innerWidth * 1.45 / 3;
    else if (window.innerWidth < 2000) canvasWidth = window.innerWidth * 1.75 / 3;
    else if (window.innerWidth < 2500) canvasWidth = window.innerWidth * 2 / 3;
    else canvasWidth = window.innerWidth * 1 / 3;

    return canvasWidth;
}