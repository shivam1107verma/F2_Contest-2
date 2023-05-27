let coinArray = [];
//fetching data
const response = fetch(
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
);

response.then((data) => {
  console.log(data);

  let prom = data.json();

  prom.then((finaldata) => {
    coinArray = finaldata;
    appendIntoWebpage(finaldata);
  });
  prom.catch((finaldata) => {
    console.log("Something went wrong");
  });
});

response.catch((data) => {
  console.log("Something went wrong");
});

let div = document.getElementById("item_container");
let input = document.getElementById("byname").value;
let table = document.getElementById("tblarr");

//diplaying data into webpage
function appendIntoWebpage(arr) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  console.log(arr);
  table.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let tr = document.createElement("tr");
    let imgcoin = document.createElement("img");
    imgcoin.src = arr[i].image;
    let tdimage = document.createElement("td");
    let tdname = document.createElement("td");
    let tdsym = document.createElement("td");
    let tdcurrentprice = document.createElement("td");
    let tdmktcapchange = document.createElement("td");
    let tdsymktcappercent = document.createElement("td");
    let tdmktcap = document.createElement("td");
    imgcoin.className = "coinimageclass";
    tr.className = "tabletr";
    tdimage.appendChild(imgcoin);
    tdname.innerText = arr[i].name;
    tdsym.innerText = arr[i].symbol.toUpperCase();
    tdcurrentprice.innerText = formatter.format(arr[i].current_price);
    tdmktcapchange.innerText = formatter.format(arr[i].market_cap_change_24h);

    tdsymktcappercent.innerText =
      arr[i].market_cap_change_percentage_24h.toFixed(2) + "%";
    tdmktcap.innerText = "Mkt Cap: " + formatter.format(arr[i].market_cap);
    if (arr[i].market_cap_change_percentage_24h >= 0) {
      tdsymktcappercent.style.color = "green";
    } else {
      tdsymktcappercent.style.color = "red";
    }
    tr.appendChild(tdimage);
    tr.appendChild(tdname);
    tr.appendChild(tdsym);
    tr.appendChild(tdcurrentprice);
    tr.appendChild(tdmktcapchange);
    tr.appendChild(tdsymktcappercent);
    tr.appendChild(tdmktcap);
    table.appendChild(tr);
  }
}

//searching bases on name or symbol
function inputOnChange(e) {
  let val = document.getElementById("byname").value.toUpperCase();
  if (val === "") {
    appendIntoWebpage(coinArray);
  } else {
    let result = coinArray.filter(
      (item) =>
        item.name.toUpperCase() == val || item.symbol.toUpperCase() == val
    );
    appendIntoWebpage(result);
  }
}

//sorting based on market cap
function sortbymktasc() {
  let sortedmktcap = coinArray.sort((a, b) => {
    return a.market_cap - b.market_cap;
  });
  appendIntoWebpage(sortedmktcap);
}

//sorting based on percentage
function sortbypercent() {
  let sortedpercent = coinArray.sort((a, b) => {
    return (
      a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h
    );
  });
  appendIntoWebpage(sortedpercent);
}
