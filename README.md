### ELO-rating

### 1. Követelményanalízis
#### 1.1. Célkitűzés, projektindító dokumentum
A program célja kétszereplős játékok játékos-közösségeinek (a továbbiakban: közösség) az egymáshoz viszonyított aktuális játékerejének mérésére sok helyen használt Élő-pontrendszer vezetése, a bevitt mérkőzések alapján kialakult ranglista nyilvánossá tétele. A regisztrált felhasználók különböző kategóriákban indíthatnak közösségeket -- a legelterjedtebb a sakkban, ostáblában, különböző videó-játékokban, de akár labdarúgásban is használhatják. Egy közösséghez aztán mérkőzéseket lehet felvinni, ahol meg kell adni a két játékos (nick)nevét, illetve a mérkőzés eredményét. A megadott adatok alapján egy közösség ranglistája a Nemzetközi Sakkszövetség (FIDE) által használt képlet alapján kerül kiszámításra. A listák nyilvánosak, adatok bevitele, módosítása vagy törlése viszont csak az adott közösség indítójának érhető el bejelentkezés után.
##### **Funkcionális követelmények:**
**Vendégként** legyen lehetőség:
* a főoldalon kiemelt közösségeket látni kategóriánként
* a közösségek között szabadon böngészni, keresni köztük
* regisztrálni

**Felhasználóként** legyen lehetőség bejelentkezni az oldalra, majd:
* új közösséget indítani
* saját közösséget módosítani vagy törölni
* saját közösséghez új meccset hozzáadni

##### **Nem funkcionális követelmények:**
* **Áttekinthetőség:** a játék-kategóriák színekkel vannak csoportosítva
* **Használhatóság:** ésszerű elrendezés, könnyen kezelhetőség
* **Megbízhatóság:** jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak, és emelje ki a hibás beviteli mezőket. A jól bevitt adatok maradjanak az űrlapban.
* **Karbantarthatóság:** könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt


#### 1.2. Szakterületi fogalomjegyzék
**Játékos:** egy kétszereplős játék egyik résztvevője.

**Játékos-közösség**: játékosok csoportja, akik tetszőleges rendszerességgel játszanak egymás ellen, és igényt tartanak arra, hogy az egymáshoz viszonyított játékerejük számszerűen kifejezhető legyen.

**Élő-pontrendszer:** kétszereplős játékokban, mint a sakkban vagy a góban versenyzők egymáshoz viszonyított aktuális játékerejének mérésére létrehozott rendszer.
Nemzetközileg ismert neve Elo (gyakran nagybetűkkel ELO, bár nem betűszó). Nevét Élő Árpád (angol, külföldön ismertebb nevén Arpad Elo) magyar születésű amerikai fizikaprofesszorról kapta. (Wikipedia)

**Mérkőzés:** két játékos által végigjátszott játék, aminek a kimenetele az első játékos győzelme, a 2. játékos győzelme vagy döntetlen lehet.

**Ranglista:** egy közösség összes tagjából álló lista, amely az Élő-pontszámuk alapján van rendezve.

**Nemzetközi Sakkszövetség (FIDE)**: a Nemzetközi Sakkszövetség vagy (Fédération Internationale des Échecs, FIDE) egy nemzetközi szervezet, amely koordinálja a sakk mint sportág nemzetközi életét, nyilvántartja és minősíti a sakkversenyzőket, szervezi a férfi, női, ifjúsági és junior világbajnokságokat, a sakkolimpiákat, kontinensbajnokságokat, és egyéb nemzetközi versenyeket, meghatározza a nemzetközileg érvényes szabályokat. (Wikipedia)

**Nick-név:** az igazi tulajdonnév helyettesítésére szolgáló név.


#### 1.3. Használatieset-modell

Szerepkörök:

* **Vendég:** közösségek keresését, böngészését és megtekintését végezheti
* **Felhasználó:** a vendég szerepkörén túl a saját közösségeinek kezelésére (új, módosít, törlés) és a a saját közösségei mérkőzéseinek felvitelére képes. 


![usecase](/images/usecasediag.png "usecase")



### 2. Tervezés
#### 2.1. Architektúra terv
##### 2.1.1. Oldaltérkép:

**Publikus:**

* Főoldal
* Közösségek böngészése
	* Közösség megtekintése
* Belépés
* Regisztráció

**Felhasználó:**

- Főoldal
- Kilépés
- Saját közösségek
	- Új közösség indítása
	- Saját közösség megtekintése
		- Új mérkőzés felvitele
	- Saját közösség módosítása
	- Saját közösség törlése

##### 2.1.2. Végpontok
- GET/: főoldal
- GET/login: bejelentkező oldal
- POST/login: bejelentkező adatok felküldése
- GET/register: regisztrációs oldal
- POST/register: regisztrációs adatok felküldése
- GET/logout: kijelentkező oldal
- GET/communities/list: közösségek böngészése, keresés
- GET/user/list: saját közösségek listázása
- GET/user/createcommunity: új közösség indítása
- POST/user/createcommunity: új közösség indításához szükséges adatok felküldése
- GET/community/:id?: közösség oldala
- GET/user/:id?/deletecommunity: saját közösség törlése
- GET/user/:id?/editcommunity: saját közösség adatainak módosítása
- POST/user/:id?/editcommunity: saját közösség módosítása, adatok felküldése
- GET/user/:id?: saját közösség megtekintése
- GET/user/:id?/creatematch: új mérkőzés bevitele
- POST/user/:id?/creatematch: új mérkőzés beviteléhez szükséges adatok felküldése

#### 2.2. Felhasználói-felület modell
##### 2.2.1.Oldalvázlatok:
**Főoldal**

![Főoldal](/images/Főoldal.jpg "Főoldal")


**Közösségek böngészése**

![Közösségek_böngészése](/images/Közösségek_böngészése1.jpg "Közösségek_böngészése")


**Közösség megtekintése**

![Közösség_megtekintése](/images/Közösség_megtekintése.jpg "Közösség_megtekintése")


**Regisztráció**

![Regisztráció](/images/Regisztráció.jpg "Regisztráció")


**Bejelentkezés**

![Bejelentkezés](/images/Bejelentkezés.jpg "Bejelentkezés")


**Közösségek listázása**

![Közösségek_listázása](/images/Közösségek_listázása1.jpg "Közösségek_listázása")


**Új özösség indítása**

![Új_közösség_indítása](/images/Új_közösség_indítása.jpg "Új_közösség_indítása")


**Közösség módosítása**

![Közösség_módosítása](/images/Közösség_módosítása.jpg "Közösség_módosítása")


**Saját közösség megtekintése**

![Saját_közösség_megtekintése](/images/Saját_közösség_megtekintése1.jpg "Saját_közösség_megtekintése")


**Új mérkzőzés bevitele**

![Új_mérkzőzés_bevitele](/images/Új_mérkzőzés_bevitele.jpg "Új_mérkzőzés_bevitele")



##### 2.2.2. Osztálymodell

**Adatmodell**
![adatmodell](/images/adatmodell1.png "adatmodell")


### 3. Implementáció
##### 3.1.1. Fejlesztőkörnyezet
Lokálisan történik a fejlesztés, Microsoft Visual Code segítségével.
Új Github repository nyitása.
Node.js, npm, Express admin, Adonis.js telepítése.
Új Adonis projekt indítása.
Fejlesztési lépésenként a repo feltöltése commit-al.
##### 3.1.2. Könyvtárstruktúra, funkciók

A routingért a app\Http\routes.js file felelős.

Az alkalmazás logikai része a Controllerekben található:

  - app\Http\Controllers\UserController.js - a regisztrációval, bejelentkezéssel, kijelentkezéssel kapcsolatos feladatokat látha el
  
  - app\Http\Controllers\EloController.js - az összes többit, a listázástól az objektumok létrehozásáig/módosításáig
  
A database mappában van az adatbázis-fájl (.sqlite), ennek a migrations almappájában a táblák sémáit leíró fájlok.

A nézet-fájlok a resources\views mappában találhatók. 
	

  - .editorconfig
  - .env
  - .env.example
  - .gitignore
  - 1477932223248_communities.js_BACK
  - ace
  - CHANGELOG.md
  - development.sqlite_BACK
  - development.sqlite_BACK2
  - development.sqlite_BACK3
  - EloController.js_back
  - package.json
  - package.json_BACKUP
  - print.txt
  - README.md
  - server.js
		
  - app\
  - app\Commands\
      - Greet.js
  - app\Commands\
  - app\Http\
      - kernel.js
      - routes.js
  - app\Http\Controllers\
      - .gitkeep
      - EloController.js
      - UserController.js
  - app\Http\Controllers\
  - app\Http\Middleware\
      - .gitkeep
  - app\Http\Middleware\
  - app\Http\
  - app\Listeners\
      - Http.js
  - app\Listeners\
  - app\Model\
      - Category.js
      - Community.js
      - Match.js      - Player.js
      - Token.js
      - User.js
  - app\Model\Hooks\
      - .gitkeep
  - app\Model\Hooks\
  - app\Model\
  - app\
  - bootstrap\
      - app.js
      - events.js
      - extend.js
      - http.js
      - kernel.js
  - bootstrap\
  - config\
      - app.js
      - auth.js
      - bodyParser.js
      - cors.js
      - database.js
      - event.js
      - session.js
      - shield.js
  - config\express-admin\
      - config.json
      - custom.json
      - settings.json
      - users.json
  - config\express-admin\
  - config\
  - database\
      - development.sqlite
      - factory.js
  - database\migrations\
      - .gitkeep
      - 1477929098590_create_users_table.js
      - 1477929098600_create_tokens_table.js
      - 1477929385272_categories.js
      - 1477996376142_matches.js
      - 1478156390881_players.js
      - 1478162436156_communities.js
  - database\migrations\
  - database\seeds\
      - Database.js
  - database\seeds\
  - database\   
  - providers\
      - .gitkeep
  - providers\
  - public\
      - style.css
  - public\assets\
      - favicon.png
      - github.svg
      - logo.svg
      - twitter.svg
  - public\assets\
  - public\
  - resources\
  - resources\views\
      - createCommunity.njk
      - createMatch.njk
      - editCommunity.njk
      - listCommunities.njk
      - login.njk
      - main.njk
      - master.njk
      - ownCummunities.njk
      - parent.njk
      - register.njk
      - showCommunity.njk
      - showOwnCommunity.njk
  - resources\views\errors\
      - index.njk
  - resources\views\errors\
  - resources\views\
  - resources\
  - storage\
      - .gitkeep
  - storage\

### 4. Tesztelés
#### 4.1. Tesztelési környezetek
Egységtesztelés közben a modellek működését, a problémamentes funkciókat és műveleteket ellenőrizzük. Másodszor a funkciónális teszetelés segítségével a végpontokat ellenőrizzük, a megfelelő tartalom megjelenését, és az oldalak működőképességét.
#### 4.2. Egységteszt
#### 4.3. Funkciónális teszetelés
#### 4.4.Tesztesetek

### 5. Felhasználói dokumentáció
**Futtatáshoz szükséges operációs rendszer:** Tetszőleges operációs rendszer

**A futtatáshoz szükséges hardver:** Operációs rendszerek szerint megadva

**Egyéb követelmények:** Internet böngésző telepítése, JavaScript ajánlott

**Program használata:**

- Böngészőben nyissuk meg a főoldalt
- Jobb felső sarokban kattintsunk a Regisztrácó feliratra, ha már regisztráltunk korábban, vagy Bejelentkezés feliratra, ha még nem
- Bejelentkezés/Regisztráció után a Saját közösségek listázása oldalra jutunk
- A Saját közösségek listázása oldalon a Törlés gombra kattintva törölhetjük a közösségünket, erről megerősítést kér egy felugró ablak
- A Saját közösségek listázása oldalon a Módosítás gombra kattintva módosíthatjuk a közösségünk nevét és kategóriáját
- A Saját közösségek listázása oldalon a Megtekintés gombra kattintva a megtekintés oldalra jutunk
- Új közösség indításához a bal felső sarokban az Új közösség indítása gombra kattintva tudunk új közösséget indítani
- Adjunk a közösségnek nevet, és válasszunk neki kategóriát
- Ha már létezik ilyen néven létrehozott közösség, az oldal hibaüzenetet dob
- A Küldés gombra kattintva mentsük el az adatokat - ha ez sikeres, a Saját közösség megtekintése oldalra jutunk
- A Saját közösség megtekintése oldalon fent látható a közösség ranglistája, lent a bevitt meccsek listája
- A Saját közösség megtekintése oldalon az Új mérkőzés bevitele gombra kattintva tudunk új mérkőzést bevinni.
- Az új mérkőzés bevitele oldalon meg kell adni a két játékos nevét, egy legördülő menüből kiválasztani az eredményt (1 játékos nyert, 2. játékos nyert, döntetlen), illetve a meccs lejátszásának dátumát
- A Küldés gombra kattintva mentsük el az adatokat

### 6. Irodalomjegyzék:
- http://webprogramozas.inf.elte.hu/alkfejl.php
- http://ade.web.elte.hu/wabp/lecke2_lap1.html
- http://webprogramozas.inf.elte.hu/alkfejl/A_dokumentacio_felepitese.pdf
- https://github.com/pessaai/ckd193-beadando


# 3. BEADANDÓ

### 7. Új funkciók 
AJAX-os funkciók:
#### 7.1. A keresésnél automatikusan felajánl közösségeket, amiknek prefixe az addig begépelt szöveg.
**Érintett fájlok kliensoldalon:**
- public\search.js: az ajax-kérés küldéséért és a válasz feldolgozásáért felel
- public\search.css: a találatok formázása
 
**Érintett fájlok szerveroldalon:**
- listCommunities.njk: keresőmezőátalakítása, search.css, search.js hozzáadása
- Route.js: ajax-os végpont (get('/ajax/search'))
- EloController.js: ajaxos kereső-függvény (ajaxSearch())

 **Működés:**
 
A search.js-ben egy függvény feliratkozik a keresőmező input-eseméyeire, majd minden a mező tartalmát elküldi a szervernek ajax-kérésben. Az ajaxos végpont alapján a router meghívja a Controller ajaxSearch() függvényét, amely egy lekérdezést végez az adatbázisban és a válaszban visszaadja az inputra illeszkedő nevű közösségek neveit. A választ a search.js-beli függvény dolgozza fel: a találatokon végigiterálva elkészíti belőlük a megfelelő formájú linkeket, amiket konkatenál. Az így kapott stringet a listCommunities.njk-ban korábban ebből a célból elkészített "list-group community-suggestions suggestions" nevű konténer html-mezőjébe tölti.


#### 7.2. Közösség törlésénél ugorjon fel egy megerősítő-ablak
 
**Érintett fájlok kliensoldalon:**
- show.js
	
**Érintett fájlok szerveroldalon:**
- Route.js: ajax-os végpont (delete('/ajax/user/:id?/deletecommunity'))
- EloController.js: ajaxos delete-függvény (ajaxDelete())
- ownCommunities.njk: a Törlés funkciót már nem egy egyszerű linkkel lehet elérni, hanem egy form-ba ágyazott gombbal; modális ablak elhelyezése, amely kezdetben rejtett

**Működés:**
 
Az egyik közösséghez tartozó Törlés gombra való kattintáskor meghívódik egy függvény (show.js 25. sor), amelyik egyrészt letiltja a form default működését, másrészt láthatóvá teszi a megerősítő ablakot. Ha itt a felhasználó az OK gombra kattint, egy AJAX-függvény került meghívásra, melynek url-je a gomb default action-je egy 'ajax/' prefixxel kiegészítve. A Router ehhez meghívja az EloController.js-ben található ajaxDeleteCommunity() függvényt, amely az eredeti (nem-ajaxos) logikához hasonlóan elvégzi a törlést. Siker esetén a kiinduló oldalra irányít vissza a függvény (/user/list), különben hibaüzenetet ad (alert-tel).
	
 
#### 7.3. AJAX-os login
  
**Érintett fájlok kliensoldalon:**
- public\login.js: az ajax-os bejelentkezésért felel
 
**Érintett fájlok szerveroldalon:**
- login.njk: a form nevének átalakítása
- parent.njk: login.js beszúrása
- Route.js: ajax-os végpont (get('/ajax/login'))
- UserController.js: ajaxos login-függvény (ajaxLogin())
	
**Működés:**
 
A login.js-beli függvény feliratkozik a főoldalon lévő linkre, ami /login végpontra visz kikapcsolt javascript esetén. A linkre való navigálást letiltja, egy változóba felépíti a belépéshez szükséges dialógus-ablak html-vázát (a hibaüzenetet-részt elrejtve), majd a vázba betölti az eredeti login-oldal belépési űrlapját. Submit esetén AJAX-kérést küld a szervernek az űrlap-adatokkal, a router a végpont alapján meghívja a UserController ajaxLogin() függvényét, ami a 'sima' változat logikához hasonlóan megprólja a beléptetni a felhasználót. Hiba esetén az a modális ablak hibaüzenetet-része mutatásra előbukkan és a belépés nem sikerült. Különben a felhasználó bejelentkezése sikeres, és - az előző beadandóhoz hasonlóan - a saját közösségek listázása oldalra irányítódik át. 
 
 
 
AJAX nélküli funkciók
 
#### 7.4. Regisztrációnál már kliensoldalon megtörténik az adatok ellenőrzése
**Érintett fájlok kliensoldalon:** nincs ilyen

**Érintett fájlok szerveroldalon:**
- register.njk: a form átalakítása a bootstrap validator elvárásainak megfelelően; a bootstrap validator script-jének a beemelése
 
**Működés:**
 
A funkció a bootstrap validátorán alapul, ennek a szkriptjét hozzá kell adni az oldalhoz. 
Az űrlap azon mezőit, amelyeknél nincsenek formai megkötések, elég a 'required' kikötéssel ellátni - ilyenek a Felhasználónév, Vezetéknév, Keresztnév és Jelszó mezők. Az Email mezőnél a típust type="text"-ről type="email"-re kell cserélni, ki kell egészíteni ezt is egy 'required' kikötéssel, meg kell adni a hiba esetén küldendő üzenetet (data-error="Hibás email-formátum!"), valamint egy új div-et kell beiktatni a blokkjába, amelyben hiba esetén az üzenet megjelenik: '<div class="help-block with-errors"></div>'. A jelszó-megerősítő mezőnél a jelszó-mezővel való egyezés a megszorítás (data-match="#inputPassword"), a hibaüzenetet pedig: data-match-error="Nem egyezik a két jelszó!" - az email-hez hasonlóan szükséges egy ezt tartalmazó div-el kiegészíteni.
 

#### 7.5. Új mérkőzés bevitelekor már kliensoldalon megtörténik az adatok ellenőrzése
**Érintett fájlok kliensoldalon:** nincs ilyen
 
**Érintett fájlok szerveroldalon:**
- createMatch.njk: a form átalakítása a bootstrap validator elvárásainak megfelelően; a bootstrap validator script-jének a beemelése
 
**Működés:**
 
A funkció a bootstrap validátorán alapul, ennek a szkriptjét hozzá kell adni az oldalhoz. 
Az 1. játékos, 2. játékos és a dátum mezőket ki kell egészítenia 'required' kikötéssel, így pirossal fogja a mezőket szegélyezni, ha ezek hiányoznak. Ezen kívül a dátum mező típusát type="text"-ről a type="date" html5-ös attribútumra változtattam.
 
### 8. Tesztelés
 
 Az automatikus tesztek a Selenium IDE segítségével történtek. Ez Firefox böngészőbe telepíthető add-on (https://addons.mozilla.org/hu/firefox/addon/selenium-ide/), amellyel rögzíthető a weboldalakon végzett tevékenység, és ezt elmentve később bármikor "visszajátsztható", így bárki meggyőződhet arról, hogy egy funkció helyesen működik és hibás inputokra megfelelően reagál. A dokumentációban használt számozás megegyezik a tesztesetek file-neveivel, amiket a főkönyvtárban lehet megtalálni.
  
Automatikus tesztesetek Selenium IDE használatával:
#### 8.1. Regisztráció
##### 8.1.1 Kikapcsolt javascript-el
###### 8.1.1.1 Sikeres reisztráció
###### 8.1.1.2 Sikertelen reisztráció - foglalt felhasználónév
###### 8.1.1.3 Sikertelen reisztráció - foglalt email-cím
###### 8.1.1.4 Sikertelen reisztráció - nem egyezik a két jelszó
###### 8.1.1.5 Sikertelen reisztráció - hiányzó mezők (vezetéknév, keresztnév, felhasználónév, email, jelszó)
##### 8.1.2 Bekapcsolt javascript-el
###### 8.1.2.1 Sikeres reisztráció
###### 8.1.2.2 Sikertelen reisztráció - hiányzó mezők (felhasználónév, vezetéknév, keresztnév, jelszó), hibás email-formátum, nem egyezik a két jelszó
#### 8.2. Login
##### 8.2.1 Kikapcsolt javascript-el
###### 8.2.1.1 Sikeres login
###### 8.2.1.2 Sikertelen login - nem létező felhasználó/jelszó-páros
##### 8.2.2 Bekapcsolt javascript-el
###### 8.2.2.1 Sikeres login
###### 8.2.2.2 Sikertelen login - nem létező felhasználó/jelszó-páros
#### 8.3. Új közösség indítása (előtte login szükséges)
##### 8.3.1 Sikeres indítás
##### 8.3.2 Sikertelen indítás - 
#### 8.4. Új mérkőzés bevitele (előtte login szükséges)
##### 8.4.1 Kikapcsolt javascript-el
###### 8.4.1.1 Sikeres bevitel
###### 8.4.1.2 Sikertelen bevitel - hiányzó mezők (1. játékos, 2. játékos, eredmény, dátum)
###### 8.4.1.3 Sikertelen bevitel - hibás dátum-formátum
##### 8.4.2 Bekapcsolt javascript-el
###### 8.4.2.1 Sikeres bevitel
###### 8.4.2.2 Sikertelen bevitel - hiányzó mezők (1. játékos, 2. játékos, eredmény, dátum)
#### 8.5. Kilépés (előtte login szükséges)
 
További tesztesetek (manuálisan végezve):
#### 8.6. Keresés  a Közösségek böngészése oldalon
##### 8.6.1 Keresőmező működése
###### 8.6.1.1 Keresés kikapcsolt javascript-el
###### 8.6.1.2 Keresés bekapcsolt javascript-el
#### 8.7. Közösség megtekintése
##### 8.7.1 Vendégként
##### 8.7.2 Bejelentkezve
###### 8.7.2.1 Saját közösség megtekintése
###### 8.7.2.2 Más felhasználó tulajdonában lévő közösség megtekintése
#### 8.8. Saját közösséget módosítása
#### 8.9. Saját közösséget törlése
 
Végpontok elérése
- get főoldal
- get/user/createcommunity - új közösség indítása	
- get/user/:id?/editcommunity - saját közösség módosítása
- get/user/:id?/deletecommunity - saját közösség törlése
- get/user/list - saját közösségek listázása
- get/user/:id?/creatematch - új mérkőzés bevitele	
- get/user/:id? - saját közösség megtekintése
- get/community/list - közösségek listázása
- get/community/:id? - közösség megtekintése (nem sajátként)
- get/register - reisztráció
- get/login - bejelentkezés
- get/logout - kijelentkezés
- get/search - közösség keresése
- delete/ajax/user/:id?/deletecommunity - közösség ajax-os törlése
- get/ajax/search - közösség ajax-os keresése
- post/ajax/login - ajax-os bejelentkezés
	
	
 
