import React from "react";
import HeaderNoSearch from "../../../Components/HeaderNoSearch";
import ProfileNotFound from "../../../Components/Profile/ProfileNotFound";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import Footer from "../../../Components/Footer";
import ProfileHeader from "../../../Components/Profile/ProfileHeader";
import ProfileForm from "../../../Components/Profile/ProfileForm";

function ProfilePage({ userData }) {
  const [user, loading, error] = useAuthState(auth);

  if (user && userData) {
    return (
      <>
        <HeaderNoSearch />
        <ProfileHeader userData={userData} />
        <ProfileForm userData={userData} />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <HeaderNoSearch />
        <ProfileNotFound />
        <Footer />
      </>
    );
  }
}

export async function getServerSideProps(context) {
  try {
    const userDocRef = doc(firestore, "users", context.params.userId);
    const userDoc = await getDoc(userDocRef);

    return {
      props: {
        userData: userDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: userDoc.displayName, ...userDoc.data() })
            )
          : "",
      },
    };
  } catch (err) {
    console.log("getServerSideProps error: ", err);
  }
}

export default ProfilePage;
