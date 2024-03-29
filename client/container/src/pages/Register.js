import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';
import {register} from '../services/LoginService';

const Register = () => {
    const navigate = useNavigate();

    const signup = async (formik_values) => {
        var resp= await register(formik_values);
        if(resp.success){
            navigate("/login");
        }
    }
    return (
        <>
            <Helmet>
                <title>Register | Material Kit</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                            email: '',
                            name: '',
                            username: '',
                            password: '',
                            policy: false
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email('Must be a valid email')
                                .max(255)
                                .required('Email is required'),
                            name: Yup.string().max(255).required('name is required'),
                            username: Yup.string().max(255).required('username is required'),
                            password: Yup.string().max(255).required('password is required'),
                            policy: Yup.boolean().oneOf([true], 'This field must be checked')
                        })}
                        onSubmit={(values, formikHelpers) => {
                            signup(values);
                        }}
                    >
                        {({
                              errors,
                              handleBlur,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              touched,
                              values
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <Box sx={{mb: 3}}>
                                    <Typography color="textPrimary" variant="h2">
                                        Create new account
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom variant="body2">
                                        Use your email to create new account
                                    </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(touched.name && errors.name)}
                                    fullWidth
                                    helperText={touched.name && errors.name}
                                    label="Name"
                                    margin="normal"
                                    name="name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.username && errors.username)}
                                    fullWidth
                                    helperText={touched.username && errors.username}
                                    label="Username"
                                    margin="normal"
                                    name="username"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.username}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.email && errors.email)}
                                    fullWidth
                                    helperText={touched.email && errors.email}
                                    label="Email Address"
                                    margin="normal"
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="email"
                                    value={values.email}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.password && errors.password)}
                                    fullWidth
                                    helperText={touched.password && errors.password}
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="password"
                                    value={values.password}
                                    variant="outlined"
                                />
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        ml: -1
                                    }}
                                >
                                    <Checkbox checked={values.policy} name="policy" onChange={handleChange}/>
                                    <Typography color="textSecondary" variant="body1">
                                        I have read the{' '}
                                        <Link
                                            color="primary"
                                            component={RouterLink}
                                            to="#"
                                            underline="always"
                                            variant="h6"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </Typography>
                                </Box>
                                {Boolean(touched.policy && errors.policy) && (
                                    <FormHelperText error>{errors.policy}</FormHelperText>
                                )}
                                <Box sx={{py: 2}}>
                                    <Button
                                        color="primary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Sign up now
                                    </Button>
                                </Box>
                                <Typography color="textSecondary" variant="body1">
                                    Have an account?{' '}
                                    <Link component={RouterLink} to="/login" variant="h6" underline="hover">
                                        Sign in
                                    </Link>
                                </Typography>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </>
    );
};

export default Register;
