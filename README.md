# front

24 hexs в четных, 25 в нечетных, высота 13

что мы получаем
- раскраска карты (шестиугольники + цвета)
- текущие цены строительства каждого типа объекта
- список объектов
— тип объекта
— координаты
— доход
- состояние игрока
— деньги
— доход
— экология
— скорость убывания экологии
— % исследования территорий
— состояние строительства ледоколов
— состояние ледоколов (позиция, № маршрута)
- События = очередь
— картинка, текст, массив кнопок (кнопка = текст + что отправить на сервер по ее нажатию)
— уведомления (исчезающие)

что мы присылаем (каждую секунду)
- id игрока/сессии
- action игрока + параметр
- дату посленего события в очереди

действия игрока:
1. выбор маршрута в начале игры и сразу после завершения строительства ледокола
2. построить разведывательную платформу (data = координаты)
3. построить буровую платформу (координаты)
4. запустить строительство ледокола
5. отреагировать на всплывающее событие

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

