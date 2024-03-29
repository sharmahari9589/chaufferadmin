import React, { useState } from 'react';
import { Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import carImg from "../assets/images/chauufer.jpg";
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from "react-toastify";
import { verifyOtp } from '../routes/apiCalls/ApiCalls';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit: reactHookFormHandleSubmit, // Rename to avoid conflict
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const handleFormSubmit =async () => {

    const otpString = otp.join('');
      const otpNumber = parseInt(otpString, 10); // 10 is the radix/base for decimal numbers
       let email = window.location.href.split("=")[1];
       let res = await verifyOtp({otpNumber,email})
toast.success(res.data.message)    
    
if(res.data.message=="otp matched"){
  navigate(`/forgot-password?otp=${otpNumber}?email=${email}`)
}
    
};

// Call the function


  const handleResendOTP = () => {
    // Add logic for resending OTP
  };

  const initialValues = {
    // Your initial values here, if needed
  };

  return (
    <div style={{ background: 'var(--primary-color)' }}>
      <ToastContainer/>
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <Card className="w-75">
          <Row>
            <Col sm={6} xs={12}>
              <div className="p-4 h-100">
                <Image src={carImg} fluid alt="" width={200} height={200} />
              </div>
            </Col>

            <Col sm={6} xs={12}>
              <Card.Body>
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row className="mb-3">
                        <Form.Label className='text-dark'>Verify Otp</Form.Label>

                        {otp.map((digit, index) => (
                          <Col key={index} xs={3} className='mt-5'>
                            <Form.Control
                               type="text"
                               pattern="[0-9]*"
                              name={`otp${index}`}
                              maxLength="1"
                              value={digit}
                              onChange={(e) => {
                                const newOtp = [...otp];
                                newOtp[index] = e.target.value;
                                setOtp(newOtp); 
                              }}
                              
                            />
                          </Col>
                        ))}
                      </Row>

                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        className="mt-5"
                      >
                        {loading ? 'Verifying OTP...' : 'Verify OTP'}
                      </Button>

                      <Button
                        variant="secondary" className='mt-5' style={{marginLeft:10}}
                        onClick={handleResendOTP}
                        disabled={loading}
                      >
                        Resend OTP
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default Otp;
