import axios from 'axios';
import { showAlert } from './alert';

export const updateData = async (firstName, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
      data: {
        firstName,
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Data updated Successfully');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
