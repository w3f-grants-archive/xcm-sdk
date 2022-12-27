import * as Keyring from "@polkadot/keyring";
import { ApiPromise } from "@polkadot/api";
import { Provider } from "../provider";
import {
  chainSpecsMock,
  SIGNER_MOCK,
  xcmPalletMock,
  XCM_PALLET_RESPONSES,
} from "./mocks/provider-mocks";
import sinon from "sinon";
import { assert, expect } from "chai";

describe("Provider", () => {
  beforeEach(() => {
    sinon.stub(Keyring, "default").returns({
      addFromMnemonic: () => SIGNER_MOCK,
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should instance", () => {
    const keyring = new Keyring.default({ type: "sr25519" });
    const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

    const provider = new Provider(chainSpecsMock.rpc, sender);

    expect(provider.rpc).to.equal(chainSpecsMock.rpc);
    expect(provider.signer).to.equal(SIGNER_MOCK);
  });

  describe("limited teleport assets", () => {
    it("should send teleport asset from relaychain to parachain", async () => {
      sinon.stub(ApiPromise, "create").returns({
        tx: {
          xcmPallet: {
            limitedTeleportAssets: xcmPalletMock.limitedTeleportAssets,
          },
        },
      } as any);

      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      const res = await provider.limitedTeleportAssets({
        destination,
        destinationValue,
        beneficiary,
        beneficiaryValue,
        amount,
      });
      expect(res).to.equal(XCM_PALLET_RESPONSES.limitedTeleportAssets);
    });

    it("should send teleport asset from parachain to relaychain", async () => {
      sinon.stub(ApiPromise, "create").returns({
        tx: {
          xcmPallet: {
            limitedTeleportAssets: xcmPalletMock.limitedTeleportAssets,
          },
        },
      } as any);

      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.parachainRpc;
      const destinationParents = 1;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.relayAccount;
      const assetParents = 1;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      const res = await provider.limitedTeleportAssets({
        destinationParents,
        beneficiary,
        beneficiaryValue,
        assetParents,
        amount,
      });
      expect(res).to.equal(XCM_PALLET_RESPONSES.limitedTeleportAssets);
    });

    it("should show error", async () => {
      sinon.stub(ApiPromise, "create").returns({
        tx: {
          xcmPallet: {},
        },
      } as any);

      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.parachainRpc;
      const destinationParents = 1;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.relayAccount;
      const assetParents = 1;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      try {
        await provider.limitedTeleportAssets({
          destinationParents,
          beneficiary,
          beneficiaryValue,
          assetParents,
          amount,
        });
        assert.fail("actual", "expected", "It shouldn't work ");
      } catch (error) {
        expect(String(error)).to.equal(
          "Error: No limitedTeleportAssets method found"
        );
      }
    });
  });

  describe("teleport assets", () => {
    it("should send asset from relaychain to parachain", async () => {
      sinon.stub(ApiPromise, "create").returns({
        tx: {
          xcmPallet: {
            teleportAssets: xcmPalletMock.teleportAssets,
          },
        },
      } as any);

      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      const res = await provider.teleportAssets({
        destination,
        destinationValue,
        beneficiary,
        beneficiaryValue,
        amount,
      });
      expect(res).to.equal(XCM_PALLET_RESPONSES.teleportAssets);
    });

    it("should show error", async () => {
      sinon.stub(ApiPromise, "create").returns({
        tx: {
          xcmPallet: {},
        },
      } as any);

      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      try {
        await provider.teleportAssets({
          destination,
          destinationValue,
          beneficiary,
          beneficiaryValue,
          amount,
        });
        assert.fail("actual", "expected", "It shouldn't work ");
      } catch (error) {
        expect(String(error)).to.equal("Error: No teleportAssets method found");
      }
    });
  });

  describe("limited reserve transfer assets", () => {
    it("should transfer asset from relaychain to parachain", async () => {
      sinon.stub(ApiPromise, "create").returns({
        tx: {
          xcmPallet: {
            limitedReserveTransferAssets:
              xcmPalletMock.limitedReserveTransferAssets,
          },
        },
      } as any);

      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      const res = await provider.limitedReserveTransferAssets({
        destination,
        destinationValue,
        beneficiary,
        beneficiaryValue,
        amount,
      });
      expect(res).to.equal(XCM_PALLET_RESPONSES.limitedReserveTransferAssets);
    });

    it("should show error", async () => {
      sinon.stub(ApiPromise, "create").returns({
        tx: {
          xcmPallet: {},
        },
      } as any);

      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      try {
        await provider.limitedReserveTransferAssets({
          destination,
          destinationValue,
          beneficiary,
          beneficiaryValue,
          amount,
        });

        assert.fail("actual", "expected", "It shouldn't work ");
      } catch (error) {
        expect(String(error)).to.equal(
          "Error: No limitedReserveTransferAssets method found"
        );
      }
    });
  });

  describe("reserve transfer assets", () => {
    it("should transfer asset from relaychain to parachain", async () => {
      sinon.stub(ApiPromise, "create").returns({
        tx: {
          xcmPallet: {
            reserveTransferAssets: xcmPalletMock.reserveTransferAssets,
          },
        },
      } as any);

      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      const res = await provider.reserveTransferAssets({
        destination,
        destinationValue,
        beneficiary,
        beneficiaryValue,
        amount,
      });
      expect(res).to.equal(XCM_PALLET_RESPONSES.reserveTransferAssets);
    });

    it("should show error", async () => {
      sinon.stub(ApiPromise, "create").returns({
        tx: {
          xcmPallet: {},
        },
      } as any);

      const keyring = new Keyring.default({ type: "sr25519" });
      const sender = keyring.addFromMnemonic(chainSpecsMock.senderMnemonic);

      const rpc = chainSpecsMock.rpc;
      const destination = "Parachain";
      const destinationValue = chainSpecsMock.parachainId;
      const beneficiary = "AccountId32";
      const beneficiaryValue = chainSpecsMock.parachainAccount;
      const amount = 50000000000;

      const provider = new Provider(rpc, sender);

      try {
        await provider.reserveTransferAssets({
          destination,
          destinationValue,
          beneficiary,
          beneficiaryValue,
          amount,
        });
        assert.fail("actual", "expected", "It shouldn't work ");
      } catch (error) {
        expect(String(error)).to.equal(
          "Error: No reserveTransferAssets method found"
        );
      }
    });
  });
});