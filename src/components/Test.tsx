import { useEffect, useState, KeyboardEvent } from "react";

export default function Test() {
  const [results, setResults] = useState({});

  const SEARCH_API_KEY = "AIzaSyCOLL3M-8mEjre4jGbro-yHzpoHgAHF4Mo";
  const SEARCH_ENGINE_ID = "71000c4bdef2a4705";
  const getSearchURL = (query: string) =>
    `https://www.googleapis.com/customsearch/v1?key=${SEARCH_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;

  const keyDownHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (!(["KeyJ"].includes(event.code) && event.ctrlKey)) return;
    console.log("fire");
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const barcode: string = new String(target.value) as string;
    target.value = "";
    const url: string = getSearchURL(barcode);

    const response = await fetch(new URL(url), {
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    setResults(
      json.items
        .filter(
          (i: { pagemap: object }) =>
            Object.keys(i.pagemap).includes("offer") ||
            Object.keys(i.pagemap).includes("product")
        )
        .reduce(
          (
            m: { offers: Array<object>, products: Array<object> },
            i: { pagemap: { offer: Array<object>, product: Array<object> } }
          ) => {
            if (i.pagemap.offer) {
              m.offers.push(i.pagemap.offer[0]);
            }
            if (i.pagemap.product) {
              m.products.push(i.pagemap.product[0]);
            }
            return m;
          },
          {offers: [], products: []}
        )
    );
  };

  return (
    <div>
      <input
        type="text"
        name="barcode"
        id="barcode"
        autoFocus
        onKeyDown={keyDownHandler}
      />
      <pre
        id="response"
        style={{ color: "black" }}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(results, null, 2) }}
      >
        {}
      </pre>
    </div>
  );
}
