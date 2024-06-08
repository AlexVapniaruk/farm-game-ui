interface API_URL {
    [key: string]: string;
}

const baseUrl = import.meta.env.BASE_URL;
// Create the object and assign the type
const apiUrls: API_URL = {
    CREATE_ROOM: (playerId) => `${baseUrl}create-room/${playerId}`,
    JOIN_ROOM: (roomId, playerId) => `${baseUrl}join-room/${roomId}/${playerId}`,
    GET_ROOM: (roomId) => `${baseUrl}rooms/${roomId}`
};

export default apiUrls;