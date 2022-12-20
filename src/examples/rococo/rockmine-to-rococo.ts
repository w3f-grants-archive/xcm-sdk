import { Keyring } from "@polkadot/keyring";
import { Provider } from "../../provider";
import { cryptoWaitReady } from "@polkadot/util-crypto";

const main = async () => {
  const rpc = "wss://rococo-rockmine-rpc.polkadot.io";
  const destinationParents = 1;
  const beneficiary = "AccountId32";
  const beneficiaryValue = "H25ZWNzxr7WXnzaxvCiWsYDeZDXFtNCCdHJLsuEKqz28uXL";
  const assetParents = 1;
  const amount = 500000000000;

  await cryptoWaitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const sender = keyring.addFromMnemonic(
    "trick grow portion canal wide loan clutch improve appear very security melt"
  );

  const provider = new Provider(rpc, sender);

  const res = await provider.limitedTeleportAssets({
    destinationParents,
    beneficiary,
    beneficiaryValue,
    assetParents,
    amount,
  });

  console.log(res);
};

main().then(() => process.exit(1));

/**
pnpm ts-node src/examples/rococo/rockmine-to-rococo.ts 
 */
