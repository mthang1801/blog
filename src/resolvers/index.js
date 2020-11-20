import { userResolver } from "../user";
import { postResolver } from "../post";
import { commentResolver } from "../comment"
const resolvers = [userResolver, postResolver, commentResolver];

export default resolvers;
