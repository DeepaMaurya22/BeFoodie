import { useEffect, useState } from "react";
import data from "../../data.json";
import Card from "../../components/Card";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("../../data.json");
        // const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // filtering data based on category
  const filterdata = (category) => {
    category === "all"
      ? menu
      : menu.filter((item) => item.category === category);

    setFilteredItems(filterdata);
    setSelectedCategory(category);
  };

  // show all data
  const showall = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
  };

  // sorting based on a-z, z-a , low to high pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
  };
  return (
    <div className="grid grid-cols-3 ">
      {/* category */}
      {/* cards */}
      {filteredItems.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
}

export default Menu;
