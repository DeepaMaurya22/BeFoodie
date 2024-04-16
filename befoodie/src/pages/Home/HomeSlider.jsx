import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import data from "../../data.json";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "grey",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "grey",
        borderRadius: "50%",
        fontSize: "2rem",
        color: "black",
      }}
      onClick={onClick}
    />
  );
}

function MultipleItems() {
  const [items, setItems] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("../../data.json");
        // const data = await response.json();
        console.log(data);
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="section-container slider-container mt-24 ">
      <div className="title text-left "> Menu</div>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div
            key={index}
            className="h-[19rem] overflow-hidden w-[15.5rem] rounded-lg p-3 "
          >
            <div className="h-[18rem] overflow-hidden w-[15.5rem] rounded-lg p-3">
              <div
                className="h-[12rem] bg-center bg-cover rounded-lg"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <h3 className="font-medium text-2xl mt-2 text-center">
                {item.title}
              </h3>
              <p
                className="font-normal text-[0.8rem] tracking-wider text-center"
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MultipleItems;
