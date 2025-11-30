export interface IpAddressProvider {
  fetch(): Promise<string>;
}
