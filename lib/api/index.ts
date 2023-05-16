import { getCookie } from 'cookies-next';

export function request<T, U>(
  url: string,
  data: { method?: string; url: string; data?: T },
  headers?: HeadersInit,
): Promise<U> {
  return fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${getCookie('token')}`,
      ...headers,
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

export function requestForm<U>(
  url: string,
  data: {
    method?: string;
    url: string;
    data?: {
      uploadFiles: FileList;
      [key: string]: string | number | boolean | FileList;
    };
  },
  headers?: HeadersInit,
): Promise<U> {
  const { data: { uploadFiles } = {} } = data;
  const formData = new FormData();
  formData.append('url', data.url);
  if (uploadFiles instanceof FileList) {
    const files = Array.from(uploadFiles);
    files.forEach(file => {
      formData.append('uploadFileList', file, file.name);
    });
  }
  return fetch(url, {
    method: 'POST',
    headers: {
      charset: 'utf-8',
      Authorization: `Bearer ${getCookie('token')}`,
      ...headers,
    },
    body: formData,
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

export default {
  request,
};
