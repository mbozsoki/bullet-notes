import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'firebase/auth';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import { default as fb } from 'firebase';
import {
    Logo,
    PrimaryButton,
    SecondaryButton,
    StyledForm,
    StyledInput,
    StyledLabel,
    StyledParagraph,
    StyledPasswordIcon,
    StyledPasswordInput,
} from '../../components/common-styles';
import { StyledBox, StyledLine, StyledWrapper } from './style';

export const Login = () => {
    const firebase = useFirebaseApp();
    const googleProvider = new fb.auth.GoogleAuthProvider();
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
        error: '',
    });

    const history = useHistory();
    const navigateToApp = () => history.push('/');

    const signInWithEmail = (event: any) => {
        event.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((result: any) => {
                // if (!result.user.emailVerified) {
                //     setUser({
                //         ...user,
                //         error: 'Please verify your email before you log in',
                //     });
                //     firebase.auth().signOut();
                //     return;
                // }

                navigateToApp();
            })
            .catch((error) => {
                console.error(error);
                setUser({
                    ...user,
                    error: error.message,
                });
            });
    };

    const signInWithGoogle = (event: any) => {
        event.preventDefault();
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((result: any) => {
                navigateToApp();
            })
            .catch((error) => {
                console.error(error);
                setUser({
                    ...user,
                    error: error.message,
                });
            });
    };

    return (
        <StyledWrapper>
            <StyledBox>
                <Logo>BulletNotes</Logo>
                <StyledForm>
                    <SecondaryButton
                        type="button"
                        className="full-width"
                        onClick={signInWithGoogle}
                    >
                        Log in with Google
                    </SecondaryButton>
                    <StyledParagraph className="not-important">
                        <svg width="100%" height="10px">
                            <StyledLine x1="0" x2="100%" y1="5" y2="5"></StyledLine>
                        </svg>
                        <span>OR</span>
                        <svg width="100%" height="10px">
                            <StyledLine x1="0" x2="100%" y1="5" y2="5"></StyledLine>
                        </svg>
                    </StyledParagraph>
                    <div>
                        <StyledLabel>E-mail</StyledLabel>
                        <StyledInput
                            required
                            placeholder="E-mail"
                            onChange={(event: any) => {
                                setUser({
                                    ...user,
                                    email: event?.target.value,
                                });
                            }}
                        />
                    </div>
                    <div>
                        <StyledLabel>Password</StyledLabel>
                        <StyledPasswordInput>
                            <StyledInput
                                required
                                pattern=".{8,}"
                                placeholder="Password"
                                type={passwordVisible ? 'text' : 'password'}
                                onChange={(event: any) => {
                                    setUser({
                                        ...user,
                                        password: event?.target.value,
                                    });
                                }}
                            />
                            <StyledPasswordIcon
                                className="icon"
                                icon={passwordVisible ? faEyeSlash : faEye}
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            />
                        </StyledPasswordInput>
                    </div>
                    <StyledParagraph>{user?.error}</StyledParagraph>
                    <PrimaryButton
                        className="full-width"
                        onClick={(event: any) => signInWithEmail(event)}
                    >
                        Log in
                    </PrimaryButton>
                </StyledForm>
                <StyledParagraph>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <SecondaryButton small={true}>Create</SecondaryButton>
                    </Link>
                </StyledParagraph>
            </StyledBox>
        </StyledWrapper>
    );
};

export default Login;
