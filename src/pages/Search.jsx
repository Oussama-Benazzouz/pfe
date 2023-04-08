import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useRouter } from "next/router";
import InfoCard from "../Components/InfoCard";
import { format } from "date-fns";
import Map from "../components/Map";
import { useState } from "react";
import { useEffect } from "react";

function search({}) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = startDate
    ? format(new Date(Date.parse(startDate)), "yy MMMM yy")
    : "";
  const formattedEndDate = endDate
    ? format(new Date(Date.parse(endDate)), "dd MMMM yy")
    : "";
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  const start = startDate ? new Date(startDate).toISOString().slice(0, 10) : "";
  const end = endDate ? new Date(endDate).toISOString().slice(0, 10) : "";

  const [apiData, setapiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3a8ef21766mshbfc151e97c0f14ep145b56jsn2550ac7fee7f",
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${location}&locale=en-gb`,
      options
    )
      .then((response) => response.json())
      .then((response) => setapiData(response))
      .catch((err) => console.error(err));
  }, []);

  const [flightData, setFlightData] = useState(null);

  useEffect(() => {
    if (apiData && apiData[0].dest_id) {
      const geoId = apiData[0].dest_id;
      fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/search?adults_number=${noOfGuests}&dest_type=city&filter_by_currency=AED&checkout_date=${end}&checkin_date=${start}&order_by=popularity&locale=en-gb&dest_id=${geoId}&units=metric&room_number=2`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setFlightData(response);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [apiData]);

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex mb-auto">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stays - {range} - for {noOfGuests} guests
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div
            className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 
                    whitespace-nowrap"
          >
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and bed</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-col ">
            {flightData && flightData.result && (
              <>
                {flightData.result.map((result, index) => (
                  <InfoCard
                    key={index}
                    location={result.address_trans}
                    img={result.max_1440_photo_url}
                    title={result.hotel_name}
                    description={result.distances[0].text}
                    star={result.review_score}
                    price={result.price_breakdown.gross_price}
                    id={result.hotel_id}
                  />
                ))}
              </>
            )}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px] ">
          <Map />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default search;
