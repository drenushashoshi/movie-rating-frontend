import { variables } from '../../Variables';

interface UserCredentials {
    username: string;
    password: string;
    email: string;
}

export const mutationRegister = async (credentials: UserCredentials) => {
    try {
        const res = await fetch(variables.API_URL + 'user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials), // Convert credentials object to JSON string
        });

        if (!res.ok) {
            throw new Error('Failed to fetch');
        }

        const data = await res.json();
        console.log(data);

        return data;
    } catch (error: any) {
        console.error('Error:', error.message);
        throw error;
    }
};
export const mutationLogin = async (credentials: {username: string, password: string}) => {
    try {
        const res = await fetch(variables.API_URL + 'user/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials), // Convert credentials object to JSON string
        });

        if (!res.ok) {
            throw new Error('Unauthorized');
        }

        const data = await res.json();
        console.log(data);

        return data;
    } catch (error: any) {
        console.error('Error:', error.message);
        throw error;
    }
};
