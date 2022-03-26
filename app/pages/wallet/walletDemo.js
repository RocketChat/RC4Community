import Head from "next/head";
import { Stack } from "react-bootstrap";
import Meta from "../../components/wallet/connectMeta";
import NFTProfile from "../../components/wallet/NFTprofile";
import styles from "../../styles/meta.module.css";

function WalletDemo() {
  return (
    <div>
      <Head>
        <title>Ether Wallet</title>
        <meta name="description" content="Rocket.Chat MetaMask connect demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Stack direction="horizontal" className={styles.demo}>
        <Meta />
        <NFTProfile limit={20}/>
      </Stack>
    </div>
  );
}

export default WalletDemo;
