import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  colour: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const ValidationSchemaExample = () => {
  const [rangeValue, setRangeValue] = useState(40000);
  return (
    <div className={'sample-form'}>
        <Formik
        initialValues={{
            name: '',
            email: '',
            dob: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
            // same shape as initial values
            console.log(values);
        }}
        >
        {({ errors, touched }) => (
          <Form className={'sample-form'}>
            <div>
              <h2>Name</h2>
              <Field name="name" />
              {errors.name && touched.name ? (
                <div>{errors.name}</div>
              ) : null}
            </div>

            <div> 
              <h2>Email</h2>
              <Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>

            <div> 
              <h2>Date of birth</h2>
              <Field name="dob" type="date" />
            </div>

            <div> 
              <h2>Favourite colour</h2>
              <Field name="colour" />
              {errors.colour && touched.colour ? <div>{errors.colour}</div> : null}
            </div>
            
            <div>
              <h2>Salary</h2>
              <InputRange
                step={1000}
                draggableTrack
                maxValue={100000}
                minValue={20000}
                value={rangeValue}
                onChange={value => setRangeValue(value)} 
              />
            </div>
          </Form>
        )}
        </Formik>
    </div>
  );
};

export default ValidationSchemaExample;