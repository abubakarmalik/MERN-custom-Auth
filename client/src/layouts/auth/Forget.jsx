import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetMessages, forgetAccount } from '../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shape from '../../components/Shape';

const ErrorMessage = ({ touched, error }) => {
  return touched && error ? (
    <span className='text-red-500 font-medium inline px-1'>{error}</span>
  ) : null;
};

const Forget = () => {
  const forgetState = useSelector((state) => state.authReducer.forgetAccount);
  const errorState = useSelector((state) => state.authReducer.errorMessage);
  const [isLoading, setIsloading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let successMessage = '';
  let errorMessage = '';

  useEffect(() => {
    let timeoutId;

    if (forgetState?.message || null !== null) {
      if (isLoading) {
        successMessage = forgetState.message;
        timeoutId = setTimeout(() => {
          setIsloading(false);
          notifySuccess(successMessage);
          setTimeout(() => {
            dispatch(resetMessages());
            navigate('/verify');
          }, 2000);
        }, 2000);
      }
    } else if (errorState?.message || null !== null) {
      if (isLoading) {
        errorMessage = errorState.message;
        timeoutId = setTimeout(() => {
          setIsloading(false);
          notifyError(errorMessage);
        }, 2000);
      }
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [forgetState, errorState]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const { email } = values;
      setIsloading(true);
      dispatch(forgetAccount(email));
      setTimeout(() => {
        resetForm();
      }, 2000);
    },
  });

  const notifySuccess = (message) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Shape />
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-10 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Forget Password
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  placeholder='Email'
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className='block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  focus:outline-none'
                />
              </div>
              <ErrorMessage
                touched={formik.touched.email}
                error={formik.errors.email}
              />
            </div>

            <div>
              {isLoading ? (
                <button
                  disabled
                  type='button'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  <svg
                    aria-hidden='true'
                    role='status'
                    className='inline w-4 h-4 me-3 text-white animate-spin'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='#E5E7EB'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentColor'
                    />
                  </svg>
                  Loading...
                </button>
              ) : (
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Forget
                </button>
              )}
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account?
            <Link
              to='/signin'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mx-1'
            >
              Signin
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Forget;
