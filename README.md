
## Proje ile ilgili notlar
```
--1-) Postgre bağlantısı yapıldı herhangi bir extra ayara gerek yok.
--2-) Folder ağacı localde çalışcağı için başka bir konfigürasyona gerek yok.
--3-) Projeyi çekip direk çalıştırabilirsiniz.
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# build
$ npm build

# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Yapılacaklar
```
--1-) Folder update işleminde folder taşındığında folderPath'i ve mpath'i güncelleyebiliyoruz,
     içerisindeki resimlerle beraber güncellendiği parentFolder'a taşınıyor.
    taşıma işlemi yapılan folder'ın path'i güncelleniyor ancak içerisindeki image'lerin mpath'leri
    güncelleniyor ama pathleri güncellenmiyor. Yada içerisinde başka folder varsa yada o folder'ın içinde başka iç içe
    geçmiş folderlar mpath'leri güncelleniyor. image'lerin mpath ve Path'leri güncellenmiyor. 
        Kısaca iç içe geçmiş folderların ve içerisinde resim bulunan iç içe geçmiş folder'ların ve içerisindeki
        image'lerin path'leri güncellenecek
```


Nest is [MIT licensed](LICENSE).
