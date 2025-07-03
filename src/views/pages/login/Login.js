import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner // Import CSpinner
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { login } from '../../../apis/Auth';

// Schema xác thực sử dụng yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Username phải có ít nhất 6 ký tự') // Corrected to match the validation message
    .required('Bắt buộc nhập Username'),
  password: Yup.string()
    .min(4, 'Password phải có ít nhất 4 ký tự')
    .required('Bắt buộc nhập Password'),
});
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const Login = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [isLoading, setIsLoading] = useState(false); // State theo dõi trạng thái loading

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={{ username: 'admin', password: 'admin' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                      setIsLoading(true); // Start loading
                      await sleep(2000); // Simulate 2s delay to test indicator
                      try {
                        const response = await login(values.username, values.password);
                        if (response.status === 200) {
                          console.log(response.data.message);
                          localStorage.setItem('token', response.data.token);
                          navigate('/'); // Redirect to the home page
                        }
                      } catch (error) {
                        setErrors({ api: error.message });
                        console.error('Login error:', error);
                      } finally {
                        setIsLoading(false); // Kết thúc loading
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({ handleSubmit, isSubmitting }) => (
                      <Form onSubmit={handleSubmit}>
                        <h1>Đăng nhập</h1>
                        <p className="text-body-secondary">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <Field
                            name="username"
                            placeholder="Username"
                            autoComplete="username"
                            className="form-control"
                          />
                        </CInputGroup>
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-danger mb-3"
                        />
                        
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            className="form-control"
                          />
                        </CInputGroup>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger mb-3"
                        />
                        
                        {/* Hiển thị thông báo lỗi từ API */}
                        <ErrorMessage
                          name="api"
                          component="div"
                          className="text-danger mb-3"
                        />

                        <CRow>
                          <CCol className="d-flex justify-content-center">
                            <CButton type="submit" color="primary" className="px-4" disabled={isSubmitting || isLoading}>
                              {isLoading ? <CSpinner size="sm" color="light" /> : 'Login'}
                            </CButton>
                          </CCol>
                        </CRow>
                      </Form>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Login;
