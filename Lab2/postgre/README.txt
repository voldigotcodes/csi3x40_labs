# Symmetric-Hash-Join
CSI3530 PROJET FINAL. Implémenté une jointure de hachage symmetrique a l'interieur PostgreSQL 8.1.7 (PostgreSQL 8.2.0)

## Group Members
- Voldi Monzambe - 300233888
- Urbain Kodjo  - 300157625
- Yacine Djido - 300263186

## Setup Instructions
1. Téléchargé postgres v8.1.7 de la source, nous avons téléchargé v8.2.0, comme la v8.1.7 causait des problemes avec ma version d'Ubuntu.
    * Télécharger à partir de [le site internet](https://ftp.postgresql.org/pub/source/v8.2.0/postgresql-8.2.0.tar.gz)
2. Extraire l'archive avec la commande: `$: tar -xvzf postgresql-8.2.0.tar.gz`
3. Remplacer les fichiers du code source de postgreSQL par les notres
    * [createplan.c](./createplan.c) goes in /postgresql-8.2.0/src/backend/optimizer/plan/
    * [nodeHash.c](./nodeHash.c) goes in /postgresql-8.2.0/src/backend/executor/
    * [nodeHashjoin.c](./nodeHashjoin.c) goes in /postgresql-8.2.0/src/backend/executor/
    * [execnodes.h](./execnodes.h) goes in /postgresql-8.2.0/src/include/nodes/
4. Amener le terminal au repertoire /postgresql-8.2.0/
5. Installer gcc 4.7, zlib1g, zlib1g-dev, libreadline6 and libreadline6-dev.
    * `$ sudo apt-get install gcc-4.7`
    * `$ sudo apt-get install zlib1g zlib1g-dev`
    * `$ sudo apt-get install libreadline6 libreadline6-dev` 
6. `$ ./configure CC='gcc-4.7 -m64' -build=aarch64-unkown-linux-gnu --enable-debug -enable-depend --disable-spinlocks`
    * On a ajouté la spécification du build et du compilateur car ubuntu n'arrivais pas a en prendre un build architecture par defaut et on voulais etre sur
    * On a disable les spinlocks, car ca nous faisait problemes pour make the app.
7. `$ make`
8. `$ make install` Essayer avec `sudo` si ca ne fonctionne pas
9. `$ adduser postgres`
10. `$ mkdir /usr/local/pgsql/data` `$ chown postgres:postgres /usr/local/pgsql/data` Donner le ownership du fichier a l;utilisateur qu'on vient de créer
11. `$ su - postgres` pour se connecter au terminal de postgresql
12. `$ /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data` pour initialiser le repertoire de donnée de postgresql
13. `$ /usr/local/pgsql/bin/postmaster -D /usr/local/pgsql/data >logfile 2>&1 &` pour commencer la base de donné. Essayer `$ cat logfile` pour voir si elle avais déjà été commencé.
14. `$ /usr/local/pgsql/bin/createdb testdb` pour creer un schema avec le nom test.
15. `$ /usr/local/pgsql/bin/psql testdb`pour demarer le terminal PostgreSQL dans le schema test.

Ces étapes sont pour ceux qui n'ont pas encore setup leur environement postgresql, voici les etapes pour demaré l'environement quand il est déja créé:
- `$ /usr/local/pgsql/bin/pg_ctl -D /usr/local/pgsql/data -l logfile start`
- `$ /usr/local/pgsql/bin/psql tesdbt` ou remplacer `testdb` par le nom de votre schema.

---

Puis il n'y a plus besoin que d'inseré des élement dans la base de donné avec le fichier fournis,
et de lancer la requete ci-dessous, afin de pouvoir tester, les resultats seront envoyer dans un screenshot dans le meme
dossier que ce fichier :

select e1.ename as "manager", e2.ename as "employee"
from emp e1, emp e2, dept d, manages m
where e1.eno = m.eno
and m.dno = d.dno
and d.dno = e2.dno
order by manager;
