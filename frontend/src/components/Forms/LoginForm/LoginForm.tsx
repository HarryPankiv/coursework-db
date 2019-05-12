import React from 'react'
import { Formik, Field, Form, FormikProps } from 'formik'

const LoginForm = () => {
    const handleSubmit = ( values: any, actions: any) => {
        console.log(values, actions)
        // api call
    }

    return (
        <div>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{ email: '', password: '' }}
                // validationSchema={ValidationSchema}
                // validateOnBlur={true}
            >
                {(props: FormikProps<{email: string, password: string}>) => {
                    const {
                        handleChange,
                        values,
                        errors,
                        handleBlur,
                        touched,
                        isSubmitting,
                        setFieldValue,
                        setFieldError
                    } = props;
                    const { email, password } = values;

                    return (
                        <Form>
                            <input
                                value={email}
                                type="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                            />
                            <input
                                name="password"
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={password}
                            />
                            <button type="submit">Submit</button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )

}

export default LoginForm;