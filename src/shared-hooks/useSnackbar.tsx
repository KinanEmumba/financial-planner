import { useCallback, useState } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

import { SnackbarOptions } from 'src/utils/shared-types';

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; options: SnackbarOptions }>({
    open: false,
    options: { message: '', duration: 3000, type: 'success' },
  });

  const showSnackbar = useCallback((options: SnackbarOptions) => {
    setSnackbar({ open: true, options });
  },[]);

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const SnackbarView = () => (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.options.duration || 3000}
      onClose={handleClose}
			TransitionComponent={props => <Slide {...props} direction="up" />}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
			 <Alert
				onClose={handleClose}
				severity={snackbar.options.type}
				variant="filled"
			>
				{snackbar.options.message}
			</Alert>
    </Snackbar>
  );
		
  return {
    showSnackbar,
    SnackbarView,
  };
};

export default useSnackbar;