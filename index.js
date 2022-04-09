import { ApolloServer, gql } from "apollo-server";

const persons = [
  {
    name: "Martin",
    phone: "034-323211",
    street: "Calle Frontend",
    city: "Tunja",
    id: "3d34343-2321-11ec9-bsdfs23-8fc0d9",
  },
  {
    name: "Alejandra",
    phone: "125-295611",
    street: "Diagonal Backend",
    city: "Monterrey",
    id: "8d32343-5311-21dk9-bjdqs22-43crud4",
  },
  {
    name: "Miguel",
    street: "Carrera SQL",
    city: "La Fuente",
    id: "mp54884-1226-22pn4-bdsqs24-32c0d9",
  },
];

//Definiciones de los datos que tenemos
const typeDefinitions = gql`
  type Person {
    name: String!
    phone: String
    street: String!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person]!
    personHello: String!
    findPerson(name: String!): Person
  }
`;

/**
 * *Resolvers: de donde vamos a traer estos datos
 */

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    personHello: () => persons,
    findPerson: (root, args) =>  {
      const {name} = args;
      return persons.find(person => person.name === name);
    }
  },
  Person:{
    name: (root) => root.name;
  }
};

const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
}); 
