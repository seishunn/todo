# Установка и настройка проекта `Todo`
Данный проект нигде не хостится, поэтому, вам придется выполнить эти шаги из инструкции

### О проекте
Распланируйте свое время с этим проектом. Создавайте задачи и выполняйте их. Создавайте списки из ваших todo для лучшего опыта работы с проектом. Все todo заметки хранятся на реляционной MySQL базе данных. При желании, проект можно захостить.

### Установка самого проекта
Установите на свое устройство этот проект.

### Установка пакетов проекта
Проект разбит на две части:   
+ Клиентская часть
+ Серверная часть   
При открытии проекта, в терминале введите следующую команду   
```js 
    npm i
```
После этого, переидите в папку `server` и внутри этой папки выполните туже команду

### Настройка базы данных
На вашем устройстве должен быть установлен `MySQL` 

Установка MySQL:
`https://dev.mysql.com/downloads/installer/`

Создание базы данных:
+ В терминале переидите к папке MySQL и найдите bin   
`cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"`
+ Ввойдите в вашу учетную запись   
`mysql -u root -p`
+ После ввода команды выше, потребуется ввести ваш пароль от учетной записи.    
После успешной авторизации можете выполнить следующие команды
+ Вводите команды строка за строкой (не все сразу)  
```
    CREATE DATABASE todo_sql;
    USE todo_sql;
    CREATE TABLE todo(id INT AUTO_INCREMENT PRIMARY KEY, value VARCHAR(500), todo_list_id INT NOT NULL, completed BOOLEAN);
    CREATE TABLE todo_list(id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, title VARCHAR(50));
    CREATE TABLE user(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, login VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);
```
+ После всей настройки базы данных переидите в `server/database.js`. В этом файле измените поле `password` на ваш пароль от учетной записи MySQL. Если при создании базы данных вы изменили ее имя, то следует указать его в поле `database`.

### Последний шаг
Осталось запустить весь проект и все готово. Для этого, в одном терминале запустите клиентскую часть (внутри главной папки todo введите следующую команду)   
```js
    npm start
```
Теперь запустите сам сервер. Для этого откройте еще один терминал и в нем введите следующие команду
```js
    cd .\server
    npm run dev
```
