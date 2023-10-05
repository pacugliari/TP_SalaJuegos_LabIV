import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerrosService {

  razas = [
    "affenpinscher",
    "african",
    "airedale",
    "akita",
    "appenzeller",
    "australian/shepherd",
    "basenji",
    "beagle",
    "bluetick",
    "borzoi",
    "bouvier",
    "boxer",
    "brabancon",
    "briard",
    "buhund/norwegian",
    "bulldog/boston",
    "bulldog/english",
    "bulldog/french",
    "bullterrier/staffordshire",
    "cattledog/australian",
    "cavapoo",
    "chihuahua",
    "chow",
    "clumber",
    "cockapoo",
    "collie/border",
    "coonhound",
    "corgi/cardigan",
    "cotondetulear",
    "dachshund",
    "dalmatian",
    "dane/great",
    "deerhound/scottish",
    "dhole",
    "dingo",
    "doberman",
    "elkhound/norwegian",
    "entlebucher",
    "eskimo",
    "finnish/lapphund",
    "frise/bichon",
    "germanshepherd",
    "greyhound/italian",
    "groenendael",
    "havanese",
    "hound/afghan",
    "hound/basset",
    "hound/blood",
    "hound/english",
    "hound/ibizan",
    "hound/plott",
    "hound/walker",
    "husky",
    "keeshond",
    "kelpie",
    "komondor",
    "kuvasz",
    "labradoodle",
    "labrador",
    "leonberg",
    "lhasa",
    "malamute",
    "malinois",
    "maltese",
    "mastiff/bull",
    "mastiff/english",
    "mastiff/tibetan",
    "mexicanhairless",
    "mountain/bernese",
    "mountain/swiss",
    "newfoundland",
    "otterhound",
    "ovcharka/caucasian",
    "papillon",
    "pekinese",
    "pembroke",
    "pinscher/miniature",
    "pitbull",
    "pointer/german",
    "pointer/germanlonghair",
    "pomeranian",
    "poodle/medium",
    "poodle/miniature",
    "poodle/standard",
    "poodle/toy",
    "pug",
    "puggle",
    "pyrenees",
    "redbone",
    "retriever/chesapeake",
    "retriever/curly",
    "retriever/flatcoated",
    "retriever/golden",
    "ridgeback/rhodesian",
    "rottweiler",
    "saluki",
    "samoyed",
    "schipperke",
    "schnauzer/giant",
    "schnauzer/miniature",
    "segugio/italian",
    "setter/english",
    "setter/gordon",
    "setter/irish",
    "sharpei",
    "sheepdog/english",
    "sheepdog/shetland",
    "shiba",
    "shihtzu",
    "spaniel/blenheim",
    "spaniel/brittany",
    "spaniel/cocker",
    "spaniel/irish",
    "spaniel/japanese",
    "spaniel/sussex",
    "spaniel/welsh",
    "spitz/japanese",
    "springer/english",
    "stbernard",
    "terrier/american",
    "terrier/australian",
    "terrier/bedlington",
    "terrier/border",
    "terrier/cairn",
    "terrier/dandie",
    "terrier/fox",
    "terrier/irish",
    "terrier/kerryblue",
    "terrier/lakeland",
    "terrier/norfolk",
    "terrier/norwich",
    "terrier/patterdale",
    "terrier/russell",
    "terrier/scottish",
    "terrier/sealyham",
    "terrier/silky",
    "terrier/tibetan",
    "terrier/toy",
    "terrier/welsh",
    "terrier/westhighland",
    "terrier/wheaten",
    "terrier/yorkshire",
    "tervuren",
    "vizsla",
    "waterdog/spanish",
    "weimaraner",
    "whippet",
    "wolfhound/irish",
  ];


  constructor(private http: HttpClient) {}

  TraerImagenPerro(raza:string) {
    return this.http.get(`https://dog.ceo/api/breed/${raza}/images/random`);
  }

  TraerOpciones(){
    const opcionesSeleccionadas: string[] = [];

    const indiceAleatorio1 = Math.floor(Math.random() * this.razas.length);
    
    opcionesSeleccionadas.push(this.razas[indiceAleatorio1]);

    let indiceAleatorio2;
    do {
      indiceAleatorio2 = Math.floor(Math.random() * this.razas.length);
    } while (indiceAleatorio2 === indiceAleatorio1);

    opcionesSeleccionadas.push(this.razas[indiceAleatorio2]);

    let indiceAleatorio3;
    do {
      indiceAleatorio3 = Math.floor(Math.random() * this.razas.length);
    } while (indiceAleatorio3 === indiceAleatorio1 || indiceAleatorio3 === indiceAleatorio2);

    opcionesSeleccionadas.push(this.razas[indiceAleatorio3]);

    let indiceAleatorio4;
    do {
      indiceAleatorio4 = Math.floor(Math.random() * this.razas.length);
    } while (indiceAleatorio4 === indiceAleatorio1 || indiceAleatorio4 === indiceAleatorio2 || indiceAleatorio4 === indiceAleatorio3);

    opcionesSeleccionadas.push(this.razas[indiceAleatorio4]);

    return opcionesSeleccionadas;
  }
  
}
