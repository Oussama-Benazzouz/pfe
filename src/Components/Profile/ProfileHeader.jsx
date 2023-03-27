import { Box, Flex, Avatar, AvatarBadge } from '@chakra-ui/react'
import React from 'react'
import ProfileBanner from "/public/images/colorful-bg.jpg"




function ProfileHeader({ userData }) {
  return (
    <Flex
      direction="column"
      width="90%"
      height="350px"
      className="mx-auto mt-5 "
    >
      <Box
        width={"100%"}
        height={"100%"}
        bgImage={`url(${ProfileBanner.src})`}
        layout="fill"
        backgroundSize="cover"
      />
      <Flex justify="center" alignItems="center" bg="white" flexGrow={1}>
        <Avatar
          size="2xl"
          name={userData?.name}
          src={userData?.photoURL}
          position="relative"
          top="-50%"
          border="4px solid #fa8072"
        >
        </Avatar>
      </Flex>
      <h1></h1>
    </Flex>

  );
}

export default ProfileHeader