export default interface IBranch {
  name: string;
  commit: {
    url: string;
    sha: string;
  };
  protected: true;
  protection_url: string;
}
