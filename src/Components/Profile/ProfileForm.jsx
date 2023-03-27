import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import AccountSettings from "./AccountSettings";



const ProfileForm = ({userData}) => {
  const tabs = ["Account Settings"];

  return (
    <Box
      as="main"
      flex={3}
      d="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bg="gray.10"
      rounded="md"
      borderWidth={1}
      borderColor="gray.300"
      style={{ transform: "translateY(-100px)" }}
      className="mt-20 mx-5"
    >
      <Tabs>
        <TabList px={5}>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="white"
              borderBottomWidth={1}
              _active={{ bg: "transparent" }}
              _selected={{ color: "#243156", borderColor: "#008080" }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <AccountSettings userData={userData}/>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Box>
  );
};

export default ProfileForm;
