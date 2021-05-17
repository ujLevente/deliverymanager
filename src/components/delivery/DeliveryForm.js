import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextFieldWrapper from '../common/TextFieldWrapper';

const validationSchema = Yup.object({
  address: Yup.string()
    .max(255, 'Must be 75 characters or less')
    .required('Required'),
  contact: Yup.string().max(255, 'Must be 255 characters or less').email(),
}); // talán áthelyezni pagere

const DeliveryForm = ({ initialValues, onSubmit }) => {
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <TextFieldWrapper fullWidth={true} label="Address" name="address" />
            <TextFieldWrapper fullWidth={true} label="Contact" name="contact" />
            <Button disabled={formik.isSubmitting} type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeliveryForm;
