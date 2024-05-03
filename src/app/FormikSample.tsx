'use client'

import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('name is required'),
  storageAmountGB: yup
    .number()
    .required('Storage amount is required'),
});

export const FormikSample = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      storageAmountGB: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('form values', values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} >
        <input
          className='text-black'
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div>
          {formik.touched.name && formik.errors.name}
        </div>
        <input
          className='text-black'
          name="storageAmountGB"
          type="number"
          value={formik.values.storageAmountGB}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div>
          {formik.touched.storageAmountGB && formik.errors.storageAmountGB}
        </div>
        <button color="primary" type="submit" className='text-white rounded-md p-2.5'>
          Submit
        </button>
      </form>
    </div>
  );
};
