function Card({ item }) {
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-md h-[22rem] overflow-hidden w-[20rem] rounded-lg p-3 ">
        <figure className="h-[13rem] bg-center bg-cover rounded-md">
          <img src={item.image} alt="Shoes" />
        </figure>
        <div className="card-body pb-0">
          <h2 className="card-title ">{item.title}</h2>
          <p
            className="font-normal text-[0.8rem] tracking-wider"
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {item.description}
          </p>
          <div className="card-actions justify-start">
            <button className="btn bg-red text-white hover:bg-red">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
