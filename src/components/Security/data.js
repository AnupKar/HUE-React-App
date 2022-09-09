export const selectOperation = [
  {
    id: 1,
    value: 'Create a new security group',
  },
  {
    id: 2,
    value: 'Select an existing security group',
  },
];

export const networksType = [
  { id: 1, name: 'HTTPS' },
  { id: 3, name: 'SSH' },
  { id: 2, name: 'SMTP' },
];

export const securityData = [
  {
    id: 1,
    name: 'Security SG 1',
    rules: [
      {
        type: 'HTTPS',
        protocol: 'TCP',
        port: '22',
        source: '0.0.0.0',
        remarks: "some remarks",
      },
      {
        type: 'SSH',
        protocol: 'TCP',
        port: '22',
        source: '0.0.0.0',
        remarks: "some remarks",
      },
    ],
  },
  {
    id: 2,
    name: 'Security SG 2',
    rules: [
      {
        type: 'HTTPS',
        protocol: 'UDP',
        port: '443',
        source: '0.0.0.0',
        remarks: "some remarks",
      },
    ],
  },
  {
    id: 3,
    name: 'Security SG 3',
    rules: [
      {
        type: 'SSH',
        protocol: 'UDP',
        port: '8080',
        source: '0.0.0.0',
        remarks: "some remarks",
      },
    ],
  },
];
