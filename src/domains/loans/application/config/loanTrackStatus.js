export const loanTrackStatus = [
  {
    applicationDetails: [
      {
        label: 'Application ID',
        value: 'FIN-UK-2026-0452',
      },
      {
        label: 'Financing Type',
        value: 'Invoice Financing',
      },
      {
        label: 'Merchant',
        value: 'Fresh Basket Foods Ltd',
      },
      {
        label: 'Invoice Number',
        value: 'INV-UK-4587',
      },
      {
        label: 'Financing Amount',
        value: '€10,000',
      },
      {
        label: 'Applied Date',
        value: '06/03/2026',
      },
    ],

    applicationStatus: {
      currentStage: 'Funding Approval',

      stages: [
        {
          stageName: 'Application Submitted',
          status: 'Completed',
          date: '06/03/2026',
        },
        {
          stageName: 'Document Verification',
          status: 'Completed',
        },
        {
          stageName: 'Shariah Compliance',
          status: 'Completed',
        },
        {
          stageName: 'Funding Approval',
          status: 'In Progress',
        },
        {
          stageName: 'Disbursement',
          status: 'Yet to Start',
        },
      ],
    },
  },
];
