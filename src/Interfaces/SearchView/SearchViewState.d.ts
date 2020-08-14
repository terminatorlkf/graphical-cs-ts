export interface SearchViewState {
    canvasSize: { canvasWidth: number, canvasHeight: number },
    track: number[][],
    index: number,
    pathFound: boolean,
    noPathFound: boolean
}