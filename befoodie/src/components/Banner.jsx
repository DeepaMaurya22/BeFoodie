function Banner() {
  return (
    <div>
      <main className="bg-[url('./assets/hero-pizza.jpeg')] bg-cover bg-center pt-[4rem] pb-[5.2rem] h-[35rem]">
        <section className="max-w-screen-2xl container mx-auto xl:px-16 px-4">
          <div className=" grid grid-cols-2 gap-4 ">
            <div className="hero-text-box p-10 z-40">
              <h3 className="text-6xl font-heroHeading mb-8 leading-tight">
                it&apos;s not just Food, It&apos;s an Experience.
              </h3>
              <p
                className="text-xl font-normal mb-10 tracking-wide text-justify text-secondary "
                style={{ textShadow: "0px 0px 1px  rgba(0, 0, 0, 0.30)" }}
              >
                BeFoodie is your ultimate destination for healthy and fast food
                options.Experience the perfect blend of flavor and wellness with
                every bite at BeFoodie.
              </p>
              <div className="flex items-center	">
                <input
                  type="text"
                  placeholder="Search item here..."
                  className="px-5 py-2 pe-24 h-12 rounded-l-lg "
                  style={{ boxShadow: "0 0 5px #717171" }}
                />
                <a
                  href="#"
                  style={{ boxShadow: "0 0 5px #717171" }}
                  className="btn btn-md bg-red text-white rounded-r-lg rounded-l-none hover:bg-white hover:text-red hover:border-red border-red px-8  h-[2rem] text-xl"
                >
                  Search
                </a>
              </div>
            </div>
            <div className="overlay"></div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Banner;
