import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import exploreData from "../../assets/mrc.json";
import SmallCard from "../Components/SmallCard";
import BigCard from "../Components/BigCard";
import LargeCard from "../Components/LargeCard";
import Footer from "../Components/Footer";

const Home = ({ exploreData }) => {
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

        <LargeCard 
          img="https://links.papareact.com/4cj"
          title="The greatest Outdoors"
          description="Wishlists curated by GoMorocco."
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
    },
  };
}

export default Home;
