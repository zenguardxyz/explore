import React from 'react';
import { Navbar } from '@mantine/core';
import { User } from './_user';
import { MainLinks } from './_links';
// import { MainLinks } from './_mainLinks';


export function Nav(props: any) {

  const { opened } = props;

  return (
    <Navbar  p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}  hidden={!opened}>
      <Navbar.Section grow mt="md">
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
}

