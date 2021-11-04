# Házi feladat

Írj API teszteket az api könyvtárban található kód `/api/food` végpontjára.

Az API futtatása lokális gépen:
+ lépj az `api` könyvtárba
+ állítsd vissza a szükséges könyvtárakat: `npm install`
+ indítsd el az apit, és hagyd futni a feladat során: `npm run api` (az api http://localhost:8000/api/food urlen érhető el)

A `drink_test` könyvtár tartalmaz példa teszteket, ennek tartalmát szükségtelen módosítani.

A `food_test` könyvtár tartalmazza a kinduló projektet. A használatához:
+ lépj a `food_test` könyvtárba
+ állítsd vissza a szükséges könyvtárakat: `npm install`
+ a kiinduló teszt futtatásával ellenőrizd hogy tudsz-e teszteket futtatni: `npm run test`

Az alábbi teszteket implementáld:
1. `/api/food` végpontra POSTolt adatból hiányzik a name => 400 válasz
1. `/api/food` végpontra POSTolt adatban negatív a calories => 400 válasz
1. `/api/food` végponton POST segítségével létrehozott elemeket a `/api/food` végpontra küldött GET hívás válaszában kapott tömb tartalmazza (GET válasza 200 kódot ad)
1. `/api/food` végponton létrehozott elem a `/api/food/\<id\>` végpontra küldött GET hívással letölthető (GET 200 választ ad) 
1. `/api/food/\<id\>` végpontra küldött GET hívás 404 választ ad érvénytelen id esetén 
1. `/api/food/\<id\>` végpontra küldött PUT hívással a korábban létrehozott elem módosítható, és a módosítást követően egy GET hívás már a módosított állapotot adja vissza (PUT és GET is 200 választ ad) 
1. `/api/food/\<id\>` végpontra küldött PUT hívás 404-et ad érvénytelen id esetén
1. `/api/food/\<id\>` végpontra küldött DELETE hívás kitörli a korábban létrehozott elemet és azt követően a `/api/food` végpontra küldött GET hívás eredményében már nem található (DELETE 204 választ ad sikeres törlés esetén)
1. `/api/food/\<id\>` végponta küldött DELETE hívás 404-et ad érvénytelen id esetében
1. `/api/food/\<id\>` végpontra küldött PUT esetében amennyiben az url-ben és a bodyban küldött id különbözik akkot 400 hibakódot ad

