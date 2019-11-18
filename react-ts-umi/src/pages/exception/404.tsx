import React from 'react';
import Exception from '@/components/exception';
import { formatMessage } from 'umi-plugin-react/locale';
import { Link } from 'umi';

const Exception404: React.FC = () => (
  <Exception
    type="404"
    desc={formatMessage({ id: 'app.exception.description.404'})}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back'})}
  />
)

export default Exception404;
