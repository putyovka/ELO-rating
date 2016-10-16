ELO-rating

 ###1. Követelményanalízis
1.1. Célkitűzés, projektindító dokumentum
A program célja kétszereplős játékok játékos-közösségeinek (a továbbiakban: közösség) az egymáshoz viszonyított aktuális játékerejének mérésére sok helyen használt Élő-pontrendszer vezetése, a bevitt mérkőzések alapján kialakult ranglista nyilvánossá tétele. A regisztrált felhasználók különböző kategóriákban indíthatnak közösségeket -- a legelterjedtebb a sakkban, ostáblában, különböző videó-játékokban, de akár labdarúgásban is használhatják. Egy közösséghez aztán mérkőzéseket lehet felvinni, ahol meg kell adni a két játékos (nick)nevét, illetve a mérkőzés eredményét. A megadott adatok alapján egy közösség ranglistája a Nemzetközi Sakkszövetség (FIDE) által használt képlet alapján kerül kiszámításra. A listák nyilvánosak, adatok bevitele, módosítása vagy törlése viszont csak az adott közösség indítójának érhető el bejelentkezés után.
Funkcionális követelmények:
    Vendégként legyen lehetőség:
a főoldalon kiemelt közösségeket látni kategóriánként
a közösségek között szabadon böngészni
regisztrálni

Felhasználóként legyen lehetőség bejelentkezni az oldalra, majd:
új közösséget indítani
saját közösséget módosítani vagy törölni
saját közösséghez új meccset hozzáadni
saját közösség meccsét módosítani vagy törölni
Nem funkcionális követelmények:
Áttekinthetőség: a játék-kategóriák színekkel vannak csoportosítva
Használhatóság: ésszerű elrendezés, könnyen kezelhetőség
Megbízhatóság: jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak, és emelje ki a hibás beviteli mezőket. A jól bevitt adatok maradjanak az űrlapban.
Karbantarthatóság: könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt


1.2. Szakterületi fogalomjegyzék
Játékos: egy kétszereplős játék egyik résztvevője.
Játékos-közösség: játékosok csoportja, akik tetszőleges rendszerességgel játszanak egymás ellen, és igényt tartanak arra, hogy az egymáshoz viszonyított játékerejük számszerűen kifejezhető legyen.
Élő-pontrendszer: kétszereplős játékokban, mint a sakkban vagy a góban versenyzők egymáshoz viszonyított aktuális játékerejének mérésére létrehozott rendszer.
Nemzetközileg ismert neve Elo (gyakran nagybetűkkel ELO, bár nem betűszó). Nevét Élő Árpád (angol, külföldön ismertebb nevén Arpad Elo) magyar születésű amerikai fizikaprofesszorról kapta. (Wikipedia)
Mérkőzés: két játékos által végigjátszott játék, aminek a kimenetele az első játékos győzelme, a 2. játékos győzelme vagy döntetlen lehet.
Ranglista: egy közösség összes tagjából álló lista, amely az Élő-pontszámuk alapján van rendezve.
Nemzetközi Sakkszövetség (FIDE): a Nemzetközi Sakkszövetség vagy (Fédération Internationale des Échecs, FIDE) egy nemzetközi szervezet, amely koordinálja a sakk mint sportág nemzetközi életét, nyilvántartja és minősíti a sakkversenyzőket, szervezi a férfi, női, ifjúsági és junior világbajnokságokat, a sakkolimpiákat, kontinensbajnokságokat, és egyéb nemzetközi versenyeket, meghatározza a nemzetközileg érvényes szabályokat. (Wikipedia)
Nick-név: az igazi tulajdonnév helyettesítésére szolgáló néc.


1.3. Használatieset-modell

Szerepkörök:

Vendég: közösségek keresését, böngészését és megtekintését végezheti
Felhasználó: a vendég szerepkörén túl a saját közösségeinek kezelésére (új, módosít, törlés) és a a saját közösségei mérkőzéseinek (új, módosít, törlés) képes. 






2. Tervezés
2.1. Architektúra terv
2.1.1. Oldaltérkép:

Publikus:

- Főoldal
- Közösségek böngészése
    + Közösség megtekintése
- Belépés
- Regisztráció

Felhasználó:

- Főoldal
- Kilépés
- Új közösség indítása
- Saját közösség módosítása
- Saját közösség törlése
- Saját közösség megtekintése
Új mérkőzés bevitele
Mérkőzés módosítása
Mérkőzés törlése

2.1.2. Végpontok
GET/: főoldal
GET/login: bejelentkező oldal
POST/login: bejelentkező adatok felküldése
GET/login/signup: regisztrációs oldal
POST/login/signup: regisztrációs adatok felküldése
GET/logout: kijelentkező oldal
GET/communities/list: közösségek listázása
GET/communities/new: új közösség indítása
POST/communities/new: új közösség indításához szükséges adatok felküldése
GET/communities/id: közösség oldala
GET/communities/delete=id: saját közösség törlése
GET/communities/edit=id: saját közösség adatainak módosítása
POST/communities/edit=id: saját közösség módosítása, adatok felküldése
GET/communities/id/list: saját közösség mérkőzéseinek listázása
GET/communities/id/new: új mérkőzés bevitele
POST/communities/id/new: új mérkőzés beviteléhez szükséges adatok felküldése
GET/communities/id/delete=matchid: mérkőzés törlése
GET/communities/id/edit=matchid: mérkőzés adatainak módosítása
POST/communities/id/edit=matchid: mérkőzés módosítása, adatok felküldése
2.2. Felhasználói-felület modell
2.2.1.Oldalvázlatok:
Főoldal

Közösségek böngészése



Közösség megtekintése




Regisztráció





Bejelentkezés


Közösségek listázása





Új özösség indítása


Közösség módosítása





Saját közösség megtekintése


Új mérkzőzés bevitele




Mérkzozés módosítása




2.2.2. Osztálymodell
Adatmodell



3. Implementáció
3.1.1. Fejlesztőkörnyezet
Lokálisan történik a fejlesztés, Microsoft Visual Code segítségével.
Új Github repository nyitása.
Node.js, npm, Adonis.js telepítése.
Új Adonis projekt indítása.
Fejlesztési lépésenként a repo feltöltése commit-al.
3.1.2. Könyvtárstruktúra, funkciók

A GitHub repo-ban látható.

4. Tesztelés
4.1. Tesztelési környezetek
Egységtesztelés közben a modellek működését, a problémamentes funkciókat és műveleteket ellenőrizzük. Másodszor a funkciónális teszetelés segítségével a végpontokat ellenőrizzük, a megfelelő tartalom megjelenését, és az oldalak működőképességét.
4.2. Egységteszt
4.3. Funkciónális teszetelés
4.4.Tesztesetek

5. Felhasználói dokumentáció
Futtatáshoz szükséges operációs rendszer: Tetszőleges operációs rendszer
A futtatáshoz szükséges hardver: Operációs rendszerek szerint megadva
Egyéb követelmények: Internet böngésző telepítése, JavaScript ajánlott
Program használata:
Böngészőben nyissuk meg a főoldalt
Jobb felső sarokban kattintsunk a Bejelentkezés feliratra
Bejelentkezés/Regisztráció után a Lista oldalra jutunk
Bal alsó sarokban az Új közösség indítása gombra kattintva tudunk új közösséget indítani
Adjunk a közösségnek nevet, és válasszunk neki kategóriát
Ha már létezik ilyen néven létrehozott közösség, az oldal hibaüzenetet dob.
A Küldés gombra kattintva mentsük el az adatokat
A Saját közösségek listázása oldalon a Törlés gombra kattintva törölhetjük a közösségünket, erről megerősítést kér egy felugró ablak
A Saját közösségek listázása oldalon a Módosítás gombra kattintva módosíthatjuk a közösségünk nevét és kategóriáját
A Saját közösségek listázása oldalon a Megtekintés gombra kattintva a megtekintés oldalra jutunk
A Saját közösség megtekintése oldalon bal oldalon látható a közösség renglistája, jobboldalon a bevitt meccsek listája
A Saját közösség megtekintése oldalon a Törlés gombra kattintva törölhetjük a közösségünket, erről megerősítést kér egy felugró ablak
A Saját közösség megtekintése oldalon a Módosítás gombra kattintva módosíthatjuk egy korábban bevitt meccsünk adatait
A Saját közösség megtekintése oldalon az Új mérkőzés bevitele gombra kattintva tudunk új mérkőzést bevinni.
Az új mérkőzés bevitele oldalon meg kell adni a két játékos nevét, valamint egy legördülő menüből kiválasztani az eredményt (1 játékos nyert, 2. játékos nyert, döntetlen). 
A Küldés gombra kattintva mentsük el az adatokat

6. Irodalomjegyzék:
http://webprogramozas.inf.elte.hu/alkfejl.php
http://ade.web.elte.hu/wabp/lecke2_lap1.html
http://webprogramozas.inf.elte.hu/alkfejl/A_dokumentacio_felepitese.pdf
https://github.com/pessaai/ckd193-beadando
