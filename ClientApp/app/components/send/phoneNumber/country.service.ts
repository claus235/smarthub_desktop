import { Injectable } from '@angular/core';
import { Country } from "./country.model";

@Injectable()
export class CountryService {
    private countries: Country[];

    constructor() {
    }

    /**
     * Returns the countries
     */
    public getCountries(): Country[] {
        if (!this.countries || this.countries.length == 0)
            this.countries = this.loadCountries();
        return this.countries;
    }

    /**
     * Load and returns the countries
     */
    private loadCountries(locale: string = 'en'): Country[] {
        let countries = [
            {
                "name": "Afghanistan (‫افغانستان‬‎)",
                "dialCode": "93",
                "countryCode": "af"
            },
            {
                "name": "Albania (Shqipëri)",
                "dialCode": "355",
                "countryCode": "al"
            },
            {
                "name": "Algeria (‫الجزائر‬‎)",
                "dialCode": "213",
                "countryCode": "dz"
            },
            {
                "name": "American Samoa",
                "dialCode": "1684",
                "countryCode": "as"
            },
            {
                "name": "Andorra",
                "dialCode": "376",
                "countryCode": "ad"
            },
            {
                "name": "Angola",
                "dialCode": "244",
                "countryCode": "ao"
            },
            {
                "name": "Anguilla",
                "dialCode": "1264",
                "countryCode": "ai"
            },
            {
                "name": "Antigua and Barbuda",
                "dialCode": "1268",
                "countryCode": "ag"
            },
            {
                "name": "Argentina",
                "dialCode": "54",
                "countryCode": "ar"
            },
            {
                "name": "Armenia (Հայաստան)",
                "dialCode": "374",
                "countryCode": "am"
            },
            {
                "name": "Aruba",
                "dialCode": "297",
                "countryCode": "aw"
            },
            {
                "name": "Australia",
                "dialCode": "61",
                "countryCode": "au"
            },
            {
                "name": "Austria (Österreich)",
                "dialCode": "43",
                "countryCode": "at"
            },
            {
                "name": "Azerbaijan (Azərbaycan)",
                "dialCode": "994",
                "countryCode": "az"
            },
            {
                "name": "Bahamas",
                "dialCode": "1242",
                "countryCode": "bs"
            },
            {
                "name": "Bahrain (‫البحرين‬‎)",
                "dialCode": "973",
                "countryCode": "bh"
            },
            {
                "name": "Bangladesh (বাংলাদেশ)",
                "dialCode": "880",
                "countryCode": "bd"
            },
            {
                "name": "Barbados",
                "dialCode": "1246",
                "countryCode": "bb"
            },
            {
                "name": "Belarus (Беларусь)",
                "dialCode": "375",
                "countryCode": "by"
            },
            {
                "name": "Belgium (België)",
                "dialCode": "32",
                "countryCode": "be"
            },
            {
                "name": "Belize",
                "dialCode": "501",
                "countryCode": "bz"
            },
            {
                "name": "Benin (Bénin)",
                "dialCode": "229",
                "countryCode": "bj"
            },
            {
                "name": "Bermuda",
                "dialCode": "1441",
                "countryCode": "bm"
            },
            {
                "name": "Bhutan (འབྲུག)",
                "dialCode": "975",
                "countryCode": "bt"
            },
            {
                "name": "Bolivia",
                "dialCode": "591",
                "countryCode": "bo"
            },
            {
                "name": "Bosnia and Herzegovina (Босна и Херцеговина)",
                "dialCode": "387",
                "countryCode": "ba"
            },
            {
                "name": "Botswana",
                "dialCode": "267",
                "countryCode": "bw"
            },
            {
                "name": "Brazil (Brasil)",
                "dialCode": "55",
                "countryCode": "br"
            },
            {
                "name": "British Indian Ocean Territory",
                "dialCode": "246",
                "countryCode": "io"
            },
            {
                "name": "British Virgin Islands",
                "dialCode": "1284",
                "countryCode": "vg"
            },
            {
                "name": "Brunei",
                "dialCode": "673",
                "countryCode": "bn"
            },
            {
                "name": "Bulgaria (България)",
                "dialCode": "359",
                "countryCode": "bg"
            },
            {
                "name": "Burkina Faso",
                "dialCode": "226",
                "countryCode": "bf"
            },
            {
                "name": "Burundi (Uburundi)",
                "dialCode": "257",
                "countryCode": "bi"
            },
            {
                "name": "Cambodia (កម្ពុជា)",
                "dialCode": "855",
                "countryCode": "kh"
            },
            {
                "name": "Cameroon (Cameroun)",
                "dialCode": "237",
                "countryCode": "cm"
            },
            {
                "name": "Canada",
                "dialCode": "1",
                "countryCode": "ca"
            },
            {
                "name": "Cape Verde (Kabu Verdi)",
                "dialCode": "238",
                "countryCode": "cv"
            },
            {
                "name": "Caribbean Netherlands",
                "dialCode": "599",
                "countryCode": "bq"
            },
            {
                "name": "Cayman Islands",
                "dialCode": "1345",
                "countryCode": "ky"
            },
            {
                "name": "Central African Republic (République centrafricaine)",
                "dialCode": "236",
                "countryCode": "cf"
            },
            {
                "name": "Chad (Tchad)",
                "dialCode": "235",
                "countryCode": "td"
            },
            {
                "name": "Chile",
                "dialCode": "56",
                "countryCode": "cl"
            },
            {
                "name": "China (中国)",
                "dialCode": "86",
                "countryCode": "cn"
            },
            {
                "name": "Colombia",
                "dialCode": "57",
                "countryCode": "co"
            },
            {
                "name": "Comoros (‫جزر القمر‬‎)",
                "dialCode": "269",
                "countryCode": "km"
            },
            {
                "name": "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
                "dialCode": "243",
                "countryCode": "cd"
            },
            {
                "name": "Congo (Republic) (Congo-Brazzaville)",
                "dialCode": "242",
                "countryCode": "cg"
            },
            {
                "name": "Cook Islands",
                "dialCode": "682",
                "countryCode": "ck"
            },
            {
                "name": "Costa Rica",
                "dialCode": "506",
                "countryCode": "cr"
            },
            {
                "name": "Côte d’Ivoire",
                "dialCode": "225",
                "countryCode": "ci"
            },
            {
                "name": "Croatia (Hrvatska)",
                "dialCode": "385",
                "countryCode": "hr"
            },
            {
                "name": "Cuba",
                "dialCode": "53",
                "countryCode": "cu"
            },
            {
                "name": "Curaçao",
                "dialCode": "599",
                "countryCode": "cw"
            },
            {
                "name": "Cyprus (Κύπρος)",
                "dialCode": "357",
                "countryCode": "cy"
            },
            {
                "name": "Czech Republic (Česká republika)",
                "dialCode": "420",
                "countryCode": "cz"
            },
            {
                "name": "Denmark (Danmark)",
                "dialCode": "45",
                "countryCode": "dk"
            },
            {
                "name": "Djibouti",
                "dialCode": "253",
                "countryCode": "dj"
            },
            {
                "name": "Dominica",
                "dialCode": "1767",
                "countryCode": "dm"
            },
            {
                "name": "Dominican Republic (República Dominicana)",
                "dialCode": "1",
                "countryCode": "do"
            },
            {
                "name": "Ecuador",
                "dialCode": "593",
                "countryCode": "ec"
            },
            {
                "name": "Egypt (‫مصر‬‎)",
                "dialCode": "20",
                "countryCode": "eg"
            },
            {
                "name": "El Salvador",
                "dialCode": "503",
                "countryCode": "sv"
            },
            {
                "name": "Equatorial Guinea (Guinea Ecuatorial)",
                "dialCode": "240",
                "countryCode": "gq"
            },
            {
                "name": "Eritrea",
                "dialCode": "291",
                "countryCode": "er"
            },
            {
                "name": "Estonia (Eesti)",
                "dialCode": "372",
                "countryCode": "ee"
            },
            {
                "name": "Ethiopia",
                "dialCode": "251",
                "countryCode": "et"
            },
            {
                "name": "Falkland Islands (Islas Malvinas)",
                "dialCode": "500",
                "countryCode": "fk"
            },
            {
                "name": "Faroe Islands (Føroyar)",
                "dialCode": "298",
                "countryCode": "fo"
            },
            {
                "name": "Fiji",
                "dialCode": "679",
                "countryCode": "fj"
            },
            {
                "name": "Finland (Suomi)",
                "dialCode": "358",
                "countryCode": "fi"
            },
            {
                "name": "France",
                "dialCode": "33",
                "countryCode": "fr"
            },
            {
                "name": "French Guiana (Guyane française)",
                "dialCode": "594",
                "countryCode": "gf"
            },
            {
                "name": "French Polynesia (Polynésie française)",
                "dialCode": "689",
                "countryCode": "pf"
            },
            {
                "name": "Gabon",
                "dialCode": "241",
                "countryCode": "ga"
            },
            {
                "name": "Gambia",
                "dialCode": "220",
                "countryCode": "gm"
            },
            {
                "name": "Georgia (საქართველო)",
                "dialCode": "995",
                "countryCode": "ge"
            },
            {
                "name": "Germany (Deutschland)",
                "dialCode": "49",
                "countryCode": "de"
            },
            {
                "name": "Ghana (Gaana)",
                "dialCode": "233",
                "countryCode": "gh"
            },
            {
                "name": "Gibraltar",
                "dialCode": "350",
                "countryCode": "gi"
            },
            {
                "name": "Greece (Ελλάδα)",
                "dialCode": "30",
                "countryCode": "gr"
            },
            {
                "name": "Greenland (Kalaallit Nunaat)",
                "dialCode": "299",
                "countryCode": "gl"
            },
            {
                "name": "Grenada",
                "dialCode": "1473",
                "countryCode": "gd"
            },
            {
                "name": "Guadeloupe",
                "dialCode": "590",
                "countryCode": "gp"
            },
            {
                "name": "Guam",
                "dialCode": "1671",
                "countryCode": "gu"
            },
            {
                "name": "Guatemala",
                "dialCode": "502",
                "countryCode": "gt"
            },
            {
                "name": "Guernsey",
                "dialCode": "44",
                "countryCode": "gg"
            },
            {
                "name": "Guinea (Guinée)",
                "dialCode": "224",
                "countryCode": "gn"
            },
            {
                "name": "Guinea-Bissau (Guiné Bissau)",
                "dialCode": "245",
                "countryCode": "gw"
            },
            {
                "name": "Guyana",
                "dialCode": "592",
                "countryCode": "gy"
            },
            {
                "name": "Haiti",
                "dialCode": "509",
                "countryCode": "ht"
            },
            {
                "name": "Honduras",
                "dialCode": "504",
                "countryCode": "hn"
            },
            {
                "name": "Hong Kong (香港)",
                "dialCode": "852",
                "countryCode": "hk"
            },
            {
                "name": "Hungary (Magyarország)",
                "dialCode": "36",
                "countryCode": "hu"
            },
            {
                "name": "Iceland (Ísland)",
                "dialCode": "354",
                "countryCode": "is"
            },
            {
                "name": "India (भारत)",
                "dialCode": "91",
                "countryCode": "in"
            },
            {
                "name": "Indonesia",
                "dialCode": "62",
                "countryCode": "id"
            },
            {
                "name": "Iran (‫ایران‬‎)",
                "dialCode": "98",
                "countryCode": "ir"
            },
            {
                "name": "Iraq (‫العراق‬‎)",
                "dialCode": "964",
                "countryCode": "iq"
            },
            {
                "name": "Ireland",
                "dialCode": "353",
                "countryCode": "ie"
            },
            {
                "name": "Isle of Man",
                "dialCode": "44",
                "countryCode": "im"
            },
            {
                "name": "Israel (‫ישראל‬‎)",
                "dialCode": "972",
                "countryCode": "il"
            },
            {
                "name": "Italy (Italia)",
                "dialCode": "39",
                "countryCode": "it"
            },
            {
                "name": "Jamaica",
                "dialCode": "1876",
                "countryCode": "jm"
            },
            {
                "name": "Japan (日本)",
                "dialCode": "81",
                "countryCode": "jp"
            },
            {
                "name": "Jersey",
                "dialCode": "44",
                "countryCode": "je"
            },
            {
                "name": "Jordan (‫الأردن‬‎)",
                "dialCode": "962",
                "countryCode": "jo"
            },
            {
                "name": "Kazakhstan (Казахстан)",
                "dialCode": "7",
                "countryCode": "kz"
            },
            {
                "name": "Kenya",
                "dialCode": "254",
                "countryCode": "ke"
            },
            {
                "name": "Kiribati",
                "dialCode": "686",
                "countryCode": "ki"
            },
            {
                "name": "Kosovo",
                "dialCode": "383",
                "countryCode": "xk"
            },
            {
                "name": "Kuwait (‫الكويت‬‎)",
                "dialCode": "965",
                "countryCode": "kw"
            },
            {
                "name": "Kyrgyzstan (Кыргызстан)",
                "dialCode": "996",
                "countryCode": "kg"
            },
            {
                "name": "Laos (ລາວ)",
                "dialCode": "856",
                "countryCode": "la"
            },
            {
                "name": "Latvia (Latvija)",
                "dialCode": "371",
                "countryCode": "lv"
            },
            {
                "name": "Lebanon (‫لبنان‬‎)",
                "dialCode": "961",
                "countryCode": "lb"
            },
            {
                "name": "Lesotho",
                "dialCode": "266",
                "countryCode": "ls"
            },
            {
                "name": "Liberia",
                "dialCode": "231",
                "countryCode": "lr"
            },
            {
                "name": "Libya (‫ليبيا‬‎)",
                "dialCode": "218",
                "countryCode": "ly"
            },
            {
                "name": "Liechtenstein",
                "dialCode": "423",
                "countryCode": "li"
            },
            {
                "name": "Lithuania (Lietuva)",
                "dialCode": "370",
                "countryCode": "lt"
            },
            {
                "name": "Luxembourg",
                "dialCode": "352",
                "countryCode": "lu"
            },
            {
                "name": "Macau (澳門)",
                "dialCode": "853",
                "countryCode": "mo"
            },
            {
                "name": "Macedonia (FYROM) (Македонија)",
                "dialCode": "389",
                "countryCode": "mk"
            },
            {
                "name": "Madagascar (Madagasikara)",
                "dialCode": "261",
                "countryCode": "mg"
            },
            {
                "name": "Malawi",
                "dialCode": "265",
                "countryCode": "mw"
            },
            {
                "name": "Malaysia",
                "dialCode": "60",
                "countryCode": "my"
            },
            {
                "name": "Maldives",
                "dialCode": "960",
                "countryCode": "mv"
            },
            {
                "name": "Mali",
                "dialCode": "223",
                "countryCode": "ml"
            },
            {
                "name": "Malta",
                "dialCode": "356",
                "countryCode": "mt"
            },
            {
                "name": "Marshall Islands",
                "dialCode": "692",
                "countryCode": "mh"
            },
            {
                "name": "Martinique",
                "dialCode": "596",
                "countryCode": "mq"
            },
            {
                "name": "Mauritania (‫موريتانيا‬‎)",
                "dialCode": "222",
                "countryCode": "mr"
            },
            {
                "name": "Mauritius (Moris)",
                "dialCode": "230",
                "countryCode": "mu"
            },
            {
                "name": "Mayotte",
                "dialCode": "262",
                "countryCode": "yt"
            },
            {
                "name": "Mexico (México)",
                "dialCode": "52",
                "countryCode": "mx"
            },
            {
                "name": "Micronesia",
                "dialCode": "691",
                "countryCode": "fm"
            },
            {
                "name": "Moldova (Republica Moldova)",
                "dialCode": "373",
                "countryCode": "md"
            },
            {
                "name": "Monaco",
                "dialCode": "377",
                "countryCode": "mc"
            },
            {
                "name": "Mongolia (Монгол)",
                "dialCode": "976",
                "countryCode": "mn"
            },
            {
                "name": "Montenegro (Crna Gora)",
                "dialCode": "382",
                "countryCode": "me"
            },
            {
                "name": "Montserrat",
                "dialCode": "1664",
                "countryCode": "ms"
            },
            {
                "name": "Morocco (‫المغرب‬‎)",
                "dialCode": "212",
                "countryCode": "ma"
            },
            {
                "name": "Mozambique (Moçambique)",
                "dialCode": "258",
                "countryCode": "mz"
            },
            {
                "name": "Myanmar (Burma) (မြန်မာ)",
                "dialCode": "95",
                "countryCode": "mm"
            },
            {
                "name": "Namibia (Namibië)",
                "dialCode": "264",
                "countryCode": "na"
            },
            {
                "name": "Nauru",
                "dialCode": "674",
                "countryCode": "nr"
            },
            {
                "name": "Nepal (नेपाल)",
                "dialCode": "977",
                "countryCode": "np"
            },
            {
                "name": "Netherlands (Nederland)",
                "dialCode": "31",
                "countryCode": "nl"
            },
            {
                "name": "New Caledonia (Nouvelle-Calédonie)",
                "dialCode": "687",
                "countryCode": "nc"
            },
            {
                "name": "New Zealand",
                "dialCode": "64",
                "countryCode": "nz"
            },
            {
                "name": "Nicaragua",
                "dialCode": "505",
                "countryCode": "ni"
            },
            {
                "name": "Niger (Nijar)",
                "dialCode": "227",
                "countryCode": "ne"
            },
            {
                "name": "Nigeria",
                "dialCode": "234",
                "countryCode": "ng"
            },
            {
                "name": "Niue",
                "dialCode": "683",
                "countryCode": "nu"
            },
            {
                "name": "Norfolk Island",
                "dialCode": "672",
                "countryCode": "nf"
            },
            {
                "name": "North Korea (조선 민주주의 인민 공화국)",
                "dialCode": "850",
                "countryCode": "kp"
            },
            {
                "name": "Northern Mariana Islands",
                "dialCode": "1670",
                "countryCode": "mp"
            },
            {
                "name": "Norway (Norge)",
                "dialCode": "47",
                "countryCode": "no"
            },
            {
                "name": "Oman (‫عُمان‬‎)",
                "dialCode": "968",
                "countryCode": "om"
            },
            {
                "name": "Pakistan (‫پاکستان‬‎)",
                "dialCode": "92",
                "countryCode": "pk"
            },
            {
                "name": "Palau",
                "dialCode": "680",
                "countryCode": "pw"
            },
            {
                "name": "Palestine (‫فلسطين‬‎)",
                "dialCode": "970",
                "countryCode": "ps"
            },
            {
                "name": "Panama (Panamá)",
                "dialCode": "507",
                "countryCode": "pa"
            },
            {
                "name": "Papua New Guinea",
                "dialCode": "675",
                "countryCode": "pg"
            },
            {
                "name": "Paraguay",
                "dialCode": "595",
                "countryCode": "py"
            },
            {
                "name": "Peru (Perú)",
                "dialCode": "51",
                "countryCode": "pe"
            },
            {
                "name": "Philippines",
                "dialCode": "63",
                "countryCode": "ph"
            },
            {
                "name": "Poland (Polska)",
                "dialCode": "48",
                "countryCode": "pl"
            },
            {
                "name": "Portugal",
                "dialCode": "351",
                "countryCode": "pt"
            },
            {
                "name": "Puerto Rico",
                "dialCode": "1",
                "countryCode": "pr"
            },
            {
                "name": "Qatar (‫قطر‬‎)",
                "dialCode": "974",
                "countryCode": "qa"
            },
            {
                "name": "Réunion (La Réunion)",
                "dialCode": "262",
                "countryCode": "re"
            },
            {
                "name": "Romania (România)",
                "dialCode": "40",
                "countryCode": "ro"
            },
            {
                "name": "Russia (Россия)",
                "dialCode": "7",
                "countryCode": "ru"
            },
            {
                "name": "Rwanda",
                "dialCode": "250",
                "countryCode": "rw"
            },
            {
                "name": "Saint Barthélemy",
                "dialCode": "590",
                "countryCode": "bl"
            },
            {
                "name": "Saint Helena",
                "dialCode": "290",
                "countryCode": "sh"
            },
            {
                "name": "Saint Kitts and Nevis",
                "dialCode": "1869",
                "countryCode": "kn"
            },
            {
                "name": "Saint Lucia",
                "dialCode": "1758",
                "countryCode": "lc"
            },
            {
                "name": "Saint Martin (Saint-Martin (partie française))",
                "dialCode": "590",
                "countryCode": "mf"
            },
            {
                "name": "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
                "dialCode": "508",
                "countryCode": "pm"
            },
            {
                "name": "Saint Vincent and the Grenadines",
                "dialCode": "1784",
                "countryCode": "vc"
            },
            {
                "name": "Samoa",
                "dialCode": "685",
                "countryCode": "ws"
            },
            {
                "name": "San Marino",
                "dialCode": "378",
                "countryCode": "sm"
            },
            {
                "name": "São Tomé and Príncipe (São Tomé e Príncipe)",
                "dialCode": "239",
                "countryCode": "st"
            },
            {
                "name": "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
                "dialCode": "966",
                "countryCode": "sa"
            },
            {
                "name": "Senegal (Sénégal)",
                "dialCode": "221",
                "countryCode": "sn"
            },
            {
                "name": "Serbia (Србија)",
                "dialCode": "381",
                "countryCode": "rs"
            },
            {
                "name": "Seychelles",
                "dialCode": "248",
                "countryCode": "sc"
            },
            {
                "name": "Sierra Leone",
                "dialCode": "232",
                "countryCode": "sl"
            },
            {
                "name": "Singapore",
                "dialCode": "65",
                "countryCode": "sg"
            },
            {
                "name": "Sint Maarten",
                "dialCode": "1721",
                "countryCode": "sx"
            },
            {
                "name": "Slovakia (Slovensko)",
                "dialCode": "421",
                "countryCode": "sk"
            },
            {
                "name": "Slovenia (Slovenija)",
                "dialCode": "386",
                "countryCode": "si"
            },
            {
                "name": "Solomon Islands",
                "dialCode": "677",
                "countryCode": "sb"
            },
            {
                "name": "Somalia (Soomaaliya)",
                "dialCode": "252",
                "countryCode": "so"
            },
            {
                "name": "South Africa",
                "dialCode": "27",
                "countryCode": "za"
            },
            {
                "name": "South Korea (대한민국)",
                "dialCode": "82",
                "countryCode": "kr"
            },
            {
                "name": "South Sudan (‫جنوب السودان‬‎)",
                "dialCode": "211",
                "countryCode": "ss"
            },
            {
                "name": "Spain (España)",
                "dialCode": "34",
                "countryCode": "es"
            },
            {
                "name": "Sri Lanka (ශ්‍රී ලංකාව)",
                "dialCode": "94",
                "countryCode": "lk"
            },
            {
                "name": "Sudan (‫السودان‬‎)",
                "dialCode": "249",
                "countryCode": "sd"
            },
            {
                "name": "Suriname",
                "dialCode": "597",
                "countryCode": "sr"
            },
            {
                "name": "Svalbard and Jan Mayen",
                "dialCode": "47",
                "countryCode": "sj"
            },
            {
                "name": "Swaziland",
                "dialCode": "268",
                "countryCode": "sz"
            },
            {
                "name": "Sweden (Sverige)",
                "dialCode": "46",
                "countryCode": "se"
            },
            {
                "name": "Switzerland (Schweiz)",
                "dialCode": "41",
                "countryCode": "ch"
            },
            {
                "name": "Syria (‫سوريا‬‎)",
                "dialCode": "963",
                "countryCode": "sy"
            },
            {
                "name": "Taiwan (台灣)",
                "dialCode": "886",
                "countryCode": "tw"
            },
            {
                "name": "Tajikistan",
                "dialCode": "992",
                "countryCode": "tj"
            },
            {
                "name": "Tanzania",
                "dialCode": "255",
                "countryCode": "tz"
            },
            {
                "name": "Thailand (ไทย)",
                "dialCode": "66",
                "countryCode": "th"
            },
            {
                "name": "Timor-Leste",
                "dialCode": "670",
                "countryCode": "tl"
            },
            {
                "name": "Togo",
                "dialCode": "228",
                "countryCode": "tg"
            },
            {
                "name": "Tokelau",
                "dialCode": "690",
                "countryCode": "tk"
            },
            {
                "name": "Tonga",
                "dialCode": "676",
                "countryCode": "to"
            },
            {
                "name": "Trinidad and Tobago",
                "dialCode": "1868",
                "countryCode": "tt"
            },
            {
                "name": "Tunisia (‫تونس‬‎)",
                "dialCode": "216",
                "countryCode": "tn"
            },
            {
                "name": "Turkey (Türkiye)",
                "dialCode": "90",
                "countryCode": "tr"
            },
            {
                "name": "Turkmenistan",
                "dialCode": "993",
                "countryCode": "tm"
            },
            {
                "name": "Turks and Caicos Islands",
                "dialCode": "1649",
                "countryCode": "tc"
            },
            {
                "name": "Tuvalu",
                "dialCode": "688",
                "countryCode": "tv"
            },
            {
                "name": "U.S. Virgin Islands",
                "dialCode": "1340",
                "countryCode": "vi"
            },
            {
                "name": "Uganda",
                "dialCode": "256",
                "countryCode": "ug"
            },
            {
                "name": "Ukraine (Україна)",
                "dialCode": "380",
                "countryCode": "ua"
            },
            {
                "name": "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
                "dialCode": "971",
                "countryCode": "ae"
            },
            {
                "name": "United Kingdom",
                "dialCode": "44",
                "countryCode": "gb"
            },
            {
                "name": "United States",
                "dialCode": "1",
                "countryCode": "us"
            },
            {
                "name": "Uruguay",
                "dialCode": "598",
                "countryCode": "uy"
            },
            {
                "name": "Uzbekistan (Oʻzbekiston)",
                "dialCode": "998",
                "countryCode": "uz"
            },
            {
                "name": "Vanuatu",
                "dialCode": "678",
                "countryCode": "vu"
            },
            {
                "name": "Vatican City (Città del Vaticano)",
                "dialCode": "39",
                "countryCode": "va"
            },
            {
                "name": "Venezuela",
                "dialCode": "58",
                "countryCode": "ve"
            },
            {
                "name": "Vietnam (Việt Nam)",
                "dialCode": "84",
                "countryCode": "vn"
            },
            {
                "name": "Wallis and Futuna (Wallis-et-Futuna)",
                "dialCode": "681",
                "countryCode": "wf"
            },
            {
                "name": "Western Sahara (‫الصحراء الغربية‬‎)",
                "dialCode": "212",
                "countryCode": "eh"
            },
            {
                "name": "Yemen (‫اليمن‬‎)",
                "dialCode": "967",
                "countryCode": "ye"
            },
            {
                "name": "Zambia",
                "dialCode": "260",
                "countryCode": "zm"
            },
            {
                "name": "Zimbabwe",
                "dialCode": "263",
                "countryCode": "zw"
            },
            {
                "name": "Åland Islands",
                "dialCode": "358",
                "countryCode": "ax"
            }
        ];

        countries.forEach((country: Country) => {
            country.name = LOCALES[locale][country.countryCode];
        });
        return countries;
    }
}

const LOCALES: any = {
    'en': {
        'ax': 'AALAND ISLANDS',
        'af': 'AFGHANISTAN',
        'al': 'ALBANIA',
        'dz': 'ALGERIA',
        'as': 'AMERICAN SAMOA',
        'ad': 'ANDORRA',
        'ao': 'ANGOLA',
        'ai': 'ANGUILLA',
        'aq': 'ANTARCTICA',
        'ag': 'ANTIGUA AND BARBUDA',
        'ar': 'ARGENTINA',
        'am': 'ARMENIA',
        'aw': 'ARUBA',
        'au': 'AUSTRALIA',
        'at': 'AUSTRIA',
        'az': 'AZERBAIJAN',
        'bs': 'BAHAMAS',
        'bh': 'BAHRAIN',
        'bd': 'BANGLADESH',
        'bb': 'BARBADOS',
        'by': 'BELARUS',
        'be': 'BELGIUM',
        'bz': 'BELIZE',
        'bj': 'BENIN',
        'bm': 'BERMUDA',
        'bt': 'BHUTAN',
        'bo': 'BOLIVIA',
        'ba': 'BOSNIA AND HERZEGOWINA',
        'bw': 'BOTSWANA',
        'bv': 'BOUVET ISLAND',
        'br': 'BRAZIL',
        'io': 'BRITISH INDIAN OCEAN TERRITORY',
        'bn': 'BRUNEI DARUSSALAM',
        'bg': 'BULGARIA',
        'bf': 'BURKINA FASO',
        'bi': 'BURUNDI',
        'bq': 'CARIBBEAN NETHERLANDS',
        'kh': 'CAMBODIA',
        'cm': 'CAMEROON',
        'ca': 'CANADA',
        'cv': 'CAPE VERDE',
        'ky': 'CAYMAN ISLANDS',
        'cf': 'CENTRAL AFRICAN REPUBLIC',
        'td': 'CHAD',
        'cl': 'CHILE',
        'cn': 'CHINA',
        'cx': 'CHRISTMAS ISLAND',
        'cc': 'COCOS ISLANDS',
        'co': 'COLOMBIA',
        'km': 'COMOROS',
        'cd': 'CONGO',
        'cg': 'CONGO REPUBLIC',
        'ck': 'COOK ISLANDS',
        'cr': 'COSTA RICA',
        'ci': 'COTE DIVOIRE',
        'hr': 'CROATIA ',
        'cu': 'CUBA',
        'cw': 'CURACAO',
        'cy': 'CYPRUS',
        'cz': 'CZECH REPUBLIC',
        'dk': 'DENMARK',
        'dj': 'DJIBOUTI',
        'dm': 'DOMINICA',
        'do': 'DOMINICAN REPUBLIC',
        'ec': 'ECUADOR',
        'eg': 'EGYPT',
        'sv': 'EL SALVADOR',
        'gq': 'EQUATORIAL GUINEA',
        'er': 'ERITREA',
        'ee': 'ESTONIA',
        'et': 'ETHIOPIA',
        'fk': 'FALKLAND ISLANDS (MALVINAS)',
        'fo': 'FAROE ISLANDS',
        'fj': 'FIJI',
        'fi': 'FINLAND',
        'fr': 'FRANCE',
        'gf': 'FRENCH GUIANA',
        'pf': 'FRENCH POLYNESIA',
        'tf': 'FRENCH SOUTHERN TERRITORIES',
        'ga': 'GABON',
        'gm': 'GAMBIA',
        'ge': 'GEORGIA',
        'de': 'GERMANY',
        'gh': 'GHANA',
        'gi': 'GIBRALTAR',
        'gr': 'GREECE',
        'gl': 'GREENLAND',
        'gd': 'GRENADA',
        'gp': 'GUADELOUPE',
        'gu': 'GUAM',
        'gt': 'GUATEMALA',
        'gg': 'GUERNSEY',
        'gn': 'GUINEA',
        'gw': 'GUINEA-BISSAU',
        'gy': 'GUYANA',
        'ht': 'HAITI',
        'hm': 'HEARD AND MC DONALD ISLANDS',
        'hn': 'HONDURAS',
        'hk': 'HONG KONG',
        'hu': 'HUNGARY',
        'is': 'ICELAND',
        'in': 'INDIA',
        'id': 'INDONESIA',
        'ir': 'IRAN ',
        'iq': 'IRAQ',
        'ie': 'IRELAND',
        'im': 'ISLA DE MAN',
        'il': 'ISRAEL',
        'it': 'ITALY',
        'jm': 'JAMAICA',
        'jp': 'JAPAN',
        'je': 'JERSEY',
        'jo': 'JORDAN',
        'kz': 'KAZAKHSTAN',
        'ke': 'KENYA',
        'ki': 'KIRIBATI',
        'kp': 'KOREA NORTH ',
        'kr': 'KOREA SOUTH',
        'xk': 'KOSOVO',
        'kw': 'KUWAIT',
        'kg': 'KYRGYZSTAN',
        'la': 'LAO',
        'lv': 'LATVIA',
        'lb': 'LEBANON',
        'ls': 'LESOTHO',
        'lr': 'LIBERIA',
        'ly': 'LIBYAN ARAB JAMAHIRIYA',
        'li': 'LIECHTENSTEIN',
        'lt': 'LITHUANIA',
        'lu': 'LUXEMBOURG',
        'mo': 'MACAU',
        'mk': 'MACEDONIA',
        'mg': 'MADAGASCAR',
        'mw': 'MALAWI',
        'my': 'MALAYSIA',
        'mv': 'MALDIVES',
        'ml': 'MALI',
        'mt': 'MALTA',
        'mh': 'MARSHALL ISLANDS',
        'mq': 'MARTINIQUE',
        'mr': 'MAURITANIA',
        'mu': 'MAURITIUS',
        'yt': 'MAYOTTE',
        'mx': 'MEXICO',
        'fm': 'MICRONESIA',
        'md': 'MOLDOVA',
        'mc': 'MONACO',
        'mn': 'MONGOLIA',
        'me': 'MONTENEGRO',
        'ms': 'MONTSERRAT',
        'ma': 'MOROCCO',
        'mz': 'MOZAMBIQUE',
        'mm': 'MYANMAR',
        'mf': 'SAINT MARTIN',
        'na': 'NAMIBIA',
        'nr': 'NAURU',
        'np': 'NEPAL',
        'nl': 'NETHERLANDS',
        'an': 'NETHERLANDS ANTILLES',
        'nc': 'NEW CALEDONIA',
        'nz': 'NEW ZEALAND',
        'ni': 'NICARAGUA',
        'ne': 'NIGER',
        'ng': 'NIGERIA',
        'nu': 'NIUE',
        'nf': 'NORFOLK ISLAND',
        'mp': 'NORTHERN MARIANA ISLANDS',
        'no': 'NORWAY',
        'om': 'OMAN',
        'pk': 'PAKISTAN',
        'pw': 'PALAU',
        'ps': 'PALESTINA',
        'pa': 'PANAMA',
        'pg': 'PAPUA NEW GUINEA',
        'py': 'PARAGUAY',
        'pe': 'PERU',
        'ph': 'PHILIPPINES',
        'pn': 'PITCAIRN',
        'pl': 'POLAND',
        'pt': 'PORTUGAL',
        'pr': 'PUERTO RICO',
        'qa': 'QATAR',
        're': 'REUNION',
        'ro': 'ROMANIA',
        'ru': 'RUSSIAN FEDERATION',
        'rw': 'RWANDA',
        'sh': 'SAINT HELENA',
        'kn': 'SAINT KITTS AND NEVIS',
        'lc': 'SAINT LUCIA',
        'pm': 'SAINT PIERRE AND MIQUELON',
        'vc': 'SAINT VINCENT AND THE GRENADINES',
        'ws': 'SAMOA',
        'bl': 'SAN BARTOLOMÉ',
        'sm': 'SAN MARINO',
        'st': 'SAO TOME AND PRINCIPE',
        'sa': 'SAUDI ARABIA',
        'sn': 'SENEGAL',
        'cs': 'SERBIA AND MONTENEGRO',
        'rs': 'SERBIA',
        'sc': 'SEYCHELLES',
        'sl': 'SIERRA LEONE',
        'sg': 'SINGAPORE',
        'sx': 'SINT MAARTEN',
        'sk': 'SLOVAKIA',
        'si': 'SLOVENIA',
        'sb': 'SOLOMON ISLANDS',
        'so': 'SOMALIA',
        'za': 'SOUTH AFRICA',
        'gs': 'SOUTH GEORGIA ISLANDS',
        'es': 'SPAIN',
        'lk': 'SRI LANKA',
        'sd': 'SUDAN',
        'ss': 'SOUTH SUDAN',
        'sr': 'SURINAME',
        'sj': 'SVALBARD AND JAN MAYEN ISLANDS',
        'sz': 'SWAZILAND',
        'se': 'SWEDEN',
        'ch': 'SWITZERLAND',
        'sy': 'SYRIAN ARAB REPUBLIC',
        'tw': 'TAIWAN',
        'tj': 'TAJIKISTAN',
        'tz': 'TANZANIA',
        'th': 'THAILAND',
        'tl': 'TIMOR-LESTE',
        'tg': 'TOGO',
        'tk': 'TOKELAU',
        'to': 'TONGA',
        'tt': 'TRINIDAD AND TOBAGO',
        'tn': 'TUNISIA',
        'tr': 'TURKEY',
        'tm': 'TURKMENISTAN',
        'tc': 'TURKS AND CAICOS ISLANDS',
        'tv': 'TUVALU',
        'ug': 'UGANDA',
        'ua': 'UKRAINE',
        'ae': 'UNITED ARAB EMIRATES',
        'gb': 'UNITED KINGDOM',
        'us': 'UNITED STATES',
        'um': 'UNITED STATES MINOR OUTLYING ISLANDS',
        'uy': 'URUGUAY',
        'uz': 'UZBEKISTAN',
        'vu': 'VANUATU',
        'va': 'VATICAN CITY STATE',
        've': 'VENEZUELA',
        'vn': 'VIET NAM',
        'vg': 'VIRGIN ISLANDS (BRITISH)',
        'vi': 'VIRGIN ISLANDS (U.S.)',
        'wf': 'WALLIS AND FUTUNA ISLANDS',
        'eh': 'WESTERN SAHARA',
        'ye': 'YEMEN',
        'zm': 'ZAMBIA',
        'zw': 'ZIMBABWE '
    },
    'es': {
        'ax': 'ISLAS ÁLAND',
        'af': 'AFGHANISTÁN',
        'al': 'ALBANIA',
        'dz': 'ARGEL',
        'as': 'SAMOA AMERICANA',
        'ad': 'ANDORRA',
        'ao': 'ANGOLA',
        'ai': 'ANGUILA',
        'aq': 'ANTÁRTIDA',
        'ag': 'ANTIGUA Y BARBUDA',
        'ar': 'ARGENTINA',
        'am': 'ARMENIA',
        'aw': 'ARUBA',
        'au': 'AUSTRALIA',
        'at': 'AUSTRIA',
        'az': 'AZERBAIYÁN',
        'bs': 'BAHAMAS',
        'bh': 'BAHRÉIN',
        'bd': 'BANGLADESH',
        'bb': 'BARBADOS',
        'by': 'BELARÚS',
        'be': 'BÉLGICA',
        'bz': 'BELICE',
        'bj': 'BENIN',
        'bm': 'BERMUDAAS',
        'bt': 'BHUTÁN',
        'bo': 'BOLIVIA',
        'ba': 'BOSNIA Y HERZEGOVINA',
        'bw': 'BOTSUANA',
        'bv': 'ISLA BOUVET',
        'br': 'BRASIL',
        'io': 'TERRITORIO BRITÁNICO DEL OCÉANO ÍNDICO',
        'bn': 'BRUNÉI',
        'bg': 'BULGARIA',
        'bf': 'BURKINA FASO',
        'bi': 'BURUNDI',
        'bq': 'CARIBE PAÍSES BAJOS',
        'kh': 'CAMBOYA',
        'cm': 'CAMERÚN',
        'ca': 'CANADÁ',
        'cv': 'CABO VERDE',
        'ky': 'ISLAS CAIMÁN',
        'cf': 'REPÚBLICA CENTRO-AFRICANA',
        'td': 'CHAD',
        'cl': 'CHILE',
        'cn': 'CHINA',
        'cx': 'ISLAS CHRISTMAS',
        'cc': 'ISLAS COCOS',
        'co': 'COLOMBIA',
        'km': 'COMOROS',
        'cd': 'CONGO (ZAIRE)',
        'cg': 'CONGO',
        'ck': 'ISLAS COOK',
        'cr': 'COSTA RICA',
        'ci': 'COSTA DE MARFIL',
        'hr': 'CROACIA ',
        'cu': 'CUBA',
        'cw': 'CURAÇAO',
        'cy': 'CHIPRE',
        'cz': 'REPÚBLICA CHECA',
        'dk': 'DINAMARCA',
        'dj': 'YIBUTI',
        'dm': 'DOMÍNICA',
        'do': 'REPÚBLICA DOMINICANA',
        'ec': 'ECUADOR',
        'eg': 'EGIPTO',
        'sv': 'EL SALVADOR',
        'gq': 'GUINEA ECUATORIAL',
        'er': 'ERITREA',
        'ee': 'ESTONIA',
        'et': 'ETIOPÍA',
        'fk': 'ISLAS MALVINAS',
        'fo': 'ISLAS FAROE',
        'fj': 'FIJI',
        'fi': 'FINLANDIA',
        'fr': 'FRANCIA',
        'gf': 'GUIANA FRANCESA',
        'pf': 'POLYNESIA FRANCESA',
        'tf': 'TERRITORIOS AUSTRALES FRANCESES',
        'ga': 'GABÓN',
        'gm': 'GAMBIA',
        'ge': 'GEORGIA',
        'de': 'ALEMANIA',
        'gh': 'GHANA',
        'gi': 'GIBRALTAR',
        'gr': 'GREECE',
        'gl': 'GROENLANDIA',
        'gd': 'GRANADA',
        'gp': 'GUADALUPE',
        'gu': 'GUAM',
        'gt': 'GUATEMALA',
        'gg': 'GUERNSEY',
        'gn': 'GUINEA',
        'gw': 'GUINEA-BISSAU',
        'gy': 'GUYANA',
        'ht': 'HAITI',
        'hm': 'ISLAS HEARD Y MC DONALD',
        'hn': 'HONDURAS',
        'hk': 'HONG KONG',
        'hu': 'HUNGRÍA',
        'is': 'ISLANDIA',
        'in': 'INDIA',
        'id': 'INDONESIA',
        'ir': 'IRÁN',
        'iq': 'IRAK',
        'ie': 'IRLANDA',
        'im': 'ISLA DE MAN',
        'il': 'ISRAEL',
        'it': 'ITALIA',
        'jm': 'JAMAICA',
        'jp': 'JAPÓN',
        'je': 'JERSEY',
        'jo': 'JORDANIA',
        'kz': 'KAZAJSTÁN',
        'ke': 'KENIA',
        'ki': 'KIRIBATI',
        'kp': 'KOREA DEL NORTE',
        'kr': 'KOREA DEL SUR',
        'xk': 'KOSOVO',
        'kw': 'KUWAIT',
        'kg': 'KIRGUISTÁN',
        'la': 'LAOS',
        'lv': 'LETONIA',
        'lb': 'LÍBANO',
        'ls': 'LESOTHO',
        'lr': 'LIBERIA',
        'ly': 'LIBIA',
        'li': 'LIECHTENSTEIN',
        'lt': 'LITUANIA',
        'lu': 'LUXEMBURGO',
        'mo': 'MACAO',
        'mk': 'MACEDONIA',
        'mg': 'MADAGASCAR',
        'mw': 'MALAWI',
        'my': 'MALASIA',
        'mv': 'MALDIVAS',
        'ml': 'MALI',
        'mt': 'MALTA',
        'mh': 'ISLAS MARSHALL',
        'mq': 'MATINICA',
        'mr': 'MAURITANIA',
        'mu': 'MAURICIO',
        'yt': 'MAYOTTE',
        'mx': 'MÉXICO',
        'fm': 'MICRONESIA',
        'md': 'MOLDOVA',
        'mc': 'MÓNACO',
        'mn': 'MONGOLIA',
        'me': 'MONTENEGRO',
        'ms': 'MONTSERRAT',
        'ma': 'MARRUECOS',
        'mz': 'MOZAMBIQUE',
        'mm': 'MYANMAR',
        'mf': 'SAINT MARTIN',
        'na': 'NAMIBIA',
        'nr': 'NAURU',
        'np': 'NEPAL',
        'nl': 'PAÍSES BAJOS',
        'an': 'ANTILLAS NEERLANDESAS',
        'nc': 'NUEVA CALEDONIA',
        'nz': 'NUEVA ZELANDA',
        'ni': 'NICARAGUA',
        'ne': 'NÍGER',
        'ng': 'NIGERIA',
        'nu': 'NIUE',
        'nf': 'ISLAS NORKFOLK',
        'mp': 'ISLAS MARIANAS DEL NORTE',
        'no': 'NORUEGA',
        'om': 'OMÁN',
        'pk': 'PAKISTÁN',
        'pw': 'ISLAS PALAOS',
        'ps': 'PALESTINA',
        'pa': 'PANAMÁ',
        'pg': 'PAPÚA NUEVA GUINEA',
        'py': 'PARAGUAY',
        'pe': 'PERÚ',
        'ph': 'FILIPINAS',
        'pn': 'ISLAS PITCAIRN',
        'pl': 'POLONIA',
        'pt': 'PORTUGAL',
        'pr': 'PUERTO RICO',
        'qa': 'QATAR',
        're': 'REUNIÓN',
        'ro': 'RUMANÍA',
        'ru': 'RUSIA',
        'rw': 'RUANDA',
        'sh': 'SANTA ELENA',
        'kn': 'SAN CRISTÓBAL Y NIEVES',
        'lc': 'SANTA LUCÍA',
        'pm': 'SAN PEDRO Y MIQUELÓN',
        'vc': 'SAN VICENTE Y LAS GRANADINAS',
        'ws': 'SAMOA',
        'bl': 'SAN BARTOLOMÉ',
        'sm': 'SAN MARINO',
        'st': 'SANTO TOMÉ Y PRÍNCIPE',
        'sa': 'ARABIA SAUDITA',
        'sn': 'SENEGAL',
        'cs': 'SERBIA Y MONTENEGRO',
        'rs': 'SERBIA',
        'sc': 'SEYCHELLES',
        'sl': 'SIERRA LEONA',
        'sg': 'SINGAPUR',
        'sx': 'SINT MAARTEN',
        'sk': 'ESLOVAQUIA',
        'si': 'ESLOVENIA',
        'sb': 'ISLAS SOLOMÓN',
        'so': 'SOMALIA',
        'za': 'SUDÁFRICA',
        'gs': 'GEORGIA DEL SUR E ISLAS SANDWICH DEL SUR',
        'es': 'ESPAÑA',
        'lk': 'SRI LANKA',
        'sd': 'SUDÁN',
        'ss': 'SUDÁN DEL SUR',
        'sr': 'SURINAM',
        'sj': 'ISLAS SVALBARD Y JAN MAYEN',
        'sz': 'SUAZILANDIA',
        'se': 'SUECIA',
        'ch': 'SUIZA',
        'sy': 'SIRIA',
        'tw': 'TAIWÁN',
        'tj': 'TAYIKISTÁN',
        'tz': 'TANZANIA',
        'th': 'TAILANDIA',
        'tl': 'TIMOR-LESTE',
        'tg': 'TOGO',
        'tk': 'TOKELAU',
        'to': 'TONGA',
        'tt': 'TRINIDAD Y TOBAGO',
        'tn': 'TÚNEZ',
        'tr': 'TURQUÍA',
        'tm': 'TURKMENISTÁN',
        'tc': 'ISLAS TURCAS Y CAICOS',
        'tv': 'TUVALU',
        'ug': 'UGANDA',
        'ua': 'UCRANIA',
        'ae': 'EMIRATOS ÁRABES UNIDOS',
        'gb': 'REINO UNIDO',
        'us': 'ESTADOS UNIDOS DE AMÉRICA',
        'um': 'ESTADOS UNIDOS ISLAS MINOR OUTLYING',
        'uy': 'URUGUAY',
        'uz': 'UZBEKISTÁN',
        'vu': 'VANUATU',
        'va': 'CIUDAD DEL VATICANO',
        've': 'VENEZUELA',
        'vn': 'VIETNAM',
        'vg': 'ISLAS VÍRGENES (INGLESAS)',
        'vi': 'ISLAS VÍRGENES (U.S.)',
        'wf': 'WALLIS Y FUTUNA',
        'eh': 'SAHARA OCCIDENTAL',
        'ye': 'YEMEN',
        'zm': 'ZAMBIA',
        'zw': 'ZIMBABUE '
    }
};