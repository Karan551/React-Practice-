import Header from "./Components/Header";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import AddItem from "./Components/AddItem";
import SearchItem from "./Components/SearchItem";
import { useState, useEffect } from "react";
import { data } from "./data";
import { apiRequest } from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3000/items";

  const css_styles = { fontSize: "1.5rem", flexGrow: "1", display: "grid", placeContent: "center", color: "red" };

  const storedData = JSON.parse(localStorage.getItem("shopplingList"));

  const [items, setItems] = useState(storedData || []);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage.setItem("shopplingList", JSON.stringify(items));

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error("Did not any recieved Data.");
        const data = await response.json();

        setItems(data);

      } catch (error) {
        console.log(error.message);
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchItems();
    }, 2000);


  }, []);


  const handlCheck = async (id) => {

    const listItems = items.map((eachObject) => (eachObject.id === id ? { ...eachObject, checked: !eachObject.checked } : eachObject));

    setItems(listItems);

    const updatedItem = listItems.filter((eachObject) => eachObject.id === id);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ checked: updatedItem[0].checked })

    };

    const result = await apiRequest(`${API_URL}/${id}`, updateOptions);

    if (result)
      setFetchError(result);


  };

  const handleDelete = async (id) => {
    const listItems = items.filter((eachObject) => eachObject.id !== id);

    setItems(listItems);

    const deleteOptions = {
      method: "DELETE"
    };
    const result = await apiRequest(`${API_URL}/${id}`, deleteOptions);

    if (result)
      setFetchError(result);

  };


  const addItem = async (item) => {
    const id = items.length ? Number(items[items.length - 1].id) + 1 + "" : 1 + "";

    const myNewItem = { id, item, checked: false };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myNewItem)
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result)
      setFetchError(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const handleSearch = () => {
    const result = items.filter((eachObject) => (eachObject.item.toLowerCase().includes(search.toLowerCase())));
  };



  return (
    <div className="app">

      <Header title="Grocery Lists" />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <main className="main">
        {loading && <p style={{ ...css_styles, color: "green" }}>Loading Items....</p>}
        {fetchError && <p style={css_styles}>Error :{fetchError}</p>}

        {!fetchError && !loading &&
          <Content
            items={items.filter((eachObject) => (eachObject.item.toLowerCase().includes(search.toLowerCase())))}
            handlCheck={handlCheck}
            handleDelete={handleDelete}
            css_styles={css_styles}

          />
        }
      </main>

      <Footer length={items.length} />

    </div>
  );

}
export default App;
