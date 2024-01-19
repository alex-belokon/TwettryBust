
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from '../../../../redux/slice'; // Путь до вашего userSlice

const FormikRegistration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values);
        dispatch(saveUserData(values));
        setSubmitting(false);
        resetForm();
        navigate('/'); // Перенаправление на главную страницу
      };

  return (
    <Formik
      initialValues={{ 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '' }}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <div>
            <label>Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <label> Confirm Password:</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikRegistration;