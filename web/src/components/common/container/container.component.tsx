import { Dialog, Notification, useMantineTheme } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import usePluginStore from "../../../store/plugin/plugin.store";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    max-width: "100%";
  }
`;

interface ContainerComponentProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerComponentProps> = (props) => {
  const { children } = props;
  const theme = useMantineTheme();

  const { confirming, confirmed } = usePluginStore((state: any) => state);
  
  return <StyledContainer>
          <Dialog position={{ bottom: 20, right: 100 }} opened={confirming }  withCloseButton  size="lg" radius="md" 
      sx={{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }}> 

     <Notification
        
        withBorder={false}
        withCloseButton={false}
        sx={{
          margin: 10, 
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }}
        loading
        title="Confirming the transaction"      >
        Waiting for the transaction to get confirmed
      </Notification>

      </Dialog>

      <Dialog position={{ bottom: 20, right: 100 }} opened={confirmed} transitionDuration={2000} withCloseButton  size="lg" radius="md" 
      sx={{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }}> 
      

      <Notification
        
        withBorder={false}
        withCloseButton={false}
        sx={{
          margin: 10, 
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }}
        icon={<IconCheck size="1.1rem" />} color="teal" 
        title="Transaction confirmed!"      >
        Transaction has been confirmed now
      </Notification>

      </Dialog>
    
    {children}
    
    </StyledContainer>;
};
