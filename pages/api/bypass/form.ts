import { NextApiRequest, NextApiResponse } from 'next';

import { readFileSync, existsSync, unlinkSync } from 'fs';
import multer from 'multer';
import nc from 'next-connect';
import FormData from 'form-data';
import fetch from 'node-fetch';

interface MulterRequest extends NextApiRequest {
  files: Express.Multer.File[];
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: `${process.cwd()}/uploads`,
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
  // limits: {
  //   fileSize: 1024 * 1024 * 10,
  // },
});

const handler = nc<MulterRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(upload.array('uploadFileList'));

handler.post(
  async (
    { body: { url, ...params }, files, headers: { authorization } },
    res,
  ) => {
    const formData = new FormData();
    if (Array.isArray(files)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        formData.append(
          'uploadFileList',
          readFileSync(file.path),
          file.originalname,
        );
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(params)) {
      formData.append(key, `${value}`);
    }
    const requestHeader: HeadersInit = {
      contentLength: `${formData.getLengthSync()}`,
      accept: 'application/json',
      charSet: 'utf-8',
      ...formData.getHeaders(),
    };
    if (authorization) {
      requestHeader.Authorization = authorization;
      // eslint-disable-next-line prefer-destructuring
      requestHeader['X-AUTH-TOKEN'] = authorization.split('Bearer ')[1];
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const { path } = file;
      if (existsSync(path)) {
        unlinkSync(path);
      }
    }
    fetch(url, {
      method: 'POST',
      headers: requestHeader,
      body: formData,
    })
      .then(async response => {
        const { status } = response;
        if (!response.ok) {
          res
            .status(status)
            .json({ message: response.statusText ?? '장애가 발생하였습니다.' });
          return;
        }
        const reponseJson = await response.json();
        res.status(status).json(reponseJson);
      })
      .catch(error => {
        console.error(error);
        res
          .status(500)
          .json({ message: error?.message ?? '장애가 발생하였습니다.' });
      });
  },
);

export default handler;
