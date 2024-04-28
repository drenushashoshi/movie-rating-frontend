import { variables } from '../../Variables';

interface UserCredentials {
    username: string;
    password: string;
    email: string;
}

interface ErrorMessages {
    [key: string]: string;
}

const ERROR_MESSAGES: ErrorMessages = {
    CONFLICT: 'Username already taken',
    GENERIC: 'Failed to fetch',
};

export const mutationRegister = async (credentials: UserCredentials) => {
    try {
        const res = await fetch(variables.API_URL + 'users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        });

        if (!res.ok) {
            let errorMessage = ERROR_MESSAGES.GENERIC;
            if (res.status === 409) {
                errorMessage = ERROR_MESSAGES.CONFLICT;
            }

            // Check if response body exists and is in JSON format
            if (res.headers.get('content-type')?.includes('application/json')) {
                const errorData = await res.json();
                errorMessage = errorData.error || errorMessage;
            }

            throw new Error(errorMessage);
        }

        const data = await res.json();
        console.log(data);
        window.location.href = "/auth/Login";

        return data;
    } catch (error: any) {
        console.error('Error:', error.message);
        throw error;
    }
};


export const mutationLogin = async (credentials: {username: string, password: string}) => {
    try {
        const res = await fetch(variables.API_URL + 'users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials), // Convert credentials object to JSON string
        });
        const token = await res.text();
        localStorage.setItem('token', token);
        console.log("logged in successfully");
        window.location.href = '/Home';

        
        
        
        
    } catch (error: any) {
        console.error('Error:', error.message);
        throw error;
    }
};
