import React from 'react';
import Link from 'next/link';

import type { User } from '../interfaces';

type Props = {
  data: User;
};

const ListItem = ({ data }: Props): React.JSX.Element => (
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    {data.id}:{data.name}
  </Link>
);

export default ListItem;
