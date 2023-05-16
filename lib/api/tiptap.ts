import { requestForm } from '@/lib/api/index';

const uploadFetcher = ({ uploadFiles }: IFileAPIRequest) =>
  requestForm('/api/bypass/form', {
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_COMU_API_DOMAIN}/v1/counselling/upload`,
    data: {
      uploadFiles,
    },
  });
export default uploadFetcher;
