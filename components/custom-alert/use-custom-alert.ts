import { useContext } from 'react';
//
import { CustomAlertContext } from './alert-context';

// ----------------------------------------------------------------------

const useCustomAlert = () => {
  const context = useContext(CustomAlertContext);

  if (!context) throw new Error('useCustomAlert context must be use inside CustomAlertProvider');

  return context;
};

export default useCustomAlert;
