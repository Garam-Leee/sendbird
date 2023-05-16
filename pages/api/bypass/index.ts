import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  const {
    body: { url, method, ...body },
    headers: { accept, authorization, 'content-type': contentType },
  } = req;
  const requestHeader: HeadersInit = {
    accept: accept ?? 'application/json',
    'Content-Type': contentType ?? 'application/json;charset=UTF-8',
  };
  if (authorization) {
    requestHeader.Authorization = authorization;
    // eslint-disable-next-line prefer-destructuring
    requestHeader['X-AUTH-TOKEN'] = authorization.split('Bearer ')[1];
  }
  const requestParams: {
    method: string;
    headers?: HeadersInit;
    body?: string;
  } = {
    method,
    headers: requestHeader,
  };
  if (method !== 'GET' && method !== 'HEAD') {
    requestParams.body = JSON.stringify(body);
  }
  fetch(url, requestParams)
    .then(async response => {
      const { status } = response;
      const reponseJson = await response.json();
      res.status(status).json(reponseJson);
    })
    .catch(error => {
      console.error(error);
      res
        .status(500)
        .json({ message: error?.message ?? '장애가 발생하였습니다.' });
    });
}
