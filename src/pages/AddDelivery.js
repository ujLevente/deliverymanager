import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import DeliveryForm from '../components/delivery/DeliveryForm';
import { REQUEST_STATUSES, DELIVERY_STATUSES } from '../constants';
import useRequest from '../hooks/use-request';
import { deliveryApi } from '../lib/api';

const initialValues = {
  address: '',
  contact: '',
};

const AddDelivery = () => {
  const { sendRequest, error, status } = useRequest(deliveryApi.add);
  const history = useHistory();

  const onSubmit = async (values, helpers) => {
    const { status } = await sendRequest({
      ...values,
      status: DELIVERY_STATUSES.INITIAL,
    });
    helpers.setSubmitting(false);

    if (status === REQUEST_STATUSES.COMPLETED) {
      history.push('/');
    }
  };

  return (
    <div>
      {status === REQUEST_STATUSES.ERROR && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
      <Typography color="secondary" variant="h6">
        Add new delivery
      </Typography>
      <DeliveryForm initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  );
};

export default AddDelivery;
