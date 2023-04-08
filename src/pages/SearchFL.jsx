import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";
import InfoCardFLG from "../components/InfoCardFLG";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

function formatDuration(durationInMinutes) {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  return `${hours}h ${minutes}min`;
}

function search({}) {
  const router = useRouter();
  const [user, charge, error] = useAuthState(auth);
  const { orgn, dest, startDate, endDate, numberOfPeople } = router.query;
  const iata_dest = router.query.iatadest;
  const iata_orgn = router.query.iataorg;

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
      "X-RapidAPI-Key": "d2dc17860emsh973eb4a7f985cc9p17695ejsn4bb3ff981242",
      "X-RapidAPI-Host": "skyscanner44.p.rapidapi.com",
    },
  };
  useEffect(() => {
    fetch(
      `https://skyscanner44.p.rapidapi.com/search?adults=${numberOfPeople}&origin=${iata_orgn}&destination=${iata_dest}&departureDate=${start}&returnDate=${end}&currency=EUR`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setapiData(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(apiData);

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header
        placeholder={`${orgn} | ${range} | ${numberOfPeople} adults | ${dest}`}
      />

      <main className="flex mb-auto">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            The best Flights - {range} - for {numberOfPeople} adults
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Flights from {orgn} to {dest}
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
            {apiData && apiData.itineraries && (
              <>
                {apiData.itineraries.buckets.map((result, index) => (
                  <InfoCardFLG
                    id={result.id}
                    origin={result.items[0].legs[0].origin.name}
                    destination={result.items[0].legs[0].destination.name}
                    departureTime={result.items[0].legs[0].departure}
                    arrivalTime={result.items[0].legs[0].arrival}
                    price={result.items[0].price.formatted}
                    image={
                      result.items[0].legs[0].carriers.marketing[0].logoUrl
                    }
                    namecompany={
                      result.items[0].legs[0].carriers.marketing[0].name
                    }
                    stops={result.items[0].legs[0].stopCount}
                    departureTimeretour={result.items[0].legs[1].departure}
                    arrivalTimeretour={result.items[0].legs[1].arrival}
                    duration={formatDuration(
                      result.items[0].legs[0].durationInMinutes
                    )}
                    durationretour={formatDuration(
                      result.items[0].legs[1].durationInMinutes
                    )}
                    user={user}
                  />
                ))}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default search;
