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
  { id: 1, name: 'HTTPS', protocol: 'TCP', port: 443 },
  { id: 3, name: 'SSH', protocol: 'TCP', port: 22 },
  { id: 2, name: 'SMTP', protocol: 'TCP', port: 25 },
];

export const securityData = [
  {
    id: 1,
    name: 'Security SG 1',
    rules: [
      {
        id: 100,
        type: 'HTTPS',
        protocol: 'TCP',
        port: '22',
        source: '0.0.0.0',
        remarks: 'some remarks',
      },
      {
        id: 200,
        type: 'SSH',
        protocol: 'TCP',
        port: '22',
        source: '0.0.0.0',
        remarks: 'some remarks',
      },
    ],
  },
  {
    id: 2,
    name: 'Security SG 2',
    rules: [
      {
        id: 300,
        type: 'HTTPS',
        protocol: 'UDP',
        port: '443',
        source: '0.0.0.0',
        remarks: 'some remarks',
      },
    ],
  },
  {
    id: 3,
    name: 'Security SG 3',
    rules: [
      {
        id: 400,
        type: 'SSH',
        protocol: 'UDP',
        port: '8080',
        source: '0.0.0.0',
        remarks: 'some remarks',
      },
    ],
  },
];
