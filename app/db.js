import Sequelize from 'Sequelize';
import db from './config'
import _ from 'lodash';
import Faker from 'faker';

const Person = db.define('person', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	}
});

const Post = db.define('post', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

Person.hasMany(Post);
Post.belongsTo(Person);

db.sync({force: true});.then(()=>{
	_.times(10, ()=>{
		return Person.create({
			firstName: Faker.name.firstName(),
			lastName: Faker.name.lastName(),
			email: Faker.internet.email()
		}).then(person => {
			return person.createPost({
				title: 'Sample title by ' + person.firstName,
				content: 'This is a sample article'
			});
		});
	});
});


export default db;