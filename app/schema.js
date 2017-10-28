import {GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString} from 'graphql';
import Db from './db';

const Person = new GraphQLObjectType({
	name: 'Person',
	description: 'This represents a Person',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(person){
					return person.id
				}
			},
			firstName: {
				type: GraphQLString,
				resolve(person){
					return person.firstName;
				}
			},
			lastName: {
				type: GraphQLString,
				resolve(person){
					return person.lastName;
				}
			},
			email: {
				type: GraphQLString,
				resolve(person){
					return person.email;
				}
			},
			posts: {
				type: new GraphQLList(Post),
				resolve(person){
					return person.getPosts();
				}
			}
		}
	}
});

const Post = new GraphQLObjectType({
	name: 'Post',
	description: 'This is a post',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(person){
					return person.id;
				}
			},
			title: {
				type: GraphQLString,
				resolve(post){
					return post.title;
				}
			},
			content: {
				type: GraphQLString,
				resolve(post){
					return post.content;
				}
			},
			person: {
				type: Person,
				resolve(post){
					return post.getPerson();
				}
			}
		}
	}
});

const Query = new GraphQLObjectType({
	name: 'Query',
	description: 'This is a root query',
	fields: () => {
		return {
			person: {
				type: new GraphQLList(Person),
				args: {
					id: {
						type: GraphQLInt
					},
					email: {
						type: GraphQLString
					}
				},
				resolve(root, args){
					return Db.models.person.findAll({where: args});
				}
			},
			posts: {
				type: new GraphQLList(Post),
				resolve(root, args){
					return Db.models.post.findAll({where: args});
				}
			}
		};
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Function to create stuff',
	fields() {
		return {
			addPerson: {
				type: Person,
				args: {
					firstName: {
						type: new GraphQLNonNull(GraphQLString)
					},
					lastName: {
						type: new GraphQLNonNull(GraphQLString)
					},
					email: {
						type: new GraphQLNonNull(GraphQLString)
					}
				},
				resolve(_, args){
					return Db.models.person.create({
						firstName: args.firstName,
						lastName: args.lastName,
						email: args.email.toLowerCase()
					});
				}
			},
			updatePerson: {
				type: Person,
				args: {
					firstName: {
						type: new GraphQLNonNull(GraphQLString)
					},
					lastName: {
						type: new GraphQLNonNull(GraphQLString)
					},
					email: {
						type: new GraphQLNonNull(GraphQLString)
					},
					id: {
						type: new GraphQLNonNull(GraphQLInt)
					}
				},
				resolve(_, args){
					return Db.models.person.update({
						firstName: args.firstName,
						lastName: args.lastName,
						email: args.email.toLowerCase()
					},{
						where: {
							id: args.id
						}
					});
				} 
			},
			removePerson: {
				type: Person,
				args: {
					id: {
						type: new GraphQLNonNull(GraphQLInt)
					}
				},
				resolve(_, args){
					return Db.models.person.destroy({
						where: {
							id: args.id
						}
					});
				}
			}
		};
	}
})

const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});

export default Schema;