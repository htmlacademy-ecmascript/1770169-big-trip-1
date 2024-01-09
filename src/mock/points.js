const points = [
  {
    id: '0720960e-14c2-4a2f-81f0-8a6dcb6d020d',
    type: 'check-in',
    dateFrom: '2023-12-24T05:04:05.328Z',
    dateTo: '2023-12-24T21:10:28.455Z',
    destination: '6770541a-d429-4c1b-b1de-2a3167214777',
    basePrice: 700,
    isFavorite: false,
    offers: [
      '3f5b5abf-e4ea-43c4-8389-83c8d9df0442',
      'f70f1bbc-0260-41ef-b338-cca7630507b6',
      'd75e73b4-a517-4fcb-b856-c3bb9f49e0a5',
      'a52f6268-44bb-4e23-9a96-4bb78d267ef9'
    ]
  },
  {
    id: '4447a921-4ea7-4b8c-82a4-b017f20cfdd4',
    type: 'sightseeing',
    dateFrom: '2023-12-25T21:10:28.455Z',
    dateTo: '2023-12-26T20:14:42.774Z',
    destination: 'a956955a-4b89-4deb-b437-977a20d600a9',
    basePrice: 1000,
    isFavorite: false,
    offers: []
  },
  {
    id: '13f56552-c663-4276-84ca-128e0842c706',
    type: 'flight',
    dateFrom: '2023-12-20T20:14:42.774Z',
    dateTo: '2023-12-24T19:30:13.613Z',
    destination: 'd8674ae4-c784-4996-9f7d-97d73868037e',
    basePrice: 900,
    isFavorite: false,
    offers: [
      '640deb85-4075-47f6-baa5-a8b2e11d37de',
      '2c79620c-1d5a-4161-9436-a3b121f27e83',
      'a07d3b6e-98e3-4145-bd45-09fd6ffdf64c'
    ]
  },
  {
    id: 'a5eb41fd-2276-497b-9fed-da586429371e',
    type: 'bus',
    dateFrom: '2023-11-16T19:30:13.613Z',
    dateTo: '2023-11-17T06:07:08.876Z',
    destination: 'cdc15e18-9849-4092-a7f2-b89a4ec5c196',
    basePrice: 1100,
    isFavorite: false,
    offers: [
      'ab23fcab-abb9-4190-b802-0ed08f6ea28e',
      'ed7962f5-4385-44ec-a55c-2ed49b64f035',
      'ca976d9f-0dd7-4469-8520-86c1182bb5f4'
    ]
  },
  {
    id: 'e42b9db3-e697-41ba-be77-966a5aa63c66',
    type: 'taxi',
    dateFrom: '2023-11-17T06:07:08.876Z',
    dateTo: '2023-11-17T11:59:48.951Z',
    destination: '762c650d-b95f-409e-93e1-247126f8c1cb',
    basePrice: 300,
    isFavorite: true,
    offers: [
      '96e801da-19f2-415a-aa24-5a915f325a35',
      '209d6f48-5ac5-4970-bd0d-3dfc4f932ae6',
      '5a360f33-4a66-449a-bef8-707cc7376b2a'
    ]
  },
  {
    id: '4b064c4e-498f-4109-99cc-ef88949dd5f2',
    type: 'bus',
    dateFrom: '2023-11-17T11:59:48.951Z',
    dateTo: '2023-11-17T14:53:05.784Z',
    destination: '37faa568-b249-48ac-babd-78df38bafa66',
    basePrice: 500,
    isFavorite: false,
    offers: [
      'ab23fcab-abb9-4190-b802-0ed08f6ea28e',
      'ed7962f5-4385-44ec-a55c-2ed49b64f035',
      'ca976d9f-0dd7-4469-8520-86c1182bb5f4'
    ]
  },
  {
    id: '3240ead6-7dd8-47f7-9d3f-589ace8a849b',
    type: 'check-in',
    dateFrom: '2023-11-17T14:53:05.784Z',
    dateTo: '2023-11-18T05:46:09.526Z',
    destination: 'df3ddcaf-78d6-49b2-aab3-2d954216e277',
    basePrice: 900,
    isFavorite: false,
    offers: [
      '3f5b5abf-e4ea-43c4-8389-83c8d9df0442',
      'ae20b499-94f9-4e46-8770-5df60ae49909',
      'd75e73b4-a517-4fcb-b856-c3bb9f49e0a5',
      'a52f6268-44bb-4e23-9a96-4bb78d267ef9'
    ]
  },
  {
    id: '68b47403-4ab5-4108-8975-7fff76b57ae0',
    type: 'flight',
    dateFrom: '2023-11-18T05:46:09.526Z',
    dateTo: '2023-11-18T16:20:10.697Z',
    destination: 'f17dec74-7db2-49c6-9a0d-6338a362539c',
    basePrice: 500,
    isFavorite: false,
    offers: [
      '334a3ca0-3c9d-4234-9e26-bc0fcb704784',
      '2c79620c-1d5a-4161-9436-a3b121f27e83',
      'ff3e2f3f-9b88-440f-9680-cc4dea1f18e1'
    ]
  },
  {
    id: '175df3e9-8403-48c9-83f2-c4bd5e6e013f',
    type: 'drive',
    dateFrom: '2023-11-18T16:20:10.697Z',
    dateTo: '2023-11-19T04:31:19.199Z',
    destination: 'b8da2874-8ad3-45cc-9713-2a2028d629e5',
    basePrice: 1000,
    isFavorite: true,
    offers: [
      '8bb8c278-0627-4f67-aaa9-78ce7fc449b6',
      '7a108838-9f7a-4c60-b705-947fc3c40e3a'
    ]
  },
  {
    id: 'c4de5e3c-3166-4015-94aa-3e20e8817b93',
    type: 'ship',
    dateFrom: '2023-11-19T04:31:19.199Z',
    dateTo: '2023-11-19T17:44:55.048Z',
    destination: '37faa568-b249-48ac-babd-78df38bafa66',
    basePrice: 1100,
    isFavorite: false,
    offers: [
      'fe16e69b-9657-4b99-a5b1-b5f428459747',
      '2d57cd36-9d17-4415-905a-ef53caa9105b',
      '3bcf18f0-1a5f-4e2e-8339-18684c4c766f'
    ]
  },
  {
    id: 'd34a27c8-e433-47d2-b5b9-57c3adec19e2',
    type: 'drive',
    dateFrom: '2023-11-19T17:44:55.048Z',
    dateTo: '2023-11-20T00:39:33.862Z',
    destination: '0b44333a-037a-469f-a22e-894a96e92c5f',
    basePrice: 1000,
    isFavorite: true,
    offers: [
      '8bb8c278-0627-4f67-aaa9-78ce7fc449b6',
      '7a108838-9f7a-4c60-b705-947fc3c40e3a'
    ]
  },
  {
    id: '417cb57b-cef0-4d0a-bc01-8bd6aa5032b3',
    type: 'drive',
    dateFrom: '2023-11-20T00:39:33.862Z',
    dateTo: '2023-11-20T07:14:04.943Z',
    destination: '6770541a-d429-4c1b-b1de-2a3167214777',
    basePrice: 800,
    isFavorite: false,
    offers: [
      '8bb8c278-0627-4f67-aaa9-78ce7fc449b6',
      '7a108838-9f7a-4c60-b705-947fc3c40e3a'
    ]
  },
  {
    id: '34b4f807-894d-40a1-8f7f-34e090f35f0c',
    type: 'bus',
    dateFrom: '2023-11-20T07:14:04.943Z',
    dateTo: '2023-11-20T21:02:46.589Z',
    destination: 'df3ddcaf-78d6-49b2-aab3-2d954216e277',
    basePrice: 1000,
    isFavorite: false,
    offers: [
      'ab23fcab-abb9-4190-b802-0ed08f6ea28e',
      'ed7962f5-4385-44ec-a55c-2ed49b64f035',
      'ca976d9f-0dd7-4469-8520-86c1182bb5f4'
    ]
  },
  {
    id: '3fb20a1e-d6b3-47aa-81dd-00c85eed6c85',
    type: 'bus',
    dateFrom: '2023-11-20T21:02:46.589Z',
    dateTo: '2023-11-21T01:29:13.940Z',
    destination: 'f17dec74-7db2-49c6-9a0d-6338a362539c',
    basePrice: 400,
    isFavorite: true,
    offers: [
      'ab23fcab-abb9-4190-b802-0ed08f6ea28e',
      'ed7962f5-4385-44ec-a55c-2ed49b64f035',
      'ca976d9f-0dd7-4469-8520-86c1182bb5f4'
    ]
  },
  {
    id: 'e2842b34-f009-4a63-85fe-0e9413b40c77',
    type: 'restaurant',
    dateFrom: '2023-11-21T01:29:13.940Z',
    dateTo: '2023-11-21T23:28:25.426Z',
    destination: '63918c5c-66a5-4522-88dd-3a6b15bbe351',
    basePrice: 300,
    isFavorite: false,
    offers: [
      '3f591653-4259-4891-9e3f-609e11fd5d36',
      'f24530f9-d1ae-4aa9-9a1c-89e31e815876'
    ]
  },
  {
    id: 'a8342f0d-ee57-4363-915e-337f64a89677',
    type: 'restaurant',
    dateFrom: '2023-11-21T23:28:25.426Z',
    dateTo: '2023-11-22T10:48:32.720Z',
    destination: '1b3a3cb9-f7f2-4db5-86cd-f31b1cf2275b',
    basePrice: 1000,
    isFavorite: true,
    offers: [
      '3f591653-4259-4891-9e3f-609e11fd5d36',
      'f24530f9-d1ae-4aa9-9a1c-89e31e815876'
    ]
  },
  {
    id: '7524c6bb-cd96-4bb3-958d-a327edc3355a',
    type: 'restaurant',
    dateFrom: '2023-11-22T10:48:32.720Z',
    dateTo: '2023-11-23T05:07:17.645Z',
    destination: '52faf0f6-ebd2-40cf-8bb2-b48d96b735e3',
    basePrice: 800,
    isFavorite: true,
    offers: [
      '3f591653-4259-4891-9e3f-609e11fd5d36',
      'f24530f9-d1ae-4aa9-9a1c-89e31e815876'
    ]
  },
  {
    id: 'ebee6d75-b1b9-463e-9b93-387e32b11a68',
    type: 'bus',
    dateFrom: '2023-11-23T05:07:17.645Z',
    dateTo: '2023-11-23T13:29:06.010Z',
    destination: '96e2cb7e-16ff-4332-94ba-e399fff15b99',
    basePrice: 1100,
    isFavorite: true,
    offers: [
      'ab23fcab-abb9-4190-b802-0ed08f6ea28e',
      'ed7962f5-4385-44ec-a55c-2ed49b64f035',
      'ca976d9f-0dd7-4469-8520-86c1182bb5f4'
    ]
  },
  {
    id: 'e3739967-a78a-4588-bd77-cca193b0dc08',
    type: 'train',
    dateFrom: '2023-11-23T13:29:06.010Z',
    dateTo: '2023-11-23T20:24:46.799Z',
    destination: '3935a66e-c336-4242-b66e-27c93e35058b',
    basePrice: 1100,
    isFavorite: false,
    offers: [
      'c56662ff-2587-4564-8bec-5bc56388ab61',
      '0dc628ee-1ce6-4198-9ae0-6b094a3afb87',
      '96fe2271-d5f5-47aa-8d00-e878e72368b5'
    ]
  },
  {
    id: '227b97c2-cdb6-4d07-95f9-2d19e4e8f957',
    type: 'ship',
    dateFrom: '2023-11-23T20:24:46.799Z',
    dateTo: '2023-11-24T19:22:04.827Z',
    destination: '96e2cb7e-16ff-4332-94ba-e399fff15b99',
    basePrice: 1100,
    isFavorite: true,
    offers: [
      'ddc51794-070d-4a61-9625-e598d0e59389',
      '5611e534-eacd-4b90-9bf7-b7aae348de6c'
    ]
  }
];

export {points};
