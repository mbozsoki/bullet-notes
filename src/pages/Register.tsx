import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { default as fb } from 'firebase';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDatabase, useFirebaseApp } from 'reactfire';
import styled from 'styled-components';
import {
    Logo,
    PrimaryButton,
    SecondaryButton,
    StyledForm,
    StyledInput,
    StyledLabel,
    StyledParagraph,
    StyledPasswordIcon,
    StyledPasswordInput
} from '../components/styledComponents';

const StyledWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 32px;
`;

const StyledBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    row-gap: 32px;
`;

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    error: string;
}

function Register() {
    const firebase = useFirebaseApp();
    const database = useDatabase(firebase);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
    });

    const history = useHistory();
    const navigateToApp = () => history.push('/');

    const saveUserToDatabase = (userData: UserData, uid: string) => {
        database.ref('users').child(uid).set({
            email: userData.email,
            firstName: userData.firstName,
        });
    };

    const signUp = async (event: any) => {
        event.preventDefault();
        await firebase
            .auth()
            .createUserWithEmailAndPassword(userData.email, userData.password)
            .then((result: fb.auth.UserCredential) => {
                if (!result.user) {
                    console.error('Could not find user');
                    return;
                }

                result.user.updateProfile({
                    displayName: `${userData.firstName} ${userData.lastName}`,
                });
                saveUserToDatabase(userData, result.user.uid);
                navigateToApp();
            })
            .catch((error) => {
                console.log(error);
                setUserData({
                    ...userData,
                    error: error.message,
                });
            });
    };

    return (
        <StyledWrapper>
            <StyledBox>
                <Logo>BulletNotes</Logo>
                <StyledForm onSubmit={signUp}>
                    <div>
                        <StyledLabel>First name</StyledLabel>
                        <StyledInput
                            required
                            placeholder="First name"
                            onChange={(event: any) => {
                                setUserData({ ...userData, firstName: event.target.value });
                            }}
                        />
                    </div>
                    <div>
                        <StyledLabel>Last name</StyledLabel>
                        <StyledInput
                            required
                            placeholder="Last name"
                            onChange={(event: any) => {
                                setUserData({ ...userData, lastName: event.target.value });
                            }}
                        />
                    </div>
                    <div>
                        <StyledLabel>E-mail</StyledLabel>
                        <StyledInput
                            required
                            placeholder="E-mail"
                            onChange={(event: any) => {
                                setUserData({ ...userData, email: event.target.value });
                            }}
                        />
                    </div>
                    <div>
                        <StyledLabel>Password (min. 8 character)</StyledLabel>
                        <StyledPasswordInput>
                            <StyledInput
                                required
                                pattern=".{8,}"
                                placeholder="Password"
                                type={passwordVisible ? 'text' : 'password'}
                                onChange={(event: any) => {
                                    setUserData({ ...userData, password: event.target.value });
                                }}
                            />
                            <StyledPasswordIcon
                                className="icon"
                                icon={passwordVisible ? faEyeSlash : faEye}
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            />
                        </StyledPasswordInput>
                    </div>
                    <PrimaryButton>Register</PrimaryButton>
                    <StyledParagraph>
                        <span>Already have an account?</span>
                        <Link to="/login">
                            <SecondaryButton small={true}>Log in</SecondaryButton>
                        </Link>
                    </StyledParagraph>
                </StyledForm>
            </StyledBox>
        </StyledWrapper>
    );
}

export default Register;
