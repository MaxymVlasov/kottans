#Багатокутники

[Task](https://gist.github.com/xanf/6ac4646ba2f6d781099b) | [Letter](http://us13.campaign-archive2.com/?u=c74dadaa0374ce24f7f4a3897&id=7233fb99b4) | Робоча імплементація на 3.1к на JS - [GPC](http://boontaran.com/posts/view/gpcjs_javascript_port_of_gpc) | Ультимативна штука на C - [CGAL](http://www.cgal.org/)

* Всі коментарі до коду в комітах

* Тестувався на Iceweasel 38.7 (Firefox 38.0). Він не вміє у `let`, тому всюди `var`

* Неповна реалізація

>Глянув на GPC і подумав «Мда, ща щось своє зроблю на строк 300-500»

І щось таки зробив.

####Має працювати наступним чином:
* шукаються точки перетину 
* Шукаються точки, що входять в середину іншої фігури
* На основі спільних рівнянь точок будуються полігони

####Відомі баги:
* В точках перетину: іноді вилазить 1 зайва точка/пропадає 1 потрібна. В демо це {x: 140, y: 20}
* Не реалізовано побудову полігонів

####Інше
По дефолту відображаються точки, без спроби побудувати полігон.

Загалом є 4 варіанти:
* _pointIntersec_ - відсортовані точки.
* _allConnect_ - масиви по 2.
* _allConnect2_ - масиви по 3.
* _allConnect3_ - масиви по 4.

####Запуск на localhost
```
$ git clone https://github.com/MaxymVlasov/kottans.git
$ cd /kottans/intersections/
```
Open `index.html` with yor browser.

####[Demo](http://maxymvlasov.github.io/kottans/intersections/)
