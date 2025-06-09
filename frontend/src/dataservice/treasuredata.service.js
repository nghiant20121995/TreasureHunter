import axios from 'axios';

class TreasureDataService {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: '',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async post(endpoint, data, config = {}) {
        try {
            const response = await this.api.post(endpoint, data, config);
            return response.data;
        } catch (error) {
            // Handle error as needed
            throw error;
        }
    }
    
    async get(endpoint, data, config = {}) {
        try {
            const response = await this.api.get(endpoint, data, config);
            return response.data;
        } catch (error) {
            // Handle error as needed
            throw error;
        }
    }
}

export default TreasureDataService;