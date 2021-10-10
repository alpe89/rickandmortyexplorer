import { FC } from "react";
import { Avatar, Flex, Heading, Tabs, Tab, TabList, TabPanels, TabPanel, Text } from "@chakra-ui/react";
import { Card } from "../../../components";
import { Profile } from "../../../types";

type Props = { profile: Profile };

export const ProfileCard: FC<Props> = ({ profile }) => {
    return (
        <Card width="100%" pt="8">
            <Tabs isFitted variant="soft-rounded" width="100%" outlineColor="brand.primary">
                <TabList>
                    <Tab
                        _selected={{ color: "white", bg: "brand.primary", border: "none", boxShadow: "none" }}
                        _active={{ color: "white", bg: "brand.primary", border: "none", boxShadow: "none" }}
                    >
                        Info
                    </Tab>
                    <Tab>Origin</Tab>
                    <Tab>Location</Tab>
                    <Tab>Episodes</Tab>
                </TabList>
                <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    <Avatar name={profile.characterInfo.name} size="2xl" src={profile.image} my="4" />
                    <Heading size="md" color="brand.primary">
                        {profile.characterInfo.name}
                    </Heading>
                </Flex>
                <TabPanels>
                    <TabPanel>
                        <Text color="brand.primary" size="md" fontWeight="bold">
                            Info
                        </Text>
                    </TabPanel>
                    <TabPanel>
                        <Text color="brand.primary" size="md" fontWeight="bold">
                            Origin
                        </Text>
                    </TabPanel>
                    <TabPanel>
                        <Text color="brand.primary" size="md" fontWeight="bold">
                            Location
                        </Text>
                    </TabPanel>
                    <TabPanel>
                        <Text color="brand.primary" size="md" fontWeight="bold">
                            Episodes
                        </Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Card>
    );
};
