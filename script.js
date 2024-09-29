const pitanja = {
    sport: [
        { tekst: "Ko je osvojio Svetsko prvenstvo u fudbalu 2018. godine?", odgovori: ["Francuska", "Brazil", "Nemačka", "Argentina"], tacan: 0 },
        { tekst: "Ko je osvojio Wimbledon 2011. godine?", odgovori: ["Novak Đoković", "Rafael Nadal", "Rodzer Federer", "Endi Marej"], tacan: 0 },
        { tekst: "Svetsko prvenstvo u košarci 2002. godine, na kom je Srbija (Jugoslavija) završila na prvom mestu, odigralo se u kom gradu?", odgovori: ["Baltimoru", "Torontu", "Indijanapolisu", "Hjustonu"], tacan: 2 },
        { tekst: "Koje godine je Novak Đoković osvojio prvu grend slem titulu?", odgovori: ["2007.", "2008.", "2009.", "2010."], tacan: 1 },
        { tekst: "U kom sportu se proslavio Aleksandar Karakašević?", odgovori: ["Moto trkama", "Snukeru", "Bacanju diska", "Stonom tenisu"], tacan: 3 }
    ],
    istorija: [
        { tekst: "U kom srodstvu su kralj Dragutin Nemanjić i kralj Milutin Nemanjić?", odgovori: ["Deda i unuk", "Otac i sin", "Stric i sinovac", "Braća"], tacan: 3 },
        { tekst: "Kraljevina SHS osnovana je?", odgovori: ["1918.", "1921.", "1914.", "1903."], tacan: 0 },
        { tekst: "Manastir Đurđevi stupovi je zadužbina?", odgovori: ["Stefana Nemanja", "Stefana Prvovenčanog", "Stefana Dečanskog", "Svetog Save"], tacan: 0 },
        { tekst: "Koliko vladara iz dinastije Nemanjića nije kanonizovano?", odgovori: ["Tri", "Svi su kanonizovani", "Nijedan", "Jedan"], tacan: 0 },
        { tekst: "Koje godine je bila Cerska bitka?", odgovori: ["1918.", "1917.", "1914.", "1916."], tacan: 3 }
    ],
    geografija: [
        { tekst: "Ono što je Tornik Zlatiboru, to je Trem:", odgovori: ["Suvoj planini", "Javoru", "Tupužnici", "Staroj planini"], tacan: 0 },
        { tekst: "Koja pećina se još zove i Lazareva pećina?", odgovori: ["Ravništarka", "Prekonoška", "Vernjikica", "Zlotska"], tacan: 3 },
        { tekst: "Koje je prvo zaštićeno prirodno područje u Evropi?", odgovori: ["Carska bara", "Obedska bara", "Stara Tisa", "Đerdap"], tacan: 1 },
        { tekst: "Gde se nalazi arheološki park Lazarev grad?", odgovori: ["Kruševac", "Kuršumlija", "Kraljevo", "Kragujevac"], tacan: 0 },
        { tekst: "U podnožju koje planine se nalazi Caričin grad, odnosno Justinijana Prima?", odgovori: ["Rogozne", "Jablanika", "Radan planine", "Rtanj"], tacan: 2 }
    ],
    knjizevnost: [
        { tekst: "Autor dela \"Za kim zvona zvone\" je ?", odgovori: ["Ernest Hemingvej", "Mark Tven", "Robert Džordan", "Čarls Dikens"], tacan: 0 },
        { tekst: "Ko je napisao književno delo \"Pop Ćira i Pop Spira\"?", odgovori: ["Dušan Kovačević", "Stevan Sremac", "Danilo Kiš", "Borislav Pekić"], tacan: 1 },
        { tekst: "Ko je napisao književno delo \"Seobe\"?", odgovori: ["Desanka Maksimović", "Laza Lazarević", "Joakim Vujić", "Miloš Crnjanski"], tacan: 3 },
        { tekst: "Tatjana i Lenski su likovi iz poznatog djela Aleksandra S. Puškina?", odgovori: ["Cigani", "Evgenije Onjegin", "Kapetanova kći", "Braća razbojnici"], tacan: 1 },
        { tekst: "Kao i svaki drugi srednjovjekovni vitez, koji je težio da osvoji plemenitu damu, Don Kihot sve svoje podvige posvećuje??", odgovori: ["Lauri", "Loreni", "Dulsinei", "Dorotei"], tacan: 2 }
    ]
};

let brojacTacnih = 0; // promenljiva Brojac tacnih odgovora postavljen na 0

// Dodaje se dogadjaj klik na dugme koje je povuceno iz ID-ja 

document.getElementById('start').addEventListener('click', () => {
    const kategorija = document.getElementById('kategorija').value;
    startKviz(kategorija); //Poyiva se f-ja za izabranu kategoriju
});

// F-ja za start kviza

function startKviz(kategorija) {
    document.getElementById('kviz').style.display = 'block';
    document.getElementById('start').style.display = 'none'; 
    showPitanje(kategorija, 0);
}

// F-ja za resetovanje kviza

function resetujKviz() {
    brojacTacnih = 0; // Resetujemo broj tačnih odgovora
    const rezultatDiv = document.getElementById('rezultat');
    rezultatDiv.style.display = 'none'; // Sakriven
    document.getElementById('start').style.display = 'block'; 
    document.getElementById('restart').style.display = 'none';
    document.getElementById('kviz').style.display = 'none';
}

// Funkcija da se pokaze pitanje 

function showPitanje(kategorija, indeks) {
    const pitanje = pitanja[kategorija][indeks];
    document.getElementById('pitanje').textContent = pitanje.tekst;
    
    const odgovori = [document.getElementById('odgovor1'), document.getElementById('odgovor2'), document.getElementById('odgovor3'), document.getElementById('odgovor4')];
    odgovori.forEach((btn, i) => {
        btn.textContent = pitanje.odgovori[i];
        btn.style.backgroundColor = '';
        btn.onclick = () => {

            if (i === pitanje.tacan) {
                btn.style.backgroundColor = ' rgb(75, 255, 75)'; 
                brojacTacnih++; 
            } else {
                btn.style.backgroundColor = ' rgb(255, 25, 25)'; 
                const tacanOdgovorBtn = odgovori[pitanje.tacan];
                tacanOdgovorBtn.style.backgroundColor = ' rgb(75, 255, 75)';
            }

            // Automatski prelazak na sledeće pitanje nakon 1 sekunde

            setTimeout(() => {
                if (indeks + 1 < pitanja[kategorija].length) {
                    showPitanje(kategorija, indeks + 1);
                } else {
                    // Kada su sva pitanja postavljena, ispisuje koliko je bilo tačnih odgovora
                    const rezultatDiv = document.getElementById('rezultat');
                    rezultatDiv.textContent = `KRAJ KVIZA! Broj tačnih odgovora: ` + brojacTacnih + `/5`;
                    rezultatDiv.style.display = 'block'; 
                    document.getElementById('restart').style.display = 'block'; 
                }
            }, 1000); // 1sek

        };
    });
}

document.getElementById('restart').addEventListener('click', resetujKviz);

