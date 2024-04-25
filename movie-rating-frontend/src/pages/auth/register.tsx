import { useState } from 'react';
import { Grid, Header, Form, Segment, Button, Message } from 'semantic-ui-react';
import { useMutation } from '@tanstack/react-query';
import { mutationRegister } from "./mutation";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const { mutate } = useMutation({
        mutationKey: ['register'],
        mutationFn: mutationRegister,
        onError: (error:any) => {
            setError(error);
        },
    });

    const handleRegister = async () => {
        try {
            setError(null);
            await mutate({ username, password, email });
            
        } catch (error: any) {
            setError(error);
        }
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
                            required
                        />
                        <Form.Input
                            fluid
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <Message negative>{error}</Message>}
                        <Button disabled={username === "" || email === "" || password === ""} color="violet" size="large" fluid onClick={handleRegister}>
                            Register
                        </Button>
                    </Segment>
                    <p>Already signed up? <a href="/auth/Login">Login</a></p>
                </Form>
            </Grid.Column>
        </Grid>
    );
};
