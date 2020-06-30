export interface ParentTrack {
    parentNodeIndex: number,
    searchedNeighbor: number[]
}

export interface SearchTrack {
    parentTrackList: ParentTrack[], 
    path: number[]
}
