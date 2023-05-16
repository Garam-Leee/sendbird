import styled from '@emotion/styled';

import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

interface IProps {
  name: string;
}

const Container = styled.div`
  display: flex;
  * + * {
    margin-left: 10px;
  }
`;

export default function Search({ name }: IProps) {
  return (
    <Container>
      <Input type="text" name={name} aria-label="키워드 검색 입력" />
      <Button type="submit" color="primary" outlined>
        검색
      </Button>
    </Container>
  );
}
