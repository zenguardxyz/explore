import { useState } from "react";
import { Modal, Button, Group, Text, Center } from "@mantine/core";
import { IconNote } from "@tabler/icons";

export interface ClaimModalProps {
  claimModal?: boolean;
  setClaimModal?: any;
}

export const ClaimModal = (props: ClaimModalProps) => {
  const { claimModal = false, setClaimModal } = props;

  return (
    <>
      {" "}
      <Modal
        opened={claimModal}
        onClose={() => setClaimModal(false)}
        centered
        padding={40}
      >
        <Center>
          <IconNote size={60} />
        </Center>
        <Text align="center" mt={40}>
          This action will initiate the wallet claim by paying the claim fee.
          Are you sure about this
        </Text>

        <Group
          mt={20}
          sx={{
            width: "100%",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </Group>
      </Modal>
    </>
  );
};
