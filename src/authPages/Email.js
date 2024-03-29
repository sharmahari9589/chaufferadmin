import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import carImg from "../assets/images/chauufer.jpg"
import { useForm } from 'react-hook-form';
import { forgetPassword } from '../routes/apiCalls/ApiCalls';
import { toast, ToastContainer } from "react-toastify";

const Email = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
try {
    let res = await forgetPassword(data);
toast.success(res.data.message);
navigate(`/otp?email=${res.data.email}`)
} catch (error) {
    toast.error(error.response.data.message)
}
  };

  const initialValues = {
    email: 'jason@ui-lib.com',
    // password: 'dummyPass',
    remember: true,
  };

  return (
    <div style={{  background: 'var(--primary-color)'
}}>
    <ToastContainer/>
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
         
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="newPassword">
                    <Form.Label className='text-dark'>Eamail</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder='Enter email'
                    {...register("email")}
                      isInvalid={false} 
                    />
                  </Form.Group>

                

                

                 

                  <Button
                    type="submit"
                    variant="primary"
                    // disabled={loading}
                    className="mb- mt-3"
                    
                  >
                    Generate OTP
                  </Button>


                </Form>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  </Container>
  </div>
  );
};

export default Email;
