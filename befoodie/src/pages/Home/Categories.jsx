const CategoryItem = [
  {
    id: 1,
    name: "Pizza",
    image: "burger2.jpeg",
    desc: "lorem ipson ustomer favourit ",
  },
  {
    id: 1,
    name: "Pizza",
    image: "burger2.jpeg",
    desc: "lorem ipson ustomer favourit lorem ipson ustomer favourit lorem ipson ustomer favourit lorem ipson ustomer favourit lorem ipson ustomer favourit lorem ipson ustomer favourit",
  },
  {
    id: 1,
    name: "Pizza",
    image: "burger2.jpeg",
    desc: "lorem ipson ustomer favourit ",
  },
];

function Categories() {
  return (
    <>
      <div className="section-container">
        <div className="subtitle">Customer Favourite</div>
        <div className="title">Popular Categories</div>
        <div className="flex flex-wrap gap-8 mx-auto align-middle justify-center">
          {CategoryItem.map((item, index) => (
            <div
              key={index}
              className="h-[18rem] overflow-hidden w-[20rem] rounded-lg p-3 hover:translate-y-4 duration-300 transition-all"
              style={{ boxShadow: "0 0 5px rgb(161, 161, 161)" }}
            >
              <div
                className="h-[12rem] bg-center bg-cover rounded-lg"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="font-medium text-2xl mt-2">{item.name}</div>
              <div
                className="font-normal text-[0.8rem] tracking-wider"
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
