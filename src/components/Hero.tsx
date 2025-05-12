import Image from "next/image";

const Hero = () => {
  return (
    <section className="h-[60vh] bg-[#0034D1] flex">
      <div className="w-1/2 flex items-center justify-center animate-slide-up">
        <div className="w-4/5 md:w-[60%] flex flex-col gap-10">
          <p className="text-xl md:text-5xl font-extrabold text-white">
            Find Your Dream Job With Ease
          </p>
          <p className="text-white w-[70%] font-light">
            Search, Apply, and Track Job Applications All in One Place!
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center animate-slide-up">
        <Image
          className="object-fill"
          src={"./man.svg"}
          alt={"man"}
          height={500}
          width={500}
        />
      </div>
    </section>
  );
};
export default Hero;
