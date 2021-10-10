import { FC } from "react";
import { Avatar, Flex, Heading, Tabs, TabList, TabPanels } from "@chakra-ui/react";
import { Card } from "../../../components";
import { ProfileTab, ProfilePanel, Info, StatusBadge, LocationInfo, Episodes } from "./components";
import { Profile } from "../../../types";

type Props = { profile: Profile };

export const ProfileCard: FC<Props> = ({ profile }) => {
    return (
        <Card width="100%" padding="0" bg="brand.primary">
            <Tabs isFitted variant="soft-rounded" width="100%" outlineColor="brand.primary" pt="6" bg="white">
                <TabList px="4">
                    <ProfileTab>Info</ProfileTab>
                    <ProfileTab>Origin</ProfileTab>
                    <ProfileTab>Location</ProfileTab>
                    <ProfileTab>Episodes</ProfileTab>
                </TabList>

                <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    <Avatar name={profile.characterInfo.name} size="2xl" src={profile.image} my="4" />
                    <Heading as="h2" size="md" color="brand.primary">
                        {profile.characterInfo.name}
                        <StatusBadge status={profile.characterInfo.status} />
                    </Heading>
                </Flex>

                <TabPanels mt="4">
                    <ProfilePanel>
                        <Info
                            gender={profile.characterInfo.gender}
                            species={profile.characterInfo.species}
                            type={profile.characterInfo.type}
                        />
                    </ProfilePanel>
                    <ProfilePanel>
                        <LocationInfo
                            name={profile.originInfo.name}
                            dimension={profile.originInfo.dimension}
                            type={profile.originInfo.type}
                            residents={profile.originInfo.residents}
                        />
                    </ProfilePanel>
                    <ProfilePanel>
                        <LocationInfo
                            name={profile.locationInfo.name}
                            dimension={profile.locationInfo.dimension}
                            type={profile.locationInfo.type}
                            residents={profile.locationInfo.residents}
                        />
                    </ProfilePanel>
                    <ProfilePanel>
                        <Episodes episodes={profile.episodeInfo} />
                    </ProfilePanel>
                </TabPanels>
            </Tabs>
        </Card>
    );
};
