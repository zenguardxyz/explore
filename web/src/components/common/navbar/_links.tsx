import React from 'react';
import {
  IconWallet,
  IconPlugConnected,
  IconShieldCheck,
  IconLockAccess,
  Icon2fa,
  IconApps
} from '@tabler/icons';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../navigation/route-path';
import usePluginStore from '../../../store/plugin/plugin.store';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  value: string;
}

function MainLink({ icon, color, label, value }: MainLinkProps) {

  const navigate = useNavigate();


  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      onClick={()=>{ navigate(value)}}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}



export function MainLinks() {

  const { accountDetails } = usePluginStore(
    (state: any) => state
  );
  
  const isSignedIn: boolean = accountDetails.provider;
  
  
  const data = [
    { icon: <IconPlugConnected size="2rem" />, color: 'violet', label: 'Plugins', value: RoutePath.plugins, visible: true },
    { icon: <IconWallet size="2em" />, color: 'blue', label: 'Account', value: RoutePath.account, visible: true },
  ];
  const links = data.map((link) => link.visible && <MainLink {...link} key={link.value} />);
  return <div>{links}</div>;
}