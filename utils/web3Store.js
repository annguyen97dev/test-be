import { Web3Storage } from "web3.storage";
import dirsyList from "../constant/hunter/disry-list.json" assert { type: "json" };
import * as fs from "fs/promises";
import axios from "axios";

// const GameTransfer = () => {

//   useEffect(() => {
//     retrieveFiles(
//       "bafybeie67dle53yjrhv4vriexkbbill3wq2yyhyymupbo6l5ek3agqwjc4"
//     );
//   }, []);

// };

function getAccessToken() {
  return process.env.API_STORAGE_TOKEN || "";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function retrieveFiles(cid) {
  const client = makeStorageClient();
  const res = await client.get(cid);
  console.log(`Got a response! [${res?.status}] ${res?.statusText}`);
  if (!res?.ok) {
    throw new Error(
      `failed to get ${cid} - [${res?.status}] ${res?.statusText}`
    );
  }

  // unpack File objects from the response
  const files = await res.files();

  for (const file of files) {
    console.log(`${file.cid} -- ${file.name} -- ${file.size}`);
    return file.cid;
  }
}

async function listUploadsNft() {
  // let remakeNftList = [...dirsyList];

  // const client = makeStorageClient();

  // for await (const upload of client.list()) {
  //   console.log(
  //     `${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`
  //   );
  // for (const item of remakeNftList) {
  //   if (item.videoName === upload.name) {
  //     item.cid = upload.cid;
  //   }
  // }
  // }

  // console.log("REMAKE LIST: ", remakeNftList);
  // return true;

  // let dict = {
  //   one: [15, 4.5],
  //   two: [34, 3.3],
  //   three: [67, 5.0],
  //   four: [32, 4.1],
  // };

  // try {
  //   let dictstring = JSON.stringify(dict);
  //   fs.writeFile("thing.json", dictstring);
  // } catch (error) {
  //   console.error(`Got an error trying to write to a file: ${error.message}`);
  // }

  var config = {
    method: "get",
    url: "https://api.pinata.cloud/data/pinList?hashContains=QmQvAvXePUezFEscENS25JuzPx5obidnPc7h6sYftjm8di&status=pinned",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ODMzMDdkYy0wMTRjLTQwMGMtOWE5YS01MDA4NzNmMmU3YzQiLCJlbWFpbCI6ImFuLm5ndXllbkBsdWNreXRlY2guaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYWZhYzQ4NTY1NjM5NjI1Y2RlNmYiLCJzY29wZWRLZXlTZWNyZXQiOiIxYzFhY2Q3ZTYzZGZlN2EwN2RkYjhjMjUwZDIwODQ0ZjQzMzRkZTg5NGQwYjM3NzEwZGQ2OTU3ZGUwMmIzMmEzIiwiaWF0IjoxNjY3NDY2MDk2fQ.iwV7y75XT-7gsOBZ_Tk_OdwuXZdgLhuvVRLwrh0uWtk",
    },
  };

  const res = await axios(config);

  console.log(res.data);

  return true;
}

export { retrieveFiles, listUploadsNft };
