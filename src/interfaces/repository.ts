type OwnerType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
};

export default interface IRepository {
  id: number;
  node_id: string;
  name: string;
  stargazers_count: number;
  owner: OwnerType;
  html_url: string;
}
