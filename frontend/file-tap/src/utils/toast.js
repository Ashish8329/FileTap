import { toast } from 'react-toastify';

// Utility function to show success toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
  });
};

// Utility function to show error toast
export const showErrorToast = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
  });
};

// Utility function to show info toast
export const showInfoToast = (message) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
  });
};
