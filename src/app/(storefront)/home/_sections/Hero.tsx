export default function Hero() {
  return (
    <section className="w-full h-screen p-5 pt-[84px]">
      <div className="relative bg-black/10 w-full h-full p-10">
        <img
          className="absolute inset-0 object-center object-cover w-full h-full"
          src="/assets/heroimg.jpg"
          alt=""
        />
        <div className="relative w-full h-full flex items-end justify-start z-10">
          <h1 className="text-white">The future of Afican Fashion</h1>
        </div>
      </div>
    </section>
  );
}
