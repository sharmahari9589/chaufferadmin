import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import carImg from "../assets/images/chauufer.jpg"
import { useForm } from 'react-hook-form';
import { changePassword } from '../routes/apiCalls/ApiCalls';
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [loading, setLoading] = useState(false);
const {
  handleSubmit,register 
}   = useForm()
 
const navigate = useNavigate()
  // const initialValues = {
  //   email: 'jason@ui-lib.com',
  //   // password: 'dummyPass',
  //   remember: true,
  // };

const onFormSubmit = async(data) =>{
  let otp = window.location.href.split("=")[1].split("?")[0];
  let email = window.location.href.split("=")[2];
  let myData ={
    email,
    otp,
   password: data?.password,
   confirmPassword : data?.confirmPassword
  }

try {
  let res = await changePassword(myData);
  toast.success(res.data.message)
setTimeout(()=>{
  navigate("/")
},2000)
} catch (error) {
  toast.error(error.response.data.message)
}}

  return (
    <div style={{  background: 'var(--primary-color)'
}}>
  <Container className="min-vh-100 d-flex align-items-center justify-content-center" >
  <ToastContainer/>
    <Card className="w-75">
      <Row>
        <Col sm={6} xs={12}>
          <div className="p-4 h-100">
            <Image src={carImg} fluid alt="" width={200} height={200}/>
          </div>
        </Col>

        <Col sm={6} xs={12}>
          <Card.Body>
         
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                  <Form.Group controlId="newPassword">
                    <Form.Label className='text-dark'>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder='new password'
                    {...register("password")}
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword">
                    <Form.Label className='text-dark'>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder='confirm password'
                    {...register("confirmPassword")}
                    />
                  </Form.Group>

                

                 

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="mb- mt-3"
                    
                  >
                    {loading ? 'Password updating...' : 'Change Password'}
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

export default ForgotPassword;
