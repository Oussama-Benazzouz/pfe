import InfoCard2 from "../Components/InfoCard2";
import HeaderNoSearch from "../Components/HeaderNoSearch";
import Footer from "../Components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

export default function Hotel({}) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const hotelId = router.query.hotel_id;
  const price = router.query.price;
  const img = router.query.img;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c1d41f57abmshf38ef863f709f53p108a44jsnab1d016b810f",
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };
  const Options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3a8ef21766mshbfc151e97c0f14ep145b56jsn2550ac7fee7f",
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };
  const [detData, setdetData] = useState(null);

  useEffect(() => {
    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=${hotelId}&locale=en-gb`,
      options
    )
      .then((response) => response.json())
      .then((response) => setdetData(response))
      .catch((err) => console.error(err));
  }, []);

  const [desc, setdesc] = useState(null);

  useEffect(() => {
    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/description?hotel_id=${hotelId}&locale=en-gb`,
      options
    )
      .then((response) => response.json())
      .then((response) => setdesc(response))
      .catch((err) => console.error(err));
  }, []);

  const [ablt, setablt] = useState(null);
  useEffect(() => {
    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/facilities?hotel_id=${hotelId}&locale=en-gb`,
      options
    )
      .then((response) => response.json())
      .then((response) => setablt(response))
      .catch((err) => console.error(err));
  }, []);

  const [imgs, setimgs] = useState(null);

  useEffect(() => {
    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${hotelId}&locale=en-gb`,
      Options
    )
      .then((response) => response.json())
      .then((response) => setimgs(response))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="h-screen flex flex-col justify-between">
      <HeaderNoSearch />
      <main className="mb-auto">
        {detData && desc && ablt && imgs && (
          <InfoCard2
            img={img}
            location={detData.address}
            imgs={imgs}
            title={detData.name}
            star={detData.review_score}
            description={desc.description}
            price={price}
            amenities={ablt}
            user={user}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
