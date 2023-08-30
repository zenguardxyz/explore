import { Box, Container, Group, Loader, Modal, Text, Image, useMantineTheme, Center } from "@mantine/core";


export const LoaderModal = (props: any) => {
    const { text, loading } = props;
    const theme = useMantineTheme();
  
    return (
    <Modal
    centered
    opened={loading}
    onClose={() => !loading}
    overlayProps={{
      color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      opacity: 0.55,
      blur: 3,
    }}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    withCloseButton={false}
    // overlayOpacity={0.5}
    size={320}
  >
    <Box sx={{ padding: "20px" }}>
      <Group>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Loader />
          
          <Text mt={"lg"} align='center'> { text }
          <Box sx={{ paddingTop: "20px" }}><Center><Image src={''} width={50}/></Center> </Box>
          </Text>
          
        </Container>
      </Group>
    </Box>
  </Modal>)

}