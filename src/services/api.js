import axios from 'axios';

export async function getUserInfo(userId) {
    try {
        // const response = await axios.get(`/api/users/${userId}`);
        return userId;
    } catch (error) {
        throw error;
    }
}
export async function getUserInfo2(userId) {
    try {
        // const response = await axios.get(`/api/users/${userId}`);
        return userId+'asd';
    } catch (error) {
        throw error;
    }
}