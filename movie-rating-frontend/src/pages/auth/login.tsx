import { useState } from 'react';

import { Grid, Header, Form, Segment, Button, Message } from 'semantic-ui-react';
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from "./mutation";


export const Login = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn: mutationLogin,
        onError: (error:any) => {
            setError(error);
        },
    });

    const handleLogin = async () => {
        try {
            setError(null);
            await mutate({ username, password });
            
           
        } catch (error: any) {
            setError(error);
        }
        
    };
    


    return (
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="violet" textAlign="center">
                    Welcome To MOVIE RATING! Login to proceed
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
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <Message negative>{error}</Message>}
                        <Button disabled={username === "" || password === ""} color="violet" size="large" fluid onClick={handleLogin}>
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};