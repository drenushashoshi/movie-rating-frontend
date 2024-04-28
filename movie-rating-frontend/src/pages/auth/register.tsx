import { useState } from 'react';
import { Grid, Header, Form, Segment, Button, Message } from 'semantic-ui-react';
import { useMutation } from '@tanstack/react-query';
import { mutationRegister } from "./mutation";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const { mutate } = useMutation({
        mutationKey: ['register'],
        mutationFn: mutationRegister,
        onError: (error: any) => {
            if (error.message === 'Username already taken') {
                setUsernameError(error.message);
            }else if(error.message === 'Username is required'){
                setUsernameError(error.message);
            } 
            else{
                setUsernameError(null);
                setEmailError(null);
                setPasswordError('An unexpected error occurred. Please try again later.');
            }
        },
    });

    const handleRegister = async () => {
        try {
            setUsernameError(null);
            setEmailError(null);
            setPasswordError(null);
            
            if (!validateUsername(username)) {
                setUsernameError('Username is required');
                return;
            }
            
            if (!validateEmail(email)) {
                setEmailError('Please enter a valid email address');
                return;
            }

            if (!validatePassword(password)) {
                setPasswordError('Password must be at least 6 characters long');
                return;
            }

            await mutate({ username, password, email });
        } catch (error) {
            console.error('Error during registration:', error);
                setUsernameError('An unexpected error occurred. Please try again later.');
                setEmailError(null);
                setPasswordError(null);
        }
    };

    const validateUsername = (username: string): boolean => {
        return !!username;
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        return password.length >= 6;
    };

    return (
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="violet" textAlign="center">
                    Welcome To MOVIE RATING! Register to proceed
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={!!usernameError}
                            required
                        />
                        {usernameError && <Message negative>{usernameError}</Message>}
                        <Form.Input
                            fluid
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            required
                        />
                        {emailError && <Message negative>{emailError}</Message>}
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            required
                        />
                        {passwordError && <Message negative>{passwordError}</Message>}
                        <Button
                            disabled={username === "" || email === "" || password === ""}
                            color="violet"
                            size="large"
                            fluid
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </Segment>
                    <p>Already signed up? <a href="/auth/Login">Login</a></p>
                </Form>
            </Grid.Column>
        </Grid>
    );
};
