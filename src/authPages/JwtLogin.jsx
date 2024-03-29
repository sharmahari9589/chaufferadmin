import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { NavLink,useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import carImg from "../assets/images/chauufer.jpg"
import { loginUser } from '../routes/apiCalls/ApiCalls';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// inital login credentials
const initialValues = {
  email: '',
  password: '',
  remember: true,
};

const JwtLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validateForm = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const handleFormSubmit = async (values) => {
    const errors = validateForm(values);

    if (Object.keys(errors).length > 0) {
      // Handle validation errors
      toast.error(errors.password)

      console.error('Validation errors:', errors.password);
      return;
    }

    setLoading(true);
    try {
      // Replace the following line with your login logic
      
    const res = await loginUser(values);
    if(res.data.status==true){
      toast.success(res.data.message)

      setTimeout(()=>{
      navigate("/")

      },500)

    }
    
    } catch (e) {
      toast.error(e.response.data.message)
      setLoading(false);
    }
  };

  return (





    <div style={{  background: 'var(--primary-color)'
  }}>
    <Container className="min-vh-100 d-flex align-items-center justify-content-center" >
      <Card className="w-75">
        <Row>
          <Col sm={6} xs={12}>
            <div className="p-4 h-100">
              <Image src={carImg} fluid alt="" width={200} height={200}/>
            </div>
          </Col>

          <Col sm={6} xs={12}>
            <Card.Body>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                      <Form.Label className='text-dark'>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder='email'
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={false} // No need for Yup validation
                      />
                    </Form.Group>

                    <Form.Group controlId="password">
                      <Form.Label className='text-dark'>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder='password'
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={false} // No need for Yup validation
                      />
                    </Form.Group>

                  

                    <div className="d-flex justify-content-between mb-3 mt-3">
                      <NavLink to="/email" className="text-primary">
                        Forgot password?
                      </NavLink>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      className="mb-2"
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>

                    
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
    <ToastContainer />

    </div>
  );
};

export default JwtLogin;
