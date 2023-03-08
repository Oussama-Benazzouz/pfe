import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import exploreData from "../../assets/mrc.json";
import SmallCard from "../Components/SmallCard";
import BigCard from "../Components/BigCard";
import LargeCard from "../Components/LargeCard";
import Footer from "../Components/Footer";
import cardsData from "../../assets/mrc2.json";
import MediumCard from "../Components/MediumCard";

const Home = ({ exploreData, cardsData }) => {
  return (
    <div className="html">
      <Head>
        <title>GoMorocco</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4-xl font-semibold pb-5">
            Explore Moroccan Cities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, location }) => (
              <SmallCard key={img} img={img} location={location} />
            ))}
          </div>
        </section>


        <BigCard />
        
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The greatest Outdoors"
          description="Provided by GoMorocco."
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}

export default Home;
