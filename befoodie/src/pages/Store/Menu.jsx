import { useEffect, useState } from "react";
import data from "../../data.json";
import Card from "../../components/Card";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (sortOption !== "default") {
      handleSortChange(sortOption);
    }
  }, [sortOption, filteredItems]);

  const filterDataByCategory = (category) => {
    const filteredData =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(filteredData);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

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
    setCurrentPage(1);
  };

  // // Pagination Logic
  const itemsPerPage = 6;

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const truncatedPages = totalPages > 3 ? 3 : totalPages;
  const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div>
      <div className="flex">
        <div className="section-container flex flex-wrap justify-start md:items-center md:gap-8 gap-4 flex-wrap py-8 ms-20">
          <button
            className={selectedCategory === "all" ? "active" : ""}
            onClick={showAll}
          >
            All
          </button>
          <button
            className={selectedCategory === "pizza" ? "active" : ""}
            onClick={() => filterDataByCategory("pizza")}
          >
            Pizza
          </button>
          <button
            className={selectedCategory === "Veg" ? "active" : ""}
            onClick={() => filterDataByCategory("Veg")}
          >
            Veg
          </button>
          <button
            className={selectedCategory === "NonVeg" ? "active" : ""}
            onClick={() => filterDataByCategory("NonVeg")}
          >
            Non-Veg
          </button>
          <button
            className={selectedCategory === "Dessert" ? "active" : ""}
            onClick={() => filterDataByCategory("Dessert")}
          >
            Dessert
          </button>
          <button
            className={selectedCategory === "FastFood" ? "active" : ""}
            onClick={() => filterDataByCategory("FastFood")}
          >
            FastFood
          </button>
          <button
            className={selectedCategory === "Drinks" ? "active" : ""}
            onClick={() => filterDataByCategory("Drinks")}
          >
            Drinks
          </button>

          {/* Sorting dropdown */}
          <div className="ms-auto">
            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="default" disabled>
                Sort by
              </option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High Price</option>
              <option value="high-to-low">High to Low Price</option>
            </select>
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className="flex flex-wrap gap-8 mx-auto align-middle justify-center">
        {currentItems.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: truncatedPages }, (_, i) => {
          // const pageNumber = i + 1;
          const pageOffset = Math.max(currentPage - 2, 1); // Ensure current page is visible
          const currentPageNumber = pageOffset + i;
          return (
            <button
              key={i}
              onClick={() => paginate(currentPageNumber)}
              className={`mx-1 px-3 py-1 bg-gray-200 rounded ${
                currentPage === currentPageNumber
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              {currentPageNumber}
            </button>
          );
        })}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>{" "}
    </div>
  );
}

export default Menu;
