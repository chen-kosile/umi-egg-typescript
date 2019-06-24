import React from 'react';
import Exception from '@/components/exception';
import { formatMessage } from 'umi-plugin-react/locale';
import { Link } from 'umi';

const Exception403: React.FC = () => (
  <Exception
    type="403"
    desc={formatMessage({ id: 'app.exception.description.403'})}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back'})}
  />
)

export default Exception403;