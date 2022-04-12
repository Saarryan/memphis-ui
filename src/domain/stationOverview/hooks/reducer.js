const Reducer = (stationState, action) => {
    switch (action.type) {
        case 'SET_STATION_DATA':
            return {
                ...stationState,
                station: action.payload
            };
        default:
            return stationState;
    }
};

export default Reducer;
