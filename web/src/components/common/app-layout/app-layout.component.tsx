import React, { useState } from "react";
import { Container } from "../container/container.component";
import { Nav } from "../navbar/navbar.component";
import { Head } from "../header/header.component";
import { AppShell, Aside, MediaQuery, Text } from '@mantine/core';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { children } = props;
  const [ opened, setOpened ] = useState(false);
  return (
    <AppShell
    navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
    padding="md"
    header={<Head setOpened={setOpened} opened={opened}/>}
    styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
    })}
    
  >
   <Container>{children}</Container>
  </AppShell>
  );
};
