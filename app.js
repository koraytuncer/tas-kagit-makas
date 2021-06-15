const kagitBtn = document.querySelector("#kagit");
const tasBtn = document.querySelector("#tas");
const makasBtn = document.querySelector("#makas");
const baslat = document.querySelector(".baslat");
const reset = document.querySelector(".reset");
const oyuncuSkor = document.querySelector("#oyuncuSkor");
const bilgisayarSkor = document.querySelector("#bilgisayarSkor");

//Inputlar Seçiliyor
kagitBtn.addEventListener("click", resDegistir);
makasBtn.addEventListener("click", resDegistir);
tasBtn.addEventListener("click", resDegistir);

let oyuncuHamle;
let bilgisayarHamle;
let oyuncuCount = 0;
let bilgisayarCount = 0;

//Oyuncu Hamlesini Seçiyor
function resDegistir(e) {
  let oyuncuResim = document.getElementById("oyuncuResim");

  var degisenResim = e.target.value;

  if (degisenResim === "tas") {
    oyuncuResim.src = "img/tas.png";
  } else if (degisenResim === "kagit") {
    oyuncuResim.src = "img/kagit.png";
  } else if (degisenResim === "makas") {
    oyuncuResim.src = "img/makas.png";
  }

  oyuncuHamle = degisenResim;
}

//Bilgisayar Hamlesini Seçiyor ve Oyun Başlıyor
baslat.addEventListener("click", bilgisayarHamleSec);

function bilgisayarHamleSec() {
  if (!oyuncuHamle) {
    addItem("warning", "Lütfen Seçim Yapınız!!");
    return;
  }
  let bilgisayarResim = document.getElementById("bilgisayarResim");

  var res = [
    {
      name: "tas",
      src: "img/tas.png",
    },
    {
      name: "kagit",
      src: "img/kagit.png",
    },
    {
      name: "makas",
      src: "img/makas.png",
    },
  ];

  index = 0;
  index = Math.floor(Math.random() * res.length);
  bilgisayarResim.src = res[index].src;

  bilgisayarHamle = res[index].name;
  kazanmaDurumu();
}
//Kazanma Durumu Denetleme
function kazanmaDurumu() {
  if (oyuncuHamle == bilgisayarHamle) {
    addItem("warning", "Berabere");
  } else if (oyuncuHamle === "tas") {
    if (bilgisayarHamle === "kagit") {
      addItem("danger", "Kaybettin!");
      skorUpdate("bilgisayar");
    } else if (bilgisayarHamle === "makas") {
      addItem("success", "Kazandın!");
      skorUpdate("oyuncu");
    }
  } else if (oyuncuHamle === "kagit") {
    if (bilgisayarHamle === "tas") {
      addItem("success", "Kazandın!");
      skorUpdate("oyuncu");
    } else if (bilgisayarHamle === "makas") {
      addItem("danger", "Kaybettin!");
      skorUpdate("bilgisayar");
    }
  } else if (oyuncuHamle === "makas") {
    if (bilgisayarHamle === "tas") {
      addItem("danger", "Kaybettin!");
      skorUpdate("bilgisayar");
    } else if (bilgisayarHamle === "kagit") {
      addItem("success", "Kazandın!");
      skorUpdate("oyuncu");
    }
  }
}

//Sıfırlanıyor
reset.addEventListener("click", resetle);
function resetle() {
  let bilgisayarResim = document.getElementById("bilgisayarResim");
  bilgisayarResim.src = "img/soru.png";
  oyuncuSkor.innerHTML = "Skor : 0";
  bilgisayarSkor.innerHTML = "Skor : 0";
  oyuncuCount = 0;
  bilgisayarCount = 0;

}
//Alert Oluşturuluyor
let alert = document.querySelector("#alertAlani");

function addItem(type, message) {
  var divDom = document.createElement("div");
  divDom.innerHTML = `
    <div class="alert alert-${type}" role="alert">
                        ${
                          oyuncuHamle
                            ? "Oyuncu :" +
                              oyuncuCount +
                              " vs " +
                              "Bilgisayar :" +
                              bilgisayarCount +
                              "<br>"
                            : ""
                        }
                        <strong>${message}</strong> 
                      </div>
    
    `;

  divDom.classList.add("col-sm-12", "col-md-12", "col-lg-10");

  alert.append(divDom);

  setTimeout(function () {
    divDom.remove();
  }, 3000);
}

// Skorlar
function skorUpdate(whoSkor) {
  if (whoSkor === "oyuncu") {
    oyuncuSkor.innerHTML = "Skor : " + ++oyuncuCount;
  } else {
    bilgisayarSkor.innerHTML = "Skor : " + ++bilgisayarCount;
  }
}
