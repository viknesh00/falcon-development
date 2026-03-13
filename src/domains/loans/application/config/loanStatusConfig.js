import { LOAN_STATUS } from '../domain/loanstatus';

export const LOAN_STATUS_CONFIG = {
  [LOAN_STATUS.PENDING]: {
    label: 'Pending Approval',
    tone: 'warning',
    showAmount: true,
  },
  [LOAN_STATUS.APPROVED]: {
    label: 'Approved',
    tone: 'success',
    showAmount: true,
  },
  [LOAN_STATUS.ACTIVE]: {
    label: 'Active Loan',
    tone: 'info',
    showAmount: true,
  },
  [LOAN_STATUS.REJECTED]: {
    label: 'Rejected',
    tone: 'error',
    showAmount: false,
  },
  [LOAN_STATUS.CLOSED]: {
    label: 'Closed',
    tone: 'neutral',
    showAmount: true,
  },
  [LOAN_STATUS.DEFAULT]: {
    label: 'Unknown Status',
    tone: 'neutral',
    showAmount: false,
  },
  [LOAN_STATUS.OUTSTANDING]: {
    label: 'Outstanding',
    tone: 'warning',
    showAmount: true,
  },
};
