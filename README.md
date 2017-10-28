Graphql crud use Sequelize Mysql

#how to use

buka file app/config.js ganti sesuai dengan konfigurasi database

#how to start
```
npm start

```

#function

```
addPerson(firstName, lastName, email) //create
updatePerson(firstName, lastName, email, id) // update
removePerson(id) //delete
```

```
{
	person{
		id
		firstName
		lastName
		email
	}
} //read
```