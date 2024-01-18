import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, logIn } from "../../../../redux/userAuth";

const LoginForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const { email: storedEmail, password: storedPassword } = useSelector(state => state.authUser.user);

  const storedEmail = "test@example.com";
  const storedPassword = "password";
  const handleSubmit = (values, { setSubmitting }) => {
    const { email, password } = values;

    if (email === storedEmail && password === storedPassword) {
      dispatch(updateUser({ name: "Test User", email, password }));
      dispatch(logIn());
      navigate("/"); // Перенаправление на главную страницу
    } else {
      console.error("Неправильные данные для входа");
    }

    setSubmitting(false);
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      <Form>
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

        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
