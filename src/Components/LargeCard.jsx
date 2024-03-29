import Image from "next/legacy/image";

function LargeCard({img, title, description, buttonText}) {
    return (
      <section className="relative py-16 cursor-pointer">
        <div className="relative h-96 miw-w-[300px]">
          <Image
            src={img}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div className="absolute top-32 left-12">
          <h3 className="text-4xl mb-3 w-64">{title}</h3>
          <p>{description}</p>

          <button className="text-sm text-white bg-[#112211] px-4 py-2 rounded-lg mt-5 hover:bg-[#CDEAE1] hover:text-[#112211]">
            {buttonText}
          </button>
        </div>
      </section>
    );
}

export default LargeCard;