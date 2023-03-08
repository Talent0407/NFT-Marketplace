import React, { useEffect, useState } from "react";

import NftCard from "../base/nftCard";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import DetailModal from "../base/detailModal";
import CustomPagination from "../base/CustomPagination";

const NEXT_PUBLIC_AlCHEMY_API_KEY =
  process.env.NEXT_PUBLIC_AlCHEMY_API_KEY || "v2GR76gzqrfCBB0rpky0n_rYpgFeltSk";

export default function Main() {
  const [emptyData, setEmptyData] = useState(false);
  const [reqError, setReqError] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [modalData, setModalData] = useState([]);

  const [nftData, setNftData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(
    "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
  );

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const GetReqData = (pageNumber) => {
    var reqData = [];
    for (let i = 0; i < cardsPerPage; i++) {
      reqData.push({
        // contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        contractAddress: searchKeyword,
        tokenId: (pageNumber - 1) * cardsPerPage + i,
      });
    }
    return reqData;
  };

  useEffect(() => {
    if (searchKeyword) {
      setLoading(true);
      setEmptyData(false);
      setReqError(false);
    }

    axios({
      method: "post",
      url: `https://eth-mainnet.g.alchemy.com/nft/v2/${NEXT_PUBLIC_AlCHEMY_API_KEY}/getNFTMetadataBatch`,
      data: {
        tokens: GetReqData(currentPage),
      },
    })
      .then((res) => {
        if (res.data.length == 0) setEmptyData(true);
        console.log("res data", res.data.length);
        const nftData =
          res.data.length > 0
            ? res.data.map((i) => {
                return {
                  tokenId: i.id.tokenId,
                  tokenName: i.contractMetadata.name,
                  collectionName: i.contractMetadata.openSea.collectionName,
                  tokenPrice: i.contractMetadata.openSea.floorPrice,
                  tokenMediaUrl: i.media[0].gateway,
                  contractAddress: i.contract.address,
                  totalSupply: i.contractMetadata.totalSupply,
                  description: i.contractMetadata.openSea.description,
                  tokenType: i.contractMetadata.tokenType,
                  attributes: i.metadata.attributes,
                };
              })
            : [];
        setNftData(nftData);
        setLoading(false);
      })
      .catch((error) => {
        setReqError(true);
        setNftData([]);
        setLoading(false);
      });
    return () => {};
  }, [currentPage, searchKeyword]);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="bg-[url('/images/background.png')] min-h-screen">
        <div className="w-full flex flex-row pt-24 pb-8 px-20">
          <input
            className="flex-1 border border-white p-4 bg-gray-600 text-white rounded-xl"
            placeholder="Contract Address"
            // autoFocus
            name="searchkeyword"
            id="searchkeyword"
            value={searchKeyword}
            onChange={(event) => {
              setSearchKeyword(event.target.value);
            }}
          />
          {/* <div
            className="cursor-pointer text-white border border-white rounded-xl flex justify-center items-center px-8"
            onClick={() => {
              setSearchKeyword("");
            }}
          >
            Cancel
          </div> */}
        </div>
        {(reqError || emptyData) && (
          <div className="text-white text-3xl text-center py-32">
            There is no NFTs
          </div>
        )}
        {!reqError && (
          <>
            <div className="flex flex-row gap-4 "></div>
            <div className="flex flex-wrap  justify-center md:justify-between  gap-8 px-20">
              {nftData.map((item, index) => (
                <NftCard
                  nftData={item}
                  setOpen={() => {
                    setOpenModal(true);
                    setModalData(item);
                  }}
                  key={index}
                />
              ))}
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div className="w-[270px] h-0" key={i} />
                ))}
            </div>
            <div className="w-full flex justify-center py-10">
              <CustomPagination
                count={Math.round(nftData[0]?.totalSupply / cardsPerPage)}
                page={currentPage}
                variant="outlined"
                shape="rounded"
                size="large"
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>
      <DetailModal
        nftData={modalData}
        openModal={!!openModal}
        onClose={() => setOpenModal(null)}
      />
    </>
  );
}
